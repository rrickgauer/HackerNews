
import StoryComments from "../classes/StoryComments";
import StoryMeta from "../classes/StoryMeta";
import UrlParser from "../classes/UrlParser";
import Utilities from "../classes/Utilities";


const eMetaIDs = {
    container: '#meta-container',
    title: '#meta-title',
    countComments: '#meta-count-comments',
    countLikes: '#meta-count-likes',
    date: '#meta-date',
    linkStory: '#meta-link-story',
    linkSite: '#meta-link-site',
}


const eCommentsContainer = '#comments-list';

const eComments = {
    item: '.comment-item',
    toggleButton: '.comment-item-btn-toggle-thread',
    meta: '.comment-item-meta',
    thread: '.comment-item-thread',
    text: '.comment-item-text',
    visibilityClass: 'comment-item-hidden',
}



const mUrlParser = new UrlParser();
const mStoryID = mUrlParser.getUrlPathSectionValue(1);

const mStoryMeta = new StoryMeta(mStoryID);
let mStoryComments = new StoryComments(mStoryID, eMetaIDs.title);


// main logic
$(document).ready(function() {
    mStoryMeta.loadAndDisplayData();
    mStoryComments.fetchStoryData();
    addListeners();
    Utilities.enableJumpButton();
});


/**
 * Add the event listeners to the page elements
 */
function addListeners() {
    $(eCommentsContainer).on('click', eComments.toggleButton, function(e) {
        e.preventDefault();
        toggleCommentVisibility(this);
    });
}


/**
 * Show/hide a comment thread actions
 */
function toggleCommentVisibility(a_eCommentItemButton) {
    const eComment = $(a_eCommentItemButton).closest(eComments.item);

    // toggle comment visibility
    $(eComment).toggleClass(eComments.visibilityClass);

    // update the button text to show or hide
    const btnText = $(eComment).hasClass(eComments.visibilityClass) ? 'Show' : 'Hide';
    $(a_eCommentItemButton).text(btnText);
}

