
const eSortingSelect = '#stories-sort-option';
const eStoriesContainer = '#stories-container';
const eStoryCardClass = `.${StoryComp.cardElementClass}`;
const mStories = new Stories(eStoriesContainer);

/**************************************************
Main logic
***************************************************/
$(document).ready(function() {
    mStories.fetchTopStories(Stories.SORTING_TYPES.Default);
    addEventListeners();
});

/**************************************************
Add all the event listeners
***************************************************/
function addEventListeners() {
    $(eSortingSelect).on('change', function() {
        updateStorySorting();
    });


    $('body').on('click', eStoryCardClass, function(e) {
        gotoStory(e);
    });
}

/**************************************************
Update the stories sorting
***************************************************/
function updateStorySorting() {
    const newSortingValue = parseInt($(eSortingSelect).find('option:checked').val());
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

    const card = $(e.target).closest(eStoryCardClass);
    const storyID = $(card).attr('data-id');

    const url = `story.html?storyID=${storyID}`;
    window.open(url, "_blank");
}



