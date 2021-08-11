

class StoryMeta
{
    static CONTAINER      = '#meta-container';
    static TITLE          = '#meta-title';
    static COUNT_COMMENTS = '#meta-count-comments';
    static COUNT_LIKES    = '#meta-count-likes';
    static DATE           = '#meta-date';
    static LINK_STORY     = '#meta-link-story';
    static LINK_SITE      = '#meta-link-site';

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

    }

    loadAndDisplayData = async() => {
        // fetch the story metadata
        const storyApiResponse = await ApiWrapper.getStory(this.storyID);
        const storyComp = new StoryComp(storyApiResponse);

        this.title         = storyComp.title;
        this.countComments = storyComp.descendants;
        this.countLikes    = storyComp.score;
        this.date          = storyComp.dt;
        this.dateDiff      = storyComp.dtDiff;
        this.linkStory     = storyComp.url;
        this.linkSite      = storyComp.siteUrl;

        console.log(this);

        this.displayData();

    }

    displayData = () => {
        $(StoryMeta.TITLE).text(this.title);
        $(StoryMeta.COUNT_COMMENTS).text(`${this.countComments} comments`);
        $(StoryMeta.COUNT_LIKES).text(`${this.countLikes} likes`);
        $(StoryMeta)
    }






}