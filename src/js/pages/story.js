

const eMetadataDisplays = {
    title: '#story-meta-title',
    link: '#story-meta-link',
    hackernewsLink: '#story-meta-hackernews-link',
}

const mUrlParser = new UrlParser();
const mStoryID = mUrlParser.getQueryParm('storyID');

let mStoryComments = new StoryComments(mStoryID, eMetadataDisplays.title);


// main logic
$(document).ready(function() {
    mStoryComments.fetchStoryData();
});

