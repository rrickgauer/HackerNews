import { ApiWrapper } from "../../../api/ApiWrapper";
import { CommentModel } from "../comments/CommentModel";
import { StoryApiResponse } from "./StoryApiResponse";
import { StoryListItem } from "./StoryListItem";

export class StoryComments
{
    storyID: number;
    comments: any;

    constructor (storyId: number)
    {
        this.comments = {};
        this.storyID = storyId;
    }

    /**
     * Retrieve the story data
     */
    async fetchStoryData()
    {
        // fetch the story metadata
        const storyApiResponse = await ApiWrapper.getStory(this.storyID);
        const storyComp = new StoryListItem(storyApiResponse);


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
     * @param {StoryListItem} a_oStoryMetadata - Story comp object
     */
    displayStoryMetadata(a_oStoryMetadata)
    {
        $('title').text(a_oStoryMetadata.title);
    }

    /**
     * Display the top level comments  
     * 
     * @param {StoryListItem} story the story
     */
    async fetchAllComments(story: StoryListItem)
    {

        if (!story.hasOwnProperty('kids'))
        {
            return;
        }

        const promiseList: Array<Promise<StoryApiResponse>> = [];

        for (const commentID of story.kids)
        {
            promiseList.push(ApiWrapper.getStory(commentID as number));
        }

        story.kids = await Promise.all(promiseList);

        for (let count = 0; count < story.kids.length; count++)
        {
            await this.fetchAllComments(story.kids[count] as StoryListItem);
        }
    }

    /**
     * Display the comments
     */
    displayComments()
    {
        let html = '';

        for (const comment of this.comments)
        {
            const commentObj = new CommentModel(comment);
            html += commentObj.getHtml();
        }

        // display the html
        // make all links found within the comments section open a new tab
        $('#comments-list').html(html).find('a').attr("target", "_blank");
    }

}

