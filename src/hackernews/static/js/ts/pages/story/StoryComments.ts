import { CommentService } from "../../services/CommentService";
import { CommentItemTemplate } from "../../templates/CommentItemTemplate";


export class StoryCommentsElements
{
    public static readonly commentsListId = '#comments-list';
}

const ELE = StoryCommentsElements;

export class StoryComments
{
    private readonly _storyId: number;
    private readonly _commentService: CommentService;
    private readonly _htmlEngine: CommentItemTemplate;

    constructor(storyId: number)
    {
        this._storyId = storyId;
        this._commentService = new CommentService();
        this._htmlEngine = new CommentItemTemplate();
    }

    public async displayComments()
    {
        const comments = await this._commentService.getStoryComments(this._storyId);
        const html = this._htmlEngine.toHtmls(comments);
        $(ELE.commentsListId).html(html).find('a').attr("target", "_blank");
    }
}
