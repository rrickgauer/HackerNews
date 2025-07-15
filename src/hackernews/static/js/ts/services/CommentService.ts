import { ApiWrapper } from "../api/ApiWrapper";
import { ApiResponse, ApiResponseComment } from "../domain/models/api-responses/responses";
import { CommentItem } from "../domain/models/comments/CommentItem";



export class CommentService
{
    public async getStoryComments(storyId: number): Promise<CommentItem[]>
    {
        const topLevelCommentIds = await this.getChildrenIds(storyId);

        const comments = await Promise.all(topLevelCommentIds.map(id => this.fetchComment(id)));

        for(const comment of comments)
        {
            comment.kids = await this.fetchChildComments(comment);
        }

        return comments;
    }

    private async fetchChildComments(comment: CommentItem): Promise<CommentItem[]>
    {
        const childComments = await Promise.all(comment.childrenIds.map(id => this.fetchComment(id)));

        for(const child of childComments)
        {
            child.kids = await this.fetchChildComments(child);
        }

        return childComments;
    }

    private async fetchComment(commentId: number): Promise<CommentItem>
    {
        const response = await ApiWrapper.getItem<ApiResponseComment>(commentId);
        return new CommentItem(response);
    }

    private async getChildrenIds(itemId: number): Promise<number[]>
    {
        const response = await ApiWrapper.getItem<ApiResponse>(itemId);

        return response.kids ?? [];
    }

    
}