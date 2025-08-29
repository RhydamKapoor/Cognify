from flask import Flask
from .config import Config
from .extension import mongo, cors, oauth, jwt;
from .routes import blueprints;

def create_app():

    app = Flask(__name__);
    app.config.from_object(Config);

    mongo.init_app(app);
    cors.init_app(app, resources={r"/*": {"origins": app.config["CLIENT_URL"]}}, supports_credentials=True);
    oauth.init_app(app);
    jwt.init_app(app);

    for blueprint in blueprints:
        app.register_blueprint(blueprint);
    
    oauth.register(
        name='google',
        client_id=app.config['GOOGLE_CLIENT_ID'],
        client_secret=app.config['GOOGLE_CLIENT_SECRET'],
        server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
        client_kwargs={
            'scope': 'openid email profile'
        }
    )


    @app.route("/")
    def index():
        return "Welcome to Cognify!";

    return app;