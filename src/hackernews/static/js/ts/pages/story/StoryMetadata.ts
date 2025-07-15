import { getDifferenceDisplayString } from "../../utilities/dates";
import { StoryItem } from "../../domain/models/stories/StoryListItem";
import { StoryService } from "../../services/StoryService";

export class StoryMetadataElements
{
    public static readonly container = '#meta-container';
    public static readonly title = '#meta-title';
    public static readonly countComments = '#meta-count-comments';
    public static readonly countLikes = '#meta-count-likes';
    public static readonly date = '#meta-date';
    public static readonly linkStory = '#meta-link-story';
    public static readonly linkSite = '#meta-link-site';
}

const ELE = StoryMetadataElements;

/**
 * Class to display the metadata for a story.
 */
export class StoryMetadata
{
    private readonly _storyID: number;
    private _storyComp: StoryItem | null;

    /**
     * Constructor
     * @param {number} storyId - story ID
     */
    constructor (storyId: number)
    {
        this._storyID = storyId;
    }

    /**
     * Load the metadata then display it.
     */
    public async loadAndDisplayData()
    {
        // fetch the story metadata
        const storyService = new StoryService();
        this._storyComp = await storyService.fethStory(this._storyID);

        // now display it
        this.displayData();
    }

    //#region - Display Data -
    
    /**
     * Display the data
     */
    private displayData()
    {
        this.displayTitle();
        this.displayCountComments();
        this.displayCountLikes();
        this.displayDate();
        this.displayLinkStory();
        this.displayLinkSite();
    }

    /**
     * Display the title
     */
    private displayTitle()
    {
        if (this._storyComp?.title)
        {
            $(ELE.title).text(this._storyComp.title).removeClass('skeleton-text skeleton-effect-wave');
            $('title').text(this._storyComp.title);
        }
    }


    /**
     * Display the comment count
     */
    private displayCountComments()
    {
        if (this._storyComp?.descendants)
        {
            const countCommentsText = `${this._storyComp.descendants} comments`;
            $(ELE.countComments).text(countCommentsText);
        }

    }


    /**
     * Display the number of likes
     */
    private displayCountLikes()
    {
        if (this._storyComp?.score)
        {
            const countLikesText = `${this._storyComp.score} likes`;
            $(ELE.countLikes).text(countLikesText);   
        }
    }

    /**
     * Display the story date
     */
    private displayDate()
    {
        if (this._storyComp?.createdOnDuration)
        {
            const dateDiffString = getDifferenceDisplayString(this._storyComp?.createdOnDuration);
            $(ELE.date).text(dateDiffString);
        }

    }

    /**
     * Set the link to the story url
     */
    private displayLinkStory()
    {
        if (this._storyComp?.url)
        {
            this.setLink(this._storyComp?.url, ELE.linkStory);
        }
        
    }


    /**
     * Set the link to the hackernews post
     */
    private displayLinkSite()
    {
        if (this._storyComp?.siteUrl)
        {
            this.setLink(this._storyComp?.siteUrl, ELE.linkSite);
        }
        
    }



    /**
     * Set the specified link value
     * @param {string} url - url
     * @param {string} selector - html element link to set
     * @returns void
     */
    private setLink(url: string, selector: string)
    {
        if (url == null)
        {
            return;
        }

        $(selector).attr('href', url);
        $(selector).removeClass('disabled');
    }

    //#endregion
}



