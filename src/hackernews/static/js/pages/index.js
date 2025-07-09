import Stories from "../classes/Stories";
import StoryComp from "../classes/StoryComp";
import Utilities from "../classes/Utilities";
import { ViewStoryForm } from "../classes/ViewStoryForm";


const eSortingSelect = '#stories-sort-option';
const eStoriesContainer = '#stories-container';
const eStoryItemClass = `.${StoryComp.StoryItemClass}`;

const eStoriesBsContainer = '#stories-bs-container';
const eWidescreenCheckboxInput = '#widescreen-checkbox-input';

const eViewSelection = 'stories-display-option';
const mStories = new Stories(eStoriesContainer);

const mViewStoryForm = new ViewStoryForm();

/**************************************************
Main logic
***************************************************/
$(document).ready(function() {
    showStoriesContainerSpinner();
    
    mStories.fetchTopStories(Stories.SORTING_TYPES.Default);
    
    addEventListeners();
    
    Utilities.enableJumpButton();

    mViewStoryForm.control();
});

/**************************************************
Add all the event listeners
***************************************************/
function addEventListeners() {
    $(eSortingSelect).on('change', function() {
        updateStorySorting();
    });

    $('body').on('click', eStoryItemClass, function(e) {
        gotoStory(e);
    });

    $(`input[name='${eViewSelection}']`).on('change', function(e) {
        updateStoriesView();
    });

    $(eWidescreenCheckboxInput).on('change', function(e) {
        toggleWideScreen();
    });
}

/**************************************************
Update the stories sorting
***************************************************/
function updateStorySorting() {
    const newSortingValue = parseInt($(eSortingSelect).find('option:checked').val());
    mStories.displayType = getStoriesViewInputValue();
    mStories.fetchTopStories(newSortingValue);
    showStoriesContainerSpinner();
}

/**************************************************
Show the spinner in the stories container
***************************************************/
function showStoriesContainerSpinner() {
    let html = `
    <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary mt-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>`;

    $(eStoriesContainer).html(html);
}

/**************************************************
Depending on which part of the story card the user clicked,
go to either the comments section page, or the story url.
***************************************************/
function gotoStory(e) {
    if (e.target.className == 'card-story-link') {
        return;
    }

    const card = $(e.target).closest(eStoryItemClass);
    const storyID = $(card).attr('data-id');

    const url = `/stories/${storyID}`;
    window.open(url, "_blank");
}

/**************************************************
Update the story elements view (gallery or list).
***************************************************/
function updateStoriesView() {
    showStoriesContainerSpinner();
    mStories.displayType = getStoriesViewInputValue();
    mStories.displayStories();
}

/**************************************************
Get the value of the checked stories view radio option.
***************************************************/
function getStoriesViewInputValue() {
    return $(`input[name='${eViewSelection}']:checked`).val();
}


function toggleWideScreen() {
    $(eStoriesBsContainer).toggleClass('container-fluid').toggleClass('container');
}
