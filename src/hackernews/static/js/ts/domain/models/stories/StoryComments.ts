import { ApiWrapper } from "../../../api/ApiWrapper";
import { CommentTemplate } from "../../../templates/CommentTemplate";
import { CommentModel } from "../comments/CommentModel";
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
    public async fetchStoryData(): Promise<void>
    {
        // fetch the story metadata
        const storyApiResponse = await ApiWrapper.getStory(this.storyID);
        const storyComp = new StoryListItem(storyApiResponse);

        // display the metadata
        this.displayStoryMetadata(storyComp);

        // fetch all the story comments
        this.comments = storyComp;
        await this.fetchAllComments(this.comments as StoryListItem);
        this.comments = this.comments.kids as StoryListItem[];

        // display the story comments
        this.displayComments();
    }


    /**
     * Display story metadata on the page
     * 
     * @param {StoryListItem} storyMetadata - Story comp object
     */
    private displayStoryMetadata(storyMetadata: StoryListItem)
    {
        $('title').text(storyMetadata.title);
    }

    /**
     * Display the top level comments  
     * 
     * @param {StoryListItem} story the story
     */
    private async fetchAllComments(story: StoryListItem): Promise<void>
    {
        if (!story.hasOwnProperty('kids'))
        {
            return;
        }

        story.kids = await Promise.all(story.kids.map((k) => ApiWrapper.getStory(k)));

        for (let count = 0; count < story.kids.length; count++)
        {
            await this.fetchAllComments(story.kids[count] as StoryListItem);
        }
    }

    /**
     * Display the comments
     */
    private displayComments(): void
    {
        const htmlEngine = new CommentTemplate();

        const commentModels = this.comments.map(c => new CommentModel(c)) as CommentModel[];
        commentModels.forEach(c => c.mapChildren());

        let html = htmlEngine.toHtmls(commentModels);

        // display the html
        // make all links found within the comments section open a new tab
        $('#comments-list').html(html).find('a').attr("target", "_blank");
    }

}

