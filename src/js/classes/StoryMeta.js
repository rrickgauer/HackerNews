import ApiWrapper from "./ApiWrapper";
import Dates from "./Dates";
import StoryComp from "./StoryComp";


/**
 * Class to display the metadata for a story.
 */
export default class StoryMeta
{

    /**
     * Constructor
     * @param {number} a_iStoryID - story ID
     */
    constructor(a_iStoryID) {
        this.storyID = a_iStoryID;

        // init everything to null before we fetch the data
        this.title         = null;
        this.countComments = null;
        this.countLikes    = null;
        this.date          = null;
        this.dateDiff      = null;
        this.linkStory     = null;
        this.linkSite      = null;


        // bind the object's methods
        this.loadAndDisplayData   = this.loadAndDisplayData.bind(this);
        this.displayData          = this.displayData.bind(this);
        this.displayTitle         = this.displayTitle.bind(this);
        this.displayCountComments = this.displayCountComments.bind(this);
        this.displayCountLikes    = this.displayCountLikes.bind(this);
        this.displayDate          = this.displayDate.bind(this);
        this.displayLinkStory     = this.displayLinkStory.bind(this);
        this.displayLinkSite      = this.displayLinkSite.bind(this);
        this.setLink              = this.setLink.bind(this);
    }

    /**
     * Load the metadata then display it.
     */
     async loadAndDisplayData() {
        // fetch the story metadata
        const storyApiResponse = await ApiWrapper.getStory(this.storyID);
        const storyComp = new StoryComp(storyApiResponse);

        // set the appropriate fields
        this.title         = storyComp.title;
        this.countComments = storyComp.descendants;
        this.countLikes    = storyComp.score;
        this.date          = storyComp.dt;
        this.dateDiff      = storyComp.dtDiff;
        this.linkStory     = storyComp.url;
        this.linkSite      = storyComp.siteUrl;

        // now display it
        this.displayData();

    }

    /**
     * Display the data
     */
    displayData() {
        
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
    displayTitle() {
        if (this.title == null) {
            return;
        }

        $(StoryMeta.TITLE).text(this.title).removeClass('skeleton-text skeleton-effect-wave');
    }

    /**
     * Display the comment count
     */
    displayCountComments() {
        if (this.countComments == null) {
            return;
        }

        const countCommentsText = `${this.countComments} comments`;
        $(StoryMeta.COUNT_COMMENTS).text(countCommentsText);
    }

    /**
     * Display the number of likes
     */
    displayCountLikes() {
        if (this.countLikes == null) {
            return;
        }

        const countLikesText = `${this.countLikes} likes`;
        $(StoryMeta.COUNT_LIKES).text(countLikesText);
    }

    /**
     * Display the story date
     */
    displayDate() {
        const dateDiffString = Dates.getDiffDisplayString(this.dateDiff);
        $(StoryMeta.DATE).text(dateDiffString);
    }

    /**
     * Set the link to the story url
     */
    displayLinkStory() {
        this.setLink(this.linkStory, StoryMeta.LINK_STORY);
    }

    /**
     * Set the link to the hackernews post
     */
    displayLinkSite() {
        this.setLink(this.linkSite, StoryMeta.LINK_SITE);
    }


    /**
     * Set the specified link value
     * @param {string} a_strValue - url
     * @param {string} a_strSelector - html element link to set
     * @returns void
     */
    setLink(a_strValue, a_strSelector) {
        if (a_strValue == null) {
            return;
        }

        $(a_strSelector).attr('href', a_strValue);
        $(a_strSelector).removeClass('disabled');
    }
}



StoryMeta.CONTAINER      = '#meta-container';
StoryMeta.TITLE          = '#meta-title';
StoryMeta.COUNT_COMMENTS = '#meta-count-comments';
StoryMeta.COUNT_LIKES    = '#meta-count-likes';
StoryMeta.DATE           = '#meta-date';
StoryMeta.LINK_STORY     = '#meta-link-story';
StoryMeta.LINK_SITE      = '#meta-link-site';