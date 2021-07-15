

const eMetadataDisplays = {
    title: '#story-meta-link-title',
    link: '#story-meta-link',
    hackernewsLink: '#story-meta-hackernews-link',
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
const mStoryID = mUrlParser.getQueryParm('storyID');

let mStoryComments = new StoryComments(mStoryID, eMetadataDisplays.title);


// main logic
$(document).ready(function() {
    mStoryComments.fetchStoryData();
    addListeners();
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

