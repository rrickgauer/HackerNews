import { navigateToPage, urlGetQueryParm } from "../../utilities/urls";


export class ViewStoryFormElements
{
    static modalClass = 'modal-view-story'
    static formClass = 'form-view-story'
    static inputId = 'form-view-story-input'
    static btnSubmitClass = 'btn-submit'
}


const ELE = ViewStoryFormElements;

export class ViewStoryForm
{
    private _form: HTMLFormElement;
    private _input: HTMLInputElement;
    private _btnSubmit: HTMLButtonElement;
    constructor ()
    {
        this._form = document.querySelector<HTMLFormElement>(`.${ELE.formClass}`)!;
        this._input = document.querySelector<HTMLInputElement>(`#${ELE.inputId}`)!;
        this._btnSubmit = document.querySelector<HTMLButtonElement>(`.${ELE.btnSubmitClass}`)!;
    }

    public control()
    {
        this.addListeners();
    }

    private addListeners()
    {
        this._form.addEventListener('submit', (e) =>
        {
            e.preventDefault();
            this.onFormSubmit();
        });

        this._input.addEventListener('keyup', (e) =>
        {
            this._btnSubmit.disabled = this._input.value === "";
        });
    }


    private onFormSubmit()
    {
        const inputValue = this._input.value;

        if (!inputValue)
        {
            return;
        }

        const url = this.tryParseUrl(inputValue);

        if (url)
        {
            this.handleUrlValue(url);
            return;
        }

        const storyId = this.tryParseInt(inputValue);

        if (storyId)
        {
            this.viewStory(storyId);
        }
    }

    /**
     * Try to parse the given value
     * @param {string} value the value to parse
     * @returns URL | null
     */
    private tryParseUrl(value: string) 
    {
        try 
        {
            return new URL(value);
        }
        catch (_) 
        {
            return null;
        }
    }

    /**
     * Navigate to the story from the given hackernews url  
     * @param {URL} url the hackernews url
     */
    private handleUrlValue(url: URL)
    {
        const storyId = this.tryParseInt(urlGetQueryParm('id', url));

        if (storyId)
        {
            this.viewStory(storyId);
        }
    }

    /**
     * View the given story
     * @param {number} storyId the story id
     */
    private viewStory(storyId: number)
    {
        navigateToPage(`/stories/${storyId}`, true);
        // window.location.href = `/stories/${storyId}`;
    }

    /**
     * Try to parse the given string to an int
     * @param {string | null} value the story id
     * @returns int | null
     */
    private tryParseInt(value: string | null)
    {
        if (!value)
        {
            return null;
        }

        try 
        {
            return parseInt(value);
        }
        catch (_)
        {
            return null;
        }
    }
}









