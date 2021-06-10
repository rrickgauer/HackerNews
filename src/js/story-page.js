

const eMetadataDisplays = {
    title: '#story-meta-title',
}

const mUrlParser = new UrlParser();
const mStoryID = mUrlParser.getQueryParm('storyID');



// main logic
$(document).ready(function() {

    loadStoryMetadata();

});


async function loadStoryMetadata(a_iStoryID) {
    const storyApiResponse = await ApiWrapper.getStory(mStoryID);
    const storyComp = new StoryComp(storyApiResponse);

    console.log(storyComp);
    $(eMetadataDisplays.title).text(storyComp.title);
}

