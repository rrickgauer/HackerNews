import ApiWrapper from "./ApiWrapper";
import Comment from "./Comment";
import StoryComp from "./StoryComp";


export default class StoryComments
{
    /**
     * @constructor
     * @param {number} a_iStoryID - story id
     */
    constructor(a_iStoryID) {
        this.comments = {};
        this.storyID = a_iStoryID;


        this.displayStoryMetadata = this.displayStoryMetadata.bind(this);
        this.fetchStoryData       = this.fetchStoryData.bind(this);
        this.fetchAllComments     = this.fetchAllComments.bind(this);
        this.displayComments      = this.displayComments.bind(this);
    }

    /**
     * Retrieve the story data
     * 
     * @param {number} a_iStoryID - story id
     */
    async fetchStoryData() {
        // fetch the story metadata
        const storyApiResponse = await ApiWrapper.getStory(this.storyID);
        const storyComp = new StoryComp(storyApiResponse);

        
        // display the metadata
        this.displayStoryMetadata(storyComp);

        // fetch all the story comments
        this.comments = storyComp;
        await this.fetchAllComments(this.comments);
        this.comments = this.comments.kids;

        // display the story comments
        this.displayComments();
    }


    /**
     * Display story metadata on the page
     * 
     * @param {StoryComp} a_oStoryMetadata - Story comp object
     */
    displayStoryMetadata(a_oStoryMetadata) {
        $('title').text(a_oStoryMetadata.title);
    }

    /**
     * Display the top level comments  
     * 
     * @param {StoryComp} storyComp the story
     */
    async fetchAllComments(storyComp) {

        if (!storyComp.hasOwnProperty('kids')) {    
            return;
        }

        const promiseList = [];

        for(const commentID of storyComp.kids) {
            promiseList.push(ApiWrapper.getStory(commentID));
        }

        storyComp.kids = await Promise.all(promiseList);

        for (let count = 0; count < storyComp.kids.length; count++) {
            await this.fetchAllComments(storyComp.kids[count]);
        }
    }

    /**
     * Display the comments
     */
    displayComments() {
        let html = '';

        for (const comment of this.comments) {
            const commentObj = new Comment(comment);
            html += commentObj.getHtml();
        }

        // display the html
        // make all links found within the comments section open a new tab
        $('#comments-list').html(html).find('a').attr("target", "_blank");
    }

}

