
const eSortingSelect = '#stories-sort-option';
const eStoriesContainer = '#stories-container';

const eStoryCardClass = `.${StoryComp.cardElementClass}`;


const mStories = new Stories(eStoriesContainer);



// main logic
$(document).ready(function() {
    mStories.fetchTopStories(Stories.SortingTypes.Score);
    addEventListeners();
});


function addEventListeners() {
    $(eSortingSelect).on('change', function() {
        updateStorySorting();
    });


    $('body').on('click', eStoryCardClass, function(e) {
        gotoStory(e);
    });
}



function updateStorySorting() {
    const newSortingValue = $(eSortingSelect).find('option:checked').val();
    mStories.fetchTopStories(newSortingValue);
    showStoriesContainerSpinner();
}

// show the spinner in the stories container
function showStoriesContainerSpinner() {
    let html = `
    <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary mt-5" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>`;

    $(eStoriesContainer).html(html);
}


function gotoStory(e) {
    if (e.target.className == 'card-story-link') {
        return;
    }

    const card = $(e.target).closest(eStoryCardClass);
    const storyID = $(card).attr('data-id');

    const url = `story.html?storyID=${storyID}`;
    window.open(url, "_blank");
}



