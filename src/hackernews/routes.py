import flask

# module blueprint
bp_home = flask.Blueprint('home', __name__)

#------------------------------------------------------
# Home page 
#------------------------------------------------------
@bp_home.route('')
def home_page():
    return flask.render_template('pages/home/home-page.html')

#------------------------------------------------------
# Story page 
#------------------------------------------------------
@bp_home.route('stories/<int:story_id>')
def story_page(story_id: int):
    return flask.render_template('pages/story/story-page.html')



