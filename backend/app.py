from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from auth    import auth_bp
from dramas  import dramas_bp
from reviews import reviews_bp
from ratings import ratings_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
    JWTManager(app)
    db.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(dramas_bp)
    app.register_blueprint(reviews_bp)
    app.register_blueprint(ratings_bp)

    with app.app_context():
        db.create_all()

    return app

if __name__ == "__main__":
    create_app().run(debug=True, port=5000)