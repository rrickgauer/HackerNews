import { ApiResponse } from "../domain/models/api-responses/responses";
import { ApiUrls } from "./ApiUrls";

const URLS = ApiUrls;

export class ApiWrapper
{
    public static async getTopStoriesIds(): Promise<Array<number>>
    {
        let response = await fetch(URLS.TOP);
        return response.json();
    }

    public static async getItem<T extends ApiResponse>(id: number): Promise<T>
    {
        const urlStory = ApiWrapper.getStoryUrl(id);
        const response = await fetch(urlStory);
        return response.json();
    }


    public static getStoryUrl(id: number)
    {
        let url = `${URLS.STORY}${id}.json`;
        return url;
    }

    public static getUserUrl(userID: string | number)
    {
        return `${URLS.URL_USER_BASE}${userID}`;
    }

}