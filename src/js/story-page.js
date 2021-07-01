

const eMetadataDisplays = {
    title: '#story-meta-title',
}

const mUrlParser = new UrlParser();
const mStoryID = mUrlParser.getQueryParm('storyID');



// main logic
$(document).ready(function() {

    fetchStoryData();

});




/**
 * Retrieve the story data
 * 
 * @param {int} a_iStoryID story id
 */
async function fetchStoryData(a_iStoryID) {
    const storyApiResponse = await ApiWrapper.getStory(mStoryID);
    const storyComp = new StoryComp(storyApiResponse);
    displayStoryMetadata(storyComp);
    // storyComp = await fetchComments(storyComp);


    doShit(storyComp);
}
/**
 * Display story metadata on the page
 * 
 * @param {StoryComp} a_oStoryMetadata - Story comp object
 */
 function displayStoryMetadata(a_oStoryMetadata) {
    $(eMetadataDisplays.title).text(a_oStoryMetadata.title);
    $('title').text(a_oStoryMetadata.title);
}


async function doShit(storyComp) {
    await fetchComments(storyComp);

    console.log(storyComp);
}


/**
 * Fetch all the comments for a story   
 * @param {StoryComp} a_oStoryComp the story object
 */
async function fetchComments(a_oStoryComp) {

    if (!a_oStoryComp.hasOwnProperty('kids')) {
        return a_oStoryComp;
    }

    if (a_oStoryComp.kids.length == 0) {
        return a_oStoryComp;
    }

    const commentPromises = [];

    for (const commentID of a_oStoryComp.kids) {
        const commentPromise = ApiWrapper.getStory(commentID);
        commentPromises.push(commentPromise);
    }

    a_oStoryComp.kids = await Promise.all(commentPromises);

    for (let count = 0; count < a_oStoryComp.kids.length; count++) {
        a_oStoryComp.kids[count] = await fetchComments(a_oStoryComp.kids[count]);
    }
}

