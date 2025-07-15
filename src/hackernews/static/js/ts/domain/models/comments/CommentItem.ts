import { DateTime } from "../../../lib/luxon";
import { getDateTimeFromUnix } from "../../../utilities/dates";
import { ItemType } from "../../enums/ItemType";
import { ApiResponseComment } from '../api-responses/responses';

export class CommentItem
{
    public readonly parent: number;
    public readonly text: string;
    public readonly id: number;
    public readonly by: string;
    public readonly time: DateTime;
    public readonly type: ItemType = ItemType.COMMENT;
    public readonly childrenIds: number[];

    public kids: CommentItem[] = [];

    constructor(apiResponse: ApiResponseComment)
    {
        this.parent = apiResponse.parent;
        this.text = apiResponse.text;
        this.id = apiResponse.id;
        this.by = apiResponse.by;
        this.time = getDateTimeFromUnix(apiResponse.time);
        this.childrenIds = apiResponse.kids ?? [];
    }
}
