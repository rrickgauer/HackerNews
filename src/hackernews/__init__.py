import flask
from . import routes
from .common import CustomJSONEncoder


#------------------------------------------------------
# Sets up and initializes the flask application
#
# Args:
#   flaskApp (obj): the flask application
#------------------------------------------------------
def initApp(flask_app: flask.Flask):    
    flask_app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
    flask_app.config['JSON_SORT_KEYS'] = False               # don't sort the json keys
    flask_app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False  # print the json pretty

    app.json_encoder = CustomJSONEncoder

#------------------------------------------------------
# Register all of the Flask blueprints
#------------------------------------------------------
def registerBlueprints(flask_app: flask.Flask):
    flask_app.register_blueprint(routes.home.bp_home, url_prefix='/')
    

app = flask.Flask(__name__)
initApp(app)
registerBlueprints(app)

