import { StoriesSortingType } from "../../domain/enums/StoriesSortingType";
import { Stories } from "../../domain/models/stories/Stories";
import { StoryListItem } from "../../domain/models/stories/StoryListItem";
import { ViewStoryForm } from "../../helpers/view-story-form/ViewStoryForm";
import { enableJumpButton } from "../../utilities/jump-button";


export class HomePageElements
{
    public static readonly eSortingSelect = '#stories-sort-option';
    public static readonly eStoriesContainer = '#stories-container';
    public static readonly eStoryItemClass = `.${StoryListItem.StoryItemClass}`;
    public static readonly eStoriesBsContainer = '#stories-bs-container';
    public static readonly eWidescreenCheckboxInput = '#widescreen-checkbox-input';
    public static readonly eViewSelection = 'stories-display-option';
}

const ELE = HomePageElements;

export class HomePage
{
    private readonly _stories: Stories;
    private readonly _viewStoryForm: ViewStoryForm;

    constructor ()
    {
        this._stories = new Stories(ELE.eStoriesContainer);
        this._viewStoryForm = new ViewStoryForm();
    }

    public async control()
    {
        this.showStoriesContainerSpinner();

        await this._stories.fetchTopStories(StoriesSortingType.Default);

        this.addEventListeners();

        enableJumpButton();

        this._viewStoryForm.control();
    }

    /**************************************************
    Add all the event listeners
    ***************************************************/
    private addEventListeners()
    {
        $(ELE.eSortingSelect).on('change', (e) =>
        {
            this.updateStorySorting();
        });

        $('body').on('click', ELE.eStoryItemClass, (e) =>
        {
            this.gotoStory(e);
        });

        $(`input[name='${ELE.eViewSelection}']`).on('change', (e) =>
        {
            this.updateStoriesView();
        });

        $(ELE.eWidescreenCheckboxInput).on('change', (e) =>
        {
            this.toggleWideScreen();
        });
    }

    /**************************************************
    Update the stories sorting
    ***************************************************/
    private updateStorySorting()
    {
        const newSortingValue = parseInt($(ELE.eSortingSelect).find('option:checked').val() as string);
        this._stories.displayType = this.getStoriesViewInputValue();
        this._stories.fetchTopStories(newSortingValue);
        this.showStoriesContainerSpinner();
    }

    /**************************************************
    Show the spinner in the stories container
    ***************************************************/
    private showStoriesContainerSpinner()
    {
        let html = //html
        `
        <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border text-primary mt-5" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;

        $(ELE.eStoriesContainer).html(html);
    }

    /**************************************************
    Depending on which part of the story card the user clicked,
    go to either the comments section page, or the story url.
    ***************************************************/
    private gotoStory(e)
    {
        if (e.target.className == 'card-story-link')
        {
            return;
        }

        const card = $(e.target).closest(ELE.eStoryItemClass);
        const storyID = $(card).attr('data-id');

        const url = `/stories/${storyID}`;
        window.open(url, "_blank");
    }

    /**************************************************
    Update the story elements view (gallery or list).
    ***************************************************/
    private updateStoriesView()
    {
        this.showStoriesContainerSpinner();
        this._stories.displayType = this.getStoriesViewInputValue();
        this._stories.displayStories();
    }

    /**************************************************
    Get the value of the checked stories view radio option.
    ***************************************************/
    private getStoriesViewInputValue()
    {
        return $(`input[name='${ELE.eViewSelection}']:checked`).val() as string;
    }

    private toggleWideScreen()
    {
        $(ELE.eStoriesBsContainer).toggleClass('container-fluid').toggleClass('container');
    }

}


