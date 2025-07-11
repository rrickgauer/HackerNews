import { ApiWrapper } from "../../../api/ApiWrapper";
import { DateTime, Duration } from "../../../lib/luxon";
import { getDiffDisplayString, getDifferenceNow } from "../../../utilities/dates";
import { StoryType } from "../../enums/StoryType";
import { CommentApiResponse } from "./CommentApiResponse";


export class CommentModel implements CommentApiResponse
{
    public by: string;
    public id: number;
    public kids: number[] | CommentModel[];
    public parent: number;
    public text: string;
    public time: number;
    public type: StoryType;
    public dt: DateTime;
    public dtDiff: Duration;

    constructor (apiResponse: CommentApiResponse)
    {
        this.by = apiResponse.by;
        this.id = apiResponse.id;
        this.parent = apiResponse.parent;
        this.text = apiResponse.text;
        this.time = apiResponse.time;
        this.type = apiResponse.type;
        this.kids = apiResponse.kids as number[];

        this.dt = DateTime.fromSeconds(this.time);
        this.dtDiff = getDifferenceNow(this.dt);
    }


    public getHtml(): string
    {
        // const this = this;

        const userUrl = ApiWrapper.getUserUrl(this.by);
        
        const userUrlDisplay = //html 
        `
        <a class="text-decoration-none text-reset hover-underline" href=${userUrl}>
            ${this.by}
        </a>
        `;

        const dateDisplay = getDiffDisplayString(this.dtDiff);
        const kidsCommentsDisplay = this.getChildrenHtml();
        const displayText = this.formatText();

        let html = //html
            `<hr>

            <li class="comment-item">
                <div class="d-flex">
                    <p class="comment-item-meta">
                        <small class="text-body-secondary">
                            <span>${userUrlDisplay} &#183; ${dateDisplay}</span> &#183; 
                            <a href="#" class="comment-item-btn-toggle-thread text-decoration-none text-reset hover-underline">Hide</a>
                        </small>
                    </p>
                </div>

                <div class="comment-item-thread">
                    <div class="comment-item-text">${displayText}</div>
                    <ul class="list-comments list-unstyled">${kidsCommentsDisplay}</ul>
                </div>
            </li>
        `;

        return html;
    }

    public getChildrenHtml(): string
    {
        let kidsCommentsHtml = '';

        if (this.kids == null)
        {
            return kidsCommentsHtml;
        }

        for (const kid of this.kids)
        {
            const kidComment = new CommentModel(kid as CommentModel);
            kidsCommentsHtml += kidComment.getHtml();
        }

        return kidsCommentsHtml;
    }

    /**
     * Wraps the first section of the comment text in a <p> tag.
     */
    public formatText(): string
    {
        if (this.text == null)
        {
            return this.text;
        }

        // get the index of the first p tag
        const index = this.text.indexOf('<p>');

        // split up the string where the tag starts
        const startText = this.text.substring(0, index);
        const endText = this.text.substring(index);

        // wrap the initial section in a p tag
        const outText = `<p>${startText}</p>${endText}`;

        return outText;
    }
}


