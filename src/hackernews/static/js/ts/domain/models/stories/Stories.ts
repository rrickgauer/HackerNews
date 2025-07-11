import { ApiWrapper } from "../../../api/ApiWrapper";
import { StoriesItemCardTemplate } from "../../../templates/StoriesItemCardTemplate";
import { StoriesItemListTemplate } from "../../../templates/StoriesItemListTemplate";
import { StoriesDisplayType } from "../../enums/StoriesDisplayType";
import { StoriesSortingType } from "../../enums/StoriesSortingType";
import { StoryType } from "../../enums/StoryType";
import { StoryApiResponse } from "./StoryApiResponse";
import { StoryListItem } from "./StoryListItem";


/**
 * This class is responsible for retrieving and displaying all the stories.
 */
export class Stories
{    
    displayElement: string;
    stories: StoryApiResponse[];
    
    private _currentDisplayType = StoriesDisplayType.Gallery;

    /**
     * Constructor
     * @param {string} selector css selector of where to place all the story cards
     */
    constructor (selector: string)
    {
        this.displayElement = selector;
        this.stories = [];
    }

    /**
     * Fetch the stories from the hackernews api 
     * @param {Stories.SortingTypes} sortingType How should the stories be sorted once they have been fetched
     */
    public async fetchTopStories(sortingType: StoriesSortingType): Promise<void>
    {
        const topStoriesList = await ApiWrapper.getTopStoriesIds();
        await this.fetchStories(topStoriesList, sortingType);
    }

    /**
     * Fetch the stories api responses using the given sorting types 
     * @param {list[number]} storyIds list of story ids
     * @param {number} sortingType sorting type
     */
    private async fetchStories(storyIds: number[], sortingType: StoriesSortingType): Promise<void>
    {
        // fetch each story metadata from api
        const storyApiResponses = await this.fetchStoryMetadata(storyIds);

        // weed out all of the non stories
        this.stories = storyApiResponses.filter(s => s.type === StoryType.STORY);

        // sort them
        this.sortStories(sortingType);

        // display them
        this.displayStories(this._currentDisplayType);
    }

    private async fetchStoryMetadata(storyIds: number[]): Promise<StoryApiResponse[]>
    {
        return await Promise.all(storyIds.map(id => ApiWrapper.getStory(id)));
    }


    private sortStories(sortType: StoriesSortingType): void
    {
        switch (sortType)
        {
            case StoriesSortingType.Score:
                this.sortStoriesByScore();
                break;
            case StoriesSortingType.Descendants:
                this.sortStoriesByDescendants();
                break;
            case StoriesSortingType.Title:
                this.sortStoriesByTitle();
                break;
        }
    }

    /**
     * Sort the stories by their score
     */
    private sortStoriesByScore(): void
    {
        this.stories = this.stories.sort((a, b) =>
        {
            return (a.score > b.score ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the number of comments
     */
    private sortStoriesByDescendants(): void
    {
        this.stories = this.stories.sort((a, b) =>
        {
            return (a.descendants > b.descendants ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the title
     */
    private sortStoriesByTitle(): void
    {
        this.stories = this.stories.sort((a, b) =>
        {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();

            return (titleA < titleB ? -1 : 1);
        });
    }


    public displayStories(displayType: StoriesDisplayType)
    {

        this._currentDisplayType = displayType;

        switch(displayType)
        {
            case StoriesDisplayType.Gallery:
                this.displayStoriesGallery();
                break;
            
            case StoriesDisplayType.List:
                this.displayStoriesList();
                break;

            default:
                throw new Error(`Unknown display type: ${displayType}`);
        }
    }


    /**
     * Display the stories on the page AS A GALLERY
     */
    private displayStoriesGallery(): void
    {
        const models = this.getStoryModels();
        const htmlEngine = new StoriesItemCardTemplate();

        const html = //html
        `
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            ${htmlEngine.toHtmls(models)}
        </div>
        `;

        $(this.displayElement).html(html);
    }

    /**
     * Display the stories on the page AS A LIST
     */
    private displayStoriesList(): void
    {
        const models = this.getStoryModels();
        const htmlEngine = new StoriesItemListTemplate();

        const html = //html
        `
        <ul class="list-group">
            ${htmlEngine.toHtmls(models)}
        </ul>
        `;

        $(this.displayElement).html(html);
    }

    private getStoryModels(): StoryListItem[]
    {
        return this.stories.map(s => new StoryListItem(s));
    }
}

