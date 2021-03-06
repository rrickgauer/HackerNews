import ApiWrapper from "./ApiWrapper";
import { DateTime } from "./Constants";
import Dates from "./Dates";


export default class Comment
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

        this.getHtml = this.getHtml.bind(this);
        this.getChildrenHtml = this.getChildrenHtml.bind(this);
        this.formatText = this.formatText.bind(this);
    }


    getHtml() {
        const self = this;

        const userUrl             = ApiWrapper.getUserUrl(self.by);
        const userUrlDisplay      = `<a class="text-reset" href=${userUrl}>${self.by}</a>`;
        const dateDisplay         = Dates.getDiffDisplayString(this.dtDiff);
        const kidsCommentsDisplay = this.getChildrenHtml();
        const displayText         = self.formatText();

        let html = `<hr>
        <li class="comment-item">
            <div class="d-flex">
                <p class="comment-item-meta">
                    <small class="text-muted">
                        <span>${userUrlDisplay} &#183; ${dateDisplay}</span> &#183; 
                        <a href="#" class="text-reset comment-item-btn-toggle-thread">Hide</a>
                    </small>
                </p>
            </div>

            <div class="comment-item-thread">
                <div class="comment-item-text">${displayText}</div>
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

    /**
     * Wraps the first section of the comment text in a <p> tag.
     */
    formatText() {
        if (this.text == null) {
            return this.text;
        }

        // get the index of the first p tag
        const index = this.text.indexOf('<p>');

        // split up the string where the tag starts
        const startText = this.text.substring(0, index);
        const endText = this.text.substring(index);

        // wrap the initial section in a p tag
        const outText = `<p>${startText}</p>${endText}`;
        
        return outText;
    }
}


