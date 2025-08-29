from flask import Blueprint, jsonify;
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt;

profile_bp = Blueprint('profile', __name__, url_prefix='/api/profile')

@profile_bp.route('/me', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        user = get_jwt_identity();
        details = get_jwt();
        data = {
            "id": user,
            "name": details['name'],
            "email": details['email'],
            "role": details['role'],
            "provider": details['provider']
        }
        return jsonify({"data": data}), 200;
    except Exception as e:
        return jsonify({"message": "Something went wrong"}), 500;

@profile_bp.route('/update', methods=['PUT'])
@jwt_required()
def update_profile():
    user = get_jwt_identity();
    return jsonify({"message": "Profile updated", "user": user}), 200;

@profile_bp.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_profile():
    user = get_jwt_identity();
    return jsonify({"message": "Profile deleted", "user": user}), 200;