
import StoryComments from "../classes/StoryComments";
import StoryMeta from "../classes/StoryMeta";
import UrlParser from "../classes/UrlParser";
import Utilities from "../classes/Utilities";

import { eComments, eCommentsContainer, eMetaIDs } from "../classes/StoryPageHtmlSelectors";

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

