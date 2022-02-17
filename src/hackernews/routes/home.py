"""
********************************************************************************************
Module:     home
Prefix:     ''
********************************************************************************************
"""
import flask

# module blueprint
bp_home = flask.Blueprint('home', __name__)

#------------------------------------------------------
# Home page 
#------------------------------------------------------
@bp_home.route('')
def home():
    payload = dict(
        name_first = "Ryan",
        name_last  = "Rickgauer",
    )

    return flask.render_template('index.html', data=payload)
    


#------------------------------------------------------
# Stpry page 
#------------------------------------------------------
@bp_home.route('stories/<int:story_id>')
def story(story_id: int):
    return flask.render_template('story.html')
    