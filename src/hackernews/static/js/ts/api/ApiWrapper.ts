import { StoryApiResponse } from "../domain/models/stories/StoryApiResponse";
import { ApiUrls } from "./ApiUrls";

const URLS = ApiUrls;

export class ApiWrapper
{
    static async getTopStoriesIds()
    {
        let response = await fetch(URLS.TOP);
        return response.json();
    }

    static async getStory(id: number): Promise<StoryApiResponse>
    {
        const urlStory = ApiWrapper.getStoryUrl(id);
        const response = await fetch(urlStory);
        return response.json();
    }


    static getStoryUrl(id: number)
    {
        let url = `${URLS.STORY}${id}.json`;
        return url;
    }

    static getUserUrl(userID: string | number)
    {
        return `${URLS.URL_USER_BASE}${userID}`;
    }

}