

class Stories
{
    static DisplayTypes = {
        Card: 'card',
        List: 'list',
    }

    static SortingTypes = {
        None: 0,
        Score: 1,
        Descendants: 2,
        Title: 3,
    }

    constructor(a_strDisplayElement) {
        this.displayElement = a_strDisplayElement;
        this.stories = [];
    }

    async fetchTopStories(a_enumSortingType = Stories.SortingTypes.None) {
        const topStoriesList = await ApiWrapper.getTopStoriesIds();
        this.fetchStories(topStoriesList, a_enumSortingType);
    }

    async fetchStories(a_listStoryIDs, a_enumSortingType) {
        const storyPromises = [];

        for (const storyID of a_listStoryIDs) {
            const storyResponse = ApiWrapper.getStory(storyID);
            storyPromises.push(storyResponse);
        }

        const storyPromisesResponses = await Promise.all(storyPromises);

        this.stories = [];      // clear out the existing stories

        // weed out all of the non stories
        for (const story of storyPromisesResponses) {
            if (story.type == Constants.TYPES.STORY) {
                this.stories.push(story);
            }
        }

        // sort the stories if non-default value is given
        if (a_enumSortingType == Stories.SortingTypes.Score) {
            this.sortStoriesByScore();
        } else if (a_enumSortingType == Stories.SortingTypes.Descendants) {
            this.sortStoriesByDescendants();
        } else if (a_enumSortingType == Stories.SortingTypes.Title) {
            this.sortStoriesByTitle();
        }

        this.displayStories();
    }


    // sort the stories by their score
    sortStoriesByScore() {
        this.stories.sort(function(a, b) {
            return (a.score > b.score ? -1 : 1);
        });
    }

    // sort the stories by the number of comments
    sortStoriesByDescendants() {
        this.stories.sort(function(a, b) {
            return (a.descendants > b.descendants ? -1 : 1);
        });
    }

    // sort the stories by the title
    sortStoriesByTitle() {
        this.stories.sort(function(a, b) {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();

            return (titleA < titleB ? -1 : 1);
        });
    }


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




