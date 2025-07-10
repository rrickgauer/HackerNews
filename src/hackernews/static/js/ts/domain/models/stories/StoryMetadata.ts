import { ApiWrapper } from "../../../api/ApiWrapper";
import { DateTime, Duration } from "../../../lib/luxon";
import { getDiffDisplayString } from "../../../utilities/dates";
import { StoryListItem } from "./StoryListItem";



/**
 * Class to display the metadata for a story.
 */
export class StoryMetadata
{
    static CONTAINER = '#meta-container';
    static TITLE = '#meta-title';
    static COUNT_COMMENTS = '#meta-count-comments';
    static COUNT_LIKES = '#meta-count-likes';
    static DATE = '#meta-date';
    static LINK_STORY = '#meta-link-story';
    static LINK_SITE = '#meta-link-site';

    public storyID: number;
    public title: string;
    public countComments: number;
    public countLikes: number;
    public date: DateTime;
    public dateDiff: Duration;
    public linkStory: string;
    public linkSite: string;

    /**
     * Constructor
     * @param {number} storyId - story ID
     */
    constructor (storyId: number)
    {
        this.storyID = storyId;
    }

    /**
     * Load the metadata then display it.
     */
    public async loadAndDisplayData()
    {
        // fetch the story metadata
        const storyApiResponse = await ApiWrapper.getStory(this.storyID);
        const storyComp = new StoryListItem(storyApiResponse);

        // set the appropriate fields
        this.title = storyComp.title;
        this.countComments = storyComp.descendants;
        this.countLikes = storyComp.score;
        this.date = storyComp.dt;
        this.dateDiff = storyComp.dtDiff;
        this.linkStory = storyComp.url;
        this.linkSite = storyComp.siteUrl;

        // now display it
        this.displayData();

    }

    /**
     * Display the data
     */
    displayData()
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
    displayTitle()
    {
        if (this.title)
        {
            $(StoryMetadata.TITLE).text(this.title).removeClass('skeleton-text skeleton-effect-wave');
        }
    }


    /**
     * Display the comment count
     */
    displayCountComments()
    {
        if (this.countComments)
        {
            const countCommentsText = `${this.countComments} comments`;
            $(StoryMetadata.COUNT_COMMENTS).text(countCommentsText);
        }

    }


    /**
     * Display the number of likes
     */
    displayCountLikes()
    {
        if (this.countLikes)
        {
            const countLikesText = `${this.countLikes} likes`;
            $(StoryMetadata.COUNT_LIKES).text(countLikesText);   
        }
    }

    /**
     * Display the story date
     */
    displayDate()
    {
        const dateDiffString = getDiffDisplayString(this.dateDiff);
        $(StoryMetadata.DATE).text(dateDiffString);
    }

    /**
     * Set the link to the story url
     */
    displayLinkStory()
    {
        this.setLink(this.linkStory, StoryMetadata.LINK_STORY);
    }


    /**
     * Set the link to the hackernews post
     */
    displayLinkSite()
    {
        this.setLink(this.linkSite, StoryMetadata.LINK_SITE);
    }



    /**
     * Set the specified link value
     * @param {string} url - url
     * @param {string} selector - html element link to set
     * @returns void
     */
    setLink(url: string, selector: string)
    {
        if (url == null)
        {
            return;
        }

        $(selector).attr('href', url);
        $(selector).removeClass('disabled');
    }
}



