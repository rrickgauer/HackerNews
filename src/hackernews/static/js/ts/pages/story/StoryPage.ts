import { StoryComments } from "./StoryComments";
import { StoryMetadata } from "./StoryMetadata";
import { ViewStoryForm } from "../../helpers/view-story-form/ViewStoryForm";
import { enableJumpButton } from "../../utilities/jump-button";
import { urlGetPathSectionValue } from "../../utilities/urls";
import { CommentItemTemplateElements } from "../../templates/CommentItemTemplate";

export class StoryPageElements
{
    public static readonly commentsContainerId = `#comments-list`;
}

const ELE = StoryPageElements;
const CLE = CommentItemTemplateElements;

export class StoryPage
{
    private readonly _storyId: number;
    private readonly _storyMetadata: StoryMetadata;
    private readonly _comments: StoryComments;

    constructor ()
    {
        this._storyId = parseInt(urlGetPathSectionValue(1));
        this._storyMetadata = new StoryMetadata(this._storyId);
        this._comments = new StoryComments(this._storyId);
    }

    public async control()
    {
        ViewStoryForm.initialize();
        
        await this._storyMetadata.loadAndDisplayData();
        await this._comments.displayComments();
        this.addListeners();
        enableJumpButton();

    }
    
    /**
     * Add the event listeners to the page elements
     */
    private addListeners()
    {
        $(ELE.commentsContainerId).on('click', `.${CLE.btnToggleClass}`, (e) =>
        {
            e.preventDefault();
            this.toggleCommentVisibility(e.target);
        });
    }


    /**
     * Show/hide a comment thread actions
     */
    private toggleCommentVisibility(buttonElement: HTMLElement)
    {
        const eComment = $(buttonElement).closest(`.${CLE.containerClass}`);

        // toggle comment visibility
        $(eComment).toggleClass(CLE.visibilityClass);

        // update the button text to show or hide
        const btnText = $(eComment).hasClass(CLE.visibilityClass) ? 'Show' : 'Hide';
        $(buttonElement).text(btnText);
    }
}
