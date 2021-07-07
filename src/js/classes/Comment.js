


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

        for (const key of Object.keys(this)) {
            if (a_oApiResponse[key] != undefined) {
                this[key] = a_oApiResponse[key];
            }
        }
    }


    getHtml() {
        const self = this;
        let html = `<li>${self.text}</li>`;

        if (self.kids == null) {
            return html;
        }

        html += `<ul>`;

        for (const kid of self.kids) {
            const kidComment = new Comment(kid);
            html += kidComment.getHtml();
        }

        html += `</ul>`;

        return html;
    }
}


