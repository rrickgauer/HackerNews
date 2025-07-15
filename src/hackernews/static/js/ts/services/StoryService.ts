import { ApiWrapper } from "../api/ApiWrapper";
import { ApiResponseStory } from "../domain/models/api-responses/responses";
import { StoryItem } from "../domain/models/stories/StoryListItem";


export class StoryService
{
    public async fethStory(storyId: number): Promise<StoryItem>
    {
        const response = await ApiWrapper.getItem<ApiResponseStory>(storyId);

        return new StoryItem(response);
    }
}