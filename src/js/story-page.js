

const eMetadataDisplays = {
    title: '#story-meta-title',
}

const mUrlParser = new UrlParser();
const mStoryID = mUrlParser.getQueryParm('storyID');


let mComments = {};


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

    mComments = storyComp;
    await fetchAllComments(mComments);
    mComments = mComments.kids;

    displayComments();
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

/**
 * Display the top level comments  
 * 
 * @param {StoryComp} storyComp the story
 */
async function fetchAllComments(storyComp) {

    if (!storyComp.hasOwnProperty('kids')) {    
        return;
    }

    const promiseList = [];

    for(const commentID of storyComp.kids) {
        promiseList.push(ApiWrapper.getStory(commentID));
    }

    storyComp.kids = await Promise.all(promiseList);

    for (let count = 0; count < storyComp.kids.length; count++) {
        await fetchAllComments(storyComp.kids[count]);
    }
}


function displayComments() {
    let html = '';

    for (const comment of mComments) {
        const commentObj = new Comment(comment);
        html += commentObj.getHtml();
    }

    $('#comments-list').html(html);

}



