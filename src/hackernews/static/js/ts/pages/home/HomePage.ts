import { StoriesDisplayType } from "../../domain/enums/StoriesDisplayType";
import { StoriesSortingType } from "../../domain/enums/StoriesSortingType";
import { StoriesList } from "./StoriesList";
import { StoryItem } from "../../domain/models/stories/StoryListItem";
import { ViewStoryForm } from "../../helpers/view-story-form/ViewStoryForm";
import { enableJumpButton } from "../../utilities/jump-button";


export class HomePageElements
{
    public static readonly sortingSelectInputId = '#stories-sort-option';
    public static readonly storiesContainerId = '#stories-container';
    public static readonly storyItemClass = `.${StoryItem.StoryItemClass}`;
    public static readonly storiesBsContainerClass = '#stories-bs-container';
    public static readonly widescreenCheckboxInputOd = '#widescreen-checkbox-input';
    public static readonly displaySelectOptionClass = 'stories-display-option';
}

const ELE = HomePageElements;

export class HomePage
{
    private readonly _stories: StoriesList;
    private readonly _viewStoryForm: ViewStoryForm;

    constructor ()
    {
        this._stories = new StoriesList(ELE.storiesContainerId);
        this._viewStoryForm = new ViewStoryForm();
    }

    public async control()
    {
        ViewStoryForm.initialize();

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
        $(ELE.sortingSelectInputId).on('change', (e) =>
        {
            this.updateStorySorting();
        });

        $('body').on('click', ELE.storyItemClass, (e) =>
        {
            this.gotoStory(e);
        });

        $(`input[name='${ELE.displaySelectOptionClass}']`).on('change', (e) =>
        {
            this.updateStoriesView();
        });

        $(ELE.widescreenCheckboxInputOd).on('change', (e) =>
        {
            this.toggleWideScreen();
        });
    }

    /**************************************************
    Update the stories sorting
    ***************************************************/
    private updateStorySorting()
    {
        const newSortingValue = parseInt($(ELE.sortingSelectInputId).find('option:checked').val() as string);
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

        $(ELE.storiesContainerId).html(html);
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

        const card = $(e.target).closest(ELE.storyItemClass);
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
        const displayType = this.getStoriesViewInputValue();
        this._stories.displayStories(displayType);
    }

    /**************************************************
    Get the value of the checked stories view radio option.
    ***************************************************/
    private getStoriesViewInputValue(): StoriesDisplayType
    {
        return $(`input[name='${ELE.displaySelectOptionClass}']:checked`).val() as StoriesDisplayType;
    }

    private toggleWideScreen()
    {
        $(ELE.storiesBsContainerClass).toggleClass('container-fluid').toggleClass('container');
    }

}


