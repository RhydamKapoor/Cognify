from flask_pymongo import PyMongo;
from flask_cors import CORS;
from authlib.integrations.flask_client import OAuth;
from flask_jwt_extended import JWTManager;

mongo = PyMongo();
cors = CORS();
oauth = OAuth();
jwt = JWTManager();