import { ApiWrapper } from "../../../api/ApiWrapper";
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
    displayType: string;

    /**
     * Constructor
     * @param {string} selector css selector of where to place all the story cards
     */
    constructor (selector: string)
    {
        this.displayElement = selector;
        this.stories = [];
        this.displayType = StoriesDisplayType.Gallery;
    }


    /**
     * Fetch the stories from the hackernews api 
     * @param {Stories.SortingTypes} sortingType How should the stories be sorted once they have been fetched
     */
    async fetchTopStories(sortingType: StoriesSortingType)
    {
        const topStoriesList = await ApiWrapper.getTopStoriesIds();
        this.fetchStories(topStoriesList, sortingType);
    }

    /**
     * Fetch the stories api responses using the given sorting types 
     * @param {list[number]} a_listStoryIDs list of story ids
     * @param {number} a_enumSortingType sorting type
     */
    async fetchStories(a_listStoryIDs: number[], a_enumSortingType: number)
    {
        const self = this;
        const storyPromises: Promise<StoryApiResponse>[] = [];

        for (const storyID of a_listStoryIDs)
        {
            const storyResponse = ApiWrapper.getStory(storyID);
            storyPromises.push(storyResponse);
        }

        const storyPromisesResponses = await Promise.all(storyPromises);

        this.stories = [];      // clear out the existing stories

        // weed out all of the non stories
        for (const story of storyPromisesResponses)
        {
            if (story.type == StoryType.STORY)
            {
                this.stories.push(story);
            }
        }

        switch (a_enumSortingType)
        {
            case StoriesSortingType.Score:
                self.sortStoriesByScore();
                break;
            case StoriesSortingType.Descendants:
                self.sortStoriesByDescendants();
                break;
            case StoriesSortingType.Title:
                self.sortStoriesByTitle();
                break;
        }

        this.displayStories();
    }


    /**
     * Sort the stories by their score
     */
    sortStoriesByScore()
    {
        this.stories = this.stories.sort(function (a, b)
        {
            return (a.score > b.score ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the number of comments
     */
    sortStoriesByDescendants()
    {
        this.stories = this.stories.sort(function (a, b)
        {
            return (a.descendants > b.descendants ? -1 : 1);
        });
    }

    /**
     * Sort the stories by the title
     */
    sortStoriesByTitle()
    {
        this.stories = this.stories.sort(function (a, b)
        {
            const titleA = a.title.toUpperCase();
            const titleB = b.title.toUpperCase();

            return (titleA < titleB ? -1 : 1);
        });
    }

    /**
     * Display the stories on the page
     */
    displayStories()
    {

        if (this.displayType == StoriesDisplayType.Gallery)
        {
            this.displayStoriesGallery();
        } else
        {
            this.displayStoriesList();
        }

    }

    /**
     * Display the stories on the page AS A GALLERY
     */
    displayStoriesGallery()
    {
        let html = '<div class="card-deck">';
        let count = 0;

        for (const story of this.stories)
        {
            if (count == 3)
            {
                html += '</div><div class="card-deck">';
                count = 0;
            }

            const storyCard = new StoryListItem(story);
            html += storyCard.getCardHtml();

            count++;
        }

        html += '</div>';

        $(this.displayElement).html(html);
    }

    /**
     * Display the stories on the page AS A LIST
     */
    displayStoriesList()
    {
        let html = `<ul class="list-group">`;

        for (const story of this.stories)
        {
            const storyCard = new StoryListItem(story);
            html += storyCard.getListItemHtml();
        }

        html += '</ul>';

        $(this.displayElement).html(html);
    }
}

