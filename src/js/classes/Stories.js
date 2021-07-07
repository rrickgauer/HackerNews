



/**
 * This class is responsible for retrieving and displaying all the stories.
 */
class Stories
{
    static DISPLAY_TYPES = {
        Card: 'card',
        List: 'list',
    }
    

    static SORTING_TYPES = {
        Default: 0,
        Score: 1,
        Descendants: 2,
        Title: 3,
    }

    static STORY_TYPES = {
        JOB: 'job',
        STORY: 'story',
        COMMENT: 'comment',
        POLL: 'poll',
        POLLOPT: 'pollopt',
    };

    /**
     * Constructor
     * @param {string} a_strDisplayElement css selector of where to place all the story cards
     */
    constructor(a_strDisplayElement) {
        this.displayElement = a_strDisplayElement;
        this.stories = [];
    }


    /**
     * Fetch the stories from the hackernews api 
     * @param {Stories.SortingTypes} a_enumSortingType How should the stories be sorted once they have been fetched
     */
    async fetchTopStories(a_enumSortingType = Stories.SORTING_TYPES.Default) {
        const topStoriesList = await ApiWrapper.getTopStoriesIds();
        this.fetchStories(topStoriesList, a_enumSortingType);
    }

    /**
     * Fetch the stories api responses using the given sorting types 
     * @param {list[number]} a_listStoryIDs list of story ids
     * @param {number} a_enumSortingType sorting type
     */
    async fetchStories(a_listStoryIDs, a_enumSortingType) {
        const self = this;
        const storyPromises = [];

        for (const storyID of a_listStoryIDs) {
            const storyResponse = ApiWrapper.getStory(storyID);
            storyPromises.push(storyResponse);
        }

        const storyPromisesResponses = await Promise.all(storyPromises);

        this.stories = [];      // clear out the existing stories

        // weed out all of the non stories
        for (const story of storyPromisesResponses) {
            if (story.type == Stories.STORY_TYPES.STORY) {
                this.stories.push(story);
            }
        }

        switch(a_enumSortingType) {
            case Stories.SORTING_TYPES.Score:
                self.sortStoriesByScore(); 
                break;
            case Stories.SORTING_TYPES.Descendants:
                self.sortStoriesByDescendants(); 
                break;
            case Stories.SORTING_TYPES.Title:
                self.sortStoriesByTitle(); 
                break;
        }

        this.displayStories();
    }


    /**
     * Sort the stories by their score
     */
    sortStoriesByScore() {

        this.stories = this.stories.sort(function(a, b) {
            return (a.score > b.score ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the number of comments
     */
    sortStoriesByDescendants() {
        this.stories = this.stories.sort(function(a, b) {
            return (a.descendants > b.descendants ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the title
     */
    sortStoriesByTitle() {
        this.stories = this.stories.sort(function(a, b) {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();

            return (titleA < titleB ? -1 : 1);
        });
    }

    /**
     * Display the stories on the page
     */
    displayStories() {
        let html = '<div class="card-deck">';
        let count = 0;

        for (const story of this.stories) {
            if (count == 3) {
                html += '</div><div class="card-deck">';
                count = 0;
            }

            const storyCard = new StoryComp(story);
            html += storyCard.getCardHtml();

            count++;
        }

        html += '</div>';

        $(this.displayElement).html(html);
    }
}




