from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
import os
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
load_dotenv()


def create_app():
    app = Flask(__name__)

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
        "SQLALCHEMY_DATABASE_URI")


    # Import models here for Alembic setup
    # from app.models.ExampleModel import ExampleModel
    from app.models.checkmateuser import Checkmateuser
    from app.models.med import Med

    db.init_app(app)
    migrate.init_app(app, db)

    # Register Blueprints here
    # from .routes import example_bp
    # app.register_blueprint(example_bp)
    from app.routes.routes_meds import med_bp
    app.register_blueprint(med_bp)
    from app.routes.routes_user import user_bp
    app.register_blueprint(user_bp)

    CORS(app)
    return app
