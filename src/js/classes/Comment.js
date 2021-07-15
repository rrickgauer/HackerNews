


class Comment
{   
    constructor(a_oApiResponse) {
        this.by = null;
        this.id = null;
        this.kids = null;
        this.parent = null;
        this.text = null;
        this.time = null;
        this.type = null;
        this.dt = null;

        for (const key of Object.keys(this)) {
            if (a_oApiResponse[key] != undefined) {
                this[key] = a_oApiResponse[key];
            }
        }

        this.dt = DateTime.fromSeconds(this.time);
        this.dtDiff = Dates.getDiffNow(this.dt);

    }


    getHtml() {
        const self = this;

        const userUrl = ApiWrapper.getUserUrl(self.by);
        const userUrlDisplay = `<a class="text-reset" href=${userUrl}>${self.by}</a>`;

        const dateDisplay = Dates.getDiffDisplayString(this.dtDiff);
        const kidsCommentsDisplay = this.getChildrenHtml();

        let html = `<hr>
        <li class="comment-item">
            <div class="d-flex">
                <p class="comment-item-meta"><small class="text-muted">${userUrlDisplay} &#183; ${dateDisplay}</small></p>
                <button type="button" class="btn btn-sm btn-secondary comment-item-btn-toggle-thread ml-3">Toggle</button>
            </div>

            <div class="comment-item-thread">
                <div class="comment-item-text">${self.text}</div>
                <ul class="list-comments list-unstyled">${kidsCommentsDisplay}</ul>
            </div>
        </li>`;

        return html;
    }

    getChildrenHtml() {
        let kidsCommentsHtml = '';

        if (this.kids == null) {
            return kidsCommentsHtml;
        }

        for (const kid of this.kids) {
            const kidComment = new Comment(kid);
            kidsCommentsHtml += kidComment.getHtml();
        }

        return kidsCommentsHtml;
    }
}


