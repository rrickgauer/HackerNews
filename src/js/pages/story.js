

const eMetadataDisplays = {
    title: '#story-meta-title',
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



function addListeners() {
    $(eCommentsContainer).on('click', eComments.toggleButton, function() {
        toggleCommentVisibility(this);
    });
}



function toggleCommentVisibility(a_eCommentItemButton) {
    $(a_eCommentItemButton).closest(eComments.item).toggleClass(eComments.visibilityClass);
}

