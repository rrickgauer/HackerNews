


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

    }


    getHtml() {
        const self = this;

        const userUrl = `<a class="text-reset" href=${ApiWrapper.getUserUrl(self.by)}>${self.by}</a>`;
        const dateDisplay = this.dt.toFormat('f');

        let html = `
        <hr>
        <li class="comment-item">
            <p class="comment-item-meta">
                <small class="text-muted">${userUrl} &#183; ${dateDisplay}</small>
            </p>
            
            <div class="comment-item-text">
                ${self.text}
            </div>
        </li>`;

        if (self.kids == null) {
            return html;
        }

        html += `<ul class="list-comments list-unstyled">`;

        for (const kid of self.kids) {
            const kidComment = new Comment(kid);
            html += kidComment.getHtml();
        }

        html += `</ul>`;

        return html;
    }
}


