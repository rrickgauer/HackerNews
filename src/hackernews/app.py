import flask
from . import routes

# setup the flask application
app = flask.Flask(__name__)
app.register_blueprint(routes.bp_home, url_prefix='/')

app.jinja_env.auto_reload = True

