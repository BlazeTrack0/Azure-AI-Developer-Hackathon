from flask import Flask
from flask_cors import CORS




def create_app():
    app = Flask(__name__)
    CORS(app)

    from azure_fire_backend.blueprints.core.routes import core
    from azure_fire_backend.blueprints.fireRoute.routes import fireRoute

    app.register_blueprint(core, url_prefix='/')    
    app.register_blueprint(fireRoute, url_prefix='/live-fire')


    return app