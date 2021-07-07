


class ApiWrapper
{
    constructor() {

    }

    static async getTopStoriesIds() {
        let response = await fetch(ApiWrapper.URLS.TOP);
        return response.json();
    }

    static async getStory(id) {
        const urlStory = ApiWrapper.getStoryUrl(id);
        const response = await fetch(urlStory);
        return response.json();
    }


    static getStoryUrl(id) {
        let url = `${ApiWrapper.URLS.STORY}${id}.json`;
        return url;
    }

    static getUserUrl(userID) {
        return `${ApiWrapper.URL_USER_BASE}${userID}`;
    }

}


ApiWrapper.URL_BASE = 'https://hacker-news.firebaseio.com/v0/';
ApiWrapper.URL_USER_BASE = 'https://news.ycombinator.com/user?id=';


ApiWrapper.URLS = {
    TOP: ApiWrapper.URL_BASE + 'topstories.json',
    STORY: ApiWrapper.URL_BASE + 'item/',
}



