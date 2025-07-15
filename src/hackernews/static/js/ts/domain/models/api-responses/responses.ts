import { ItemType } from "../../enums/ItemType";

export type ApiResponse = {
    id: number;
    by: string;
    kids?: number[];
    time: number;
    type: ItemType;
}


export type ApiResponseStory = ApiResponse & {
    descendants: number;
    score: number;
    title: string;
    url: string;
}

export type ApiResponseComment = ApiResponse & {
    parent: number;
    text: string;
}
