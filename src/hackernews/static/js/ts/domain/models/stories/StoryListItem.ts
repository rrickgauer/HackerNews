import { DateTime, Duration } from "../../../lib/luxon";
import { getDiffDisplayString, getDifferenceNow } from "../../../utilities/dates";
import { StoryApiResponse } from "./StoryApiResponse";

export class StoryListItem
{
    public static readonly StoryItemClass = 'story-item';
    public static readonly StoryCardClass = 'story-item-card';
    public static readonly StoryListItemClass = 'story-item-list-item';

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

    /**
     * Generate the card html
     * @returns Story card html string
     */
    public getCardHtml(): string
    {
        const url = this.url == null ? this.siteUrl : this.url;
        const dtDisplay = getDiffDisplayString(this.dtDiff);

        // add commas to score and descendants
        const scoreDisplay = this.score.toLocaleString();
        const descendantsDisplay = this.descendants.toLocaleString();

        let html = //html
        `
        <div class="${StoryListItem.StoryItemClass} card ${StoryListItem.StoryCardClass} custom-shadow" data-id=${this.id}>
            <div class="card-body">
                <h5 class="card-title"><a href="${url}" target="_blank" class="card-story-link">${this.title}</a></h5>
                <p class="text-muted"><small>${dtDisplay}</small></p>
                <p class="text-muted"><i class='bx bxs-user'></i>&nbsp;${this.by}</p>
            </div>
            <div class="card-footer px-4">
                <div class="d-flex align-baseline justify-content-between">
                    <span><i class='bx bx-like'></i>&nbsp;${scoreDisplay}</span>
                    <span><i class='bx bx-comment-detail'></i>&nbsp;${descendantsDisplay}</span>
                </div>
            </div>
        </div>`;

        return html;
    }

    public getListItemHtml(): string
    {
        const url = this.url == null ? this.siteUrl : this.url;
        const dtDisplay = getDiffDisplayString(this.dtDiff);

        let html = //html
            `
        <li class="${StoryListItem.StoryItemClass} ${StoryListItem.StoryListItemClass} list-group-item" data-id=${this.id}>
            <h5 class="card-title"><a href="${url}" target="_blank" class="card-story-link">${this.title}</a></h5>
            <p class="text-muted"><small>${dtDisplay}</small></p>
            <p class="text-muted"><i class='bx bxs-user'></i>&nbsp;${this.by}</p>
            <div class="d-flex align-baseline">
                <span class="mr-3"><i class='bx bx-like'></i>&nbsp;${this.score}</span>
                <span><i class='bx bx-comment-detail'></i>&nbsp;${this.descendants}</span>
            </div>
        </li>`;

        return html;
    }
}
