import { ApiWrapper } from "../../../api/ApiWrapper";
import { StoryListItemCardTemplate } from "../../../templates/StoryListItemCardTemplate";
import { StoryListItemTemplate } from "../../../templates/StoryListItemTemplate";
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
    private readonly _selector: string;
    private _stories: StoryApiResponse[];
    private _currentDisplayType = StoriesDisplayType.Gallery;

    /**
     * Constructor
     */
    constructor (selector: string)
    {
        this._selector = selector;
        this._stories = [];
    }

    //#region - Fetch stories -

    /**
     * Fetch the stories from the hackernews api 
     */
    public async fetchTopStories(sortingType: StoriesSortingType): Promise<void>
    {
        const topStoriesList = await ApiWrapper.getTopStoriesIds();
        await this.fetchStories(topStoriesList, sortingType);
    }

    /**
     * Fetch the stories api responses using the given sorting types 
     */
    private async fetchStories(storyIds: number[], sortingType: StoriesSortingType): Promise<void>
    {
        // fetch each story metadata from api
        const storyApiResponses = await this.fetchStoryMetadata(storyIds);

        // weed out all of the non stories
        this._stories = storyApiResponses.filter(s => s.type === StoryType.STORY);

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
        this._stories = this._stories.sort((a, b) =>
        {
            return (a.score > b.score ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the number of comments
     */
    private sortStoriesByDescendants(): void
    {
        this._stories = this._stories.sort((a, b) =>
        {
            return (a.descendants > b.descendants ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the title
     */
    private sortStoriesByTitle(): void
    {
        this._stories = this._stories.sort((a, b) =>
        {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();

            return (titleA < titleB ? -1 : 1);
        });
    }

    //#endregion

    //#region - Display Stories -

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
        const htmlEngine = new StoryListItemCardTemplate();

        const html = //html
        `
        <div class="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
            ${htmlEngine.toHtmls(models)}
        </div>
        `;

        $(this._selector).html(html);
    }

    /**
     * Display the stories on the page AS A LIST
     */
    private displayStoriesList(): void
    {
        const models = this.getStoryModels();
        const htmlEngine = new StoryListItemTemplate();

        const html = //html
        `
        <ul class="list-group">
            ${htmlEngine.toHtmls(models)}
        </ul>
        `;

        $(this._selector).html(html);
    }

    private getStoryModels(): StoryListItem[]
    {
        return this._stories.map(s => new StoryListItem(s));
    }

    //#endregion
}

