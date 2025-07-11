import { DateTime, Duration } from "../../../lib/luxon";
import { getDifferenceNow } from "../../../utilities/dates";
import { StoryApiResponse } from "./StoryApiResponse";

export class StoryListItem
{
    public static readonly StoryItemClass = 'story-item';

    public siteUrl: string;
    public time: number;
    public dt: DateTime;
    public dtDiff: Duration;
    public by: string;
    public descendants: number;
    public id: number;
    public kids: number[] | StoryListItem[] | StoryApiResponse[];
    public score: number;
    public title: string;
    public type: string;
    public url: string;

    constructor (apiResponse: StoryApiResponse)
    {
        this.by = apiResponse.by;
        this.descendants = apiResponse.descendants;
        this.id = apiResponse.id;
        this.kids = apiResponse.kids;
        this.score = apiResponse.score;
        this.time = apiResponse.time;
        this.title = apiResponse.title;
        this.type = apiResponse.type;
        this.url = apiResponse.url;

        this.siteUrl = `https://news.ycombinator.com/item?id=${this.id}`;

        this.dt = DateTime.fromSeconds(this.time);
        this.dtDiff = getDifferenceNow(this.dt);
    }

}
