


// main logic
$(document).ready(function() {
    test();
    loadTopStories();
});



function test() {
    
    ApiWrapper.getTopStoriesIds();

    ApiWrapper.getStory(55);

}



async function getStory() {
    let story1 = ApiWrapper.getStory(27447766);
    let story2 = ApiWrapper.getStory(27449931);




    let values = await Promise.all([story1, story2]);

    console.table(values);

}




async function loadTopStories() {
    const topStoriesList = await ApiWrapper.getTopStoriesIds();

    const storyPromises = [];

    for (let count = 0; count < 500; count++) {
        const storyResponse = ApiWrapper.getStory(topStoriesList[count]);
        storyPromises.push(storyResponse);
    }


    const stories = await Promise.all(storyPromises);

    
    let html = '<div class="card-deck">';

    for (let count = 0; count < stories.length; count++) {
        if (count != 0 && count % 3 == 0) {
            html += '</div><div class="card-deck">';
        }
        

        const storyCard = new StoryCard(stories[count]);
        html += storyCard.getHtml();
    }


    html += '</div>';

    $('#stories-container').html(html);


}

