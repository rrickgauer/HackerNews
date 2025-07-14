import { DateTime, Duration } from "../../../lib/luxon";
import { getDifferenceNow } from "../../../utilities/dates";
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


    public mapChildren(): void
    {
        if (!this.kids)
        {
            return;
        }

        const children = this.kids.map(k => new CommentModel(k));
        children.forEach(c => c.mapChildren());
        this.kids = children;
    }
}


