


// main logic
$(document).ready(function() {
    loadTopStories();
});


async function loadTopStories() {
    const topStoriesList = await ApiWrapper.getTopStoriesIds();

    const storyPromises = [];

    for (let count = 0; count < topStoriesList.length; count++) {
        const storyResponse = ApiWrapper.getStory(topStoriesList[count]);
        storyPromises.push(storyResponse);
    }

    const stories = await Promise.all(storyPromises);
    let html = '<div class="card-deck">';


    stories.sort(function(a, b) {
        const urlA = a.title;
        const urlB = b.title;

        return (urlA < urlB ? -1 : 1);
    });

    let count = 0;

    for (const story of stories) {
        if (story.type != Constants.TYPES.STORY) {
            continue;
        }

        if (count == 3) {
            html += '</div><div class="card-deck">';
            count = 0;
        }

        const storyCard = new StoryCard(story);
        html += storyCard.getCardHtml();

        count++;
    }

    html += '</div>';

    $('#stories-container').html(html);
}

