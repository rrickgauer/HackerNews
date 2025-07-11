import { StoryType } from "../../enums/StoryType";


export interface CommentApiResponse
{
    by: string;
    id: number;
    kids: number[] | CommentApiResponse[];
    parent: number;
    text: string;
    time: number;
    type: StoryType;
}
