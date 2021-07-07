

const eMetadataDisplays = {
    title: '#story-meta-title',
}

const mUrlParser = new UrlParser();
const mStoryID = mUrlParser.getQueryParm('storyID');

let mStoryComments = new StoryComments(mStoryID, eMetadataDisplays.title);


// main logic
$(document).ready(function() {
    mStoryComments.fetchStoryData();
});



