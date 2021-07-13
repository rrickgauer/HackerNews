

class StoryComp
{
    static cardElementClass = 'card-story';

    constructor(a_apiResponse) {
        this.by          = null;
        this.descendants = null;
        this.id          = null;
        this.kids        = [];
        this.score       = null;
        this.time        = null;
        this.title       = null;
        this.type        = null;
        this.url         = null;

        for (const key of Object.keys(a_apiResponse)) {
            this[key] = a_apiResponse[key];
        }

        this.siteUrl = `https://news.ycombinator.com/item?id=${this.id}`;
        
        this.dt = DateTime.fromSeconds(this.time);
        this.dtDiff = Dates.getDiffNow(this.dt);
    }

    /**
     * Generate the card html
     * @returns Story card html string
     */
    getCardHtml() {
        const url = this.url == null ? this.siteUrl : this.url;
        const dtDisplay = Dates.getDiffDisplayString(this.dtDiff);

        let html = `
        <div class="card ${StoryComp.cardElementClass} custom-shadow" data-id=${this.id}>
            <div class="card-body">
                <h5 class="card-title"><a href="${url}" target="_blank" class="card-story-link">${this.title}</a></h5>
                <p class="text-muted"><small>${dtDisplay}</small></p>
                <p class="text-muted"><i class='bx bxs-user'></i>&nbsp;${this.by}</p>
            </div>
            <div class="card-footer px-4">
                <div class="d-flex align-baseline justify-content-between">
                    <span><i class='bx bx-like'></i>&nbsp;${this.score}</span>
                    <span><i class='bx bx-comment-detail'></i>&nbsp;${this.descendants}</span>
                </div>
            </div>
        </div>`;

        return html;
    }

    
}

