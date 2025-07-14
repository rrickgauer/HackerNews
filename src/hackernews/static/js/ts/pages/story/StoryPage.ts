import { StoryComments } from "../../domain/models/stories/StoryComments";
import { StoryMetadata } from "../../domain/models/stories/StoryMetadata";
import { ViewStoryForm } from "../../helpers/view-story-form/ViewStoryForm";
import { enableJumpButton } from "../../utilities/jump-button";
import { urlGetPathSectionValue } from "../../utilities/urls";
import { eCommentsContainer, eComments } from "./StoryPageHtmlSelectors";

export class StoryPage
{
    private _storyId: number;
    private _storyMetadata: StoryMetadata;
    private _storyComments: StoryComments;

    constructor ()
    {
        this._storyId = parseInt(urlGetPathSectionValue(1));
        this._storyMetadata = new StoryMetadata(this._storyId);
        this._storyComments = new StoryComments(this._storyId);
    }

    public async control()
    {
        ViewStoryForm.initialize();
        
        await this._storyMetadata.loadAndDisplayData();
        await this._storyComments.fetchStoryData();
        this.addListeners();
        enableJumpButton();
    }

    /**
     * Add the event listeners to the page elements
     */
    private addListeners()
    {
        $(eCommentsContainer).on('click', eComments.toggleButton, (e) =>
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
        const eComment = $(buttonElement).closest(eComments.item);

        // toggle comment visibility
        $(eComment).toggleClass(eComments.visibilityClass);

        // update the button text to show or hide
        const btnText = $(eComment).hasClass(eComments.visibilityClass) ? 'Show' : 'Hide';
        $(buttonElement).text(btnText);
    }
}
