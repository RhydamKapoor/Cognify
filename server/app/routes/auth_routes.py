from flask import Blueprint, jsonify, request, url_for, redirect, current_app;
from app.model.userSchema import UserSchema;
from datetime import datetime, timedelta;
from app.extension import mongo;
from werkzeug.security import generate_password_hash, check_password_hash;
from app.extension import oauth;
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies, jwt_required, get_jwt_identity;
import traceback;
from bson import ObjectId;

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

user_schema = UserSchema();

@auth_bp.route('/register', methods=['POST'])
def register():
    try:

        data = request.json;
        user = mongo.db.users.find_one({"email": data["email"]});

        if user:
            return jsonify({"message": "User already exists"}), 400;
        
        newData = {
            "name": data["firstName"] + " " + data["lastName"],
            "email": data["email"],
            "password": data["password"],
            "role": "user",
            "provider": "email"
        }
        validated_data = user_schema.load(newData);

        validated_data['password'] = generate_password_hash(validated_data['password'], method="pbkdf2:sha256", salt_length=16);

        validated_data['createdAt'] = datetime.now();
        validated_data['updatedAt'] = datetime.now();

        user = mongo.db.users.insert_one(validated_data);

        if user:
            return jsonify({"message": "User created successfully"}), 201;
        else:
            return jsonify({"message": "Could not create user"}), 400;
        
    except Exception as e:
        return jsonify({"message": "Something went wrong"}), 500;

@auth_bp.route('/login', methods=['POST'])
def login():

    try:
        data = request.json;
        
        user = mongo.db.users.find_one({"email": data["email"]});

        if not user:
            return jsonify({"message": "User not found"}), 404;
        
        valid_password = check_password_hash(user["password"], data["password"]);

        if not valid_password:
            return jsonify({"message": "Invalid password"}), 401;
    
        user_id = str(user["_id"])  

        additional_claims = {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "provider": user["provider"]
        }

        access_token = create_access_token(
            identity=user_id,
            additional_claims=additional_claims,
        )
        refresh_token = create_refresh_token(
            identity=user_id,
            additional_claims=additional_claims,
        )

        resp = jsonify({"login": True});
        set_access_cookies(resp, access_token);
        set_refresh_cookies(resp, refresh_token);

        return resp, 200;

    except Exception as e:
        current_app.logger.error(f"Login error: {str(e)}")
        traceback.print_exc()
        return jsonify({"message": "Something went wrong"}), 500;

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    try:
        user_id = get_jwt_identity();
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)});

        additional_claims = {
            "name": user["name"],
            "email": user["email"],
            "role": user["role"],
            "provider": user["provider"]
        }
        access_token = create_access_token(
            identity=user_id, 
            additional_claims=additional_claims,
        );
        resp = jsonify({"login": True});
        set_access_cookies(resp, access_token);
        return resp, 200;
    except Exception as e:
        current_app.logger.error(f"Refresh token error: {str(e)}")
        traceback.print_exc()
        return jsonify({"message": "Refresh token failed"}), 401;

@auth_bp.route('/google')
def google_login():
    redirect_uri = url_for('auth.google_callback', _external=True)
    return oauth.google.authorize_redirect(redirect_uri)

@auth_bp.route('/google/callback')
def google_callback():
    try:
        token = oauth.google.authorize_access_token()
        user_info = oauth.google.get("https://www.googleapis.com/oauth2/v2/userinfo").json()

        email = user_info['email']
        user = mongo.db.users.find_one({"email": email})

        if not user:
            user = {
                "email": email,
                "name": user_info.get("name"),
                "role": "user",
                "provider": "google",
                "createdAt": datetime.now(),
                "updatedAt": datetime.now()
            }
            mongo.db.users.insert_one(user)

        # Redirect back to frontend with success
        return redirect("http://localhost:3000?auth=success")
    
    except Exception as e:
        # Redirect back to frontend with error
        return redirect("http://localhost:3000?auth=error")