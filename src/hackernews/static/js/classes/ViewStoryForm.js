



export class ViewStoryFormElements
{
    static modalClass = 'modal-view-story'
    static formClass = 'form-view-story'
    static inputId = 'form-view-story-input'
    static modalClass = 'modal-view-story'
    static btnSubmitClass = 'btn-submit'
}


const ELE = ViewStoryFormElements;


export class ViewStoryForm
{
    constructor()
    {
        /** @type {HTMLFormElement} */
        this._form = document.querySelector(`.${ELE.formClass}`);

        /** @type {HTMLInputElement} */
        this._input = document.querySelector(`#${ELE.inputId}`);

        /** @type {HTMLButtonElement} */
        this._btnSubmit = document.querySelector(`.${ELE.btnSubmitClass}`);
    }

    control()
    {
        this.addListeners();
    }

    addListeners()
    {
        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.onFormSubmit();
        });

        this._input.addEventListener('keyup', (e) => {
            this._btnSubmit.disabled = this._input.value === "";
        });
    }


    onFormSubmit()
    {
        const inputValue = this._input.value;

        if (!inputValue)
        {
            return;
        }

        const url = this.tryParseUrl(inputValue);

        if(url)
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
    tryParseUrl(value) 
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
    handleUrlValue(url)
    {
        const storyId = this.tryParseInt(url.searchParams.get('id'));

        if (storyId)
        {
            this.viewStory(storyId);
        }
    }

    /**
     * View the given story
     * @param {int} storyId the story id
     */
    viewStory(storyId)
    {
        window.location.href = `/stories/${storyId}`;
    }

    /**
     * Try to parse the given string to an int
     * @param {string | null} value the story id
     * @returns int | null
     */
    tryParseInt(value)
    {
        try 
        {
            return parseInt(value);
        }
        catch(_)
        {
            return null;
        }
    }
}









