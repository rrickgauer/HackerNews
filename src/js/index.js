
const eSortingSelect = '#stories-sort-option';
const eStoriesContainer = '#stories-container';


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




