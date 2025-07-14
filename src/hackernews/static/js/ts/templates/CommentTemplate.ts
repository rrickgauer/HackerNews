import { ApiWrapper } from "../api/ApiWrapper";
import { CommentModel } from "../domain/models/comments/CommentModel";
import { getDiffDisplayString } from "../utilities/dates";
import { HtmlTemplate } from "./HtmlTemplate";


export class CommentTemplate extends HtmlTemplate<CommentModel>
{
    public toHtml(model: CommentModel): string
    {
        const userUrl = ApiWrapper.getUserUrl(model.by);
        
        const userUrlDisplay = //html 
        `
        <a class="text-decoration-none text-reset hover-underline" href=${userUrl}>
            ${model.by}
        </a>
        `;

        const dateDisplay = getDiffDisplayString(model.dtDiff);
        const kidsCommentsDisplay = this.getChildrenHtml(model);
        const displayText = this.formatText(model);

        let html = //html
        `<hr>

        <li class="comment-item">
            <div class="d-flex">
                <p class="comment-item-meta">
                    <small class="text-body-secondary">
                        <span>${userUrlDisplay} &#183; ${dateDisplay}</span> &#183; 
                        <a href="#" class="comment-item-btn-toggle-thread text-decoration-none text-reset hover-underline">Hide</a>
                    </small>
                </p>
            </div>

            <div class="comment-item-thread">
                <div class="comment-item-text">${displayText}</div>
                <ul class="list-comments list-unstyled">${kidsCommentsDisplay}</ul>
            </div>
        </li>
        `;

        return html;
    }

    private getChildrenHtml(model: CommentModel): string
    {
        const htmlEngine = new CommentTemplate();
        const kids = model.kids ?? [];
        return htmlEngine.toHtmls(kids as CommentModel[]);
    }

    private formatText(model: CommentModel): string
    {
        if (!model.text)
        {
            return model.text;
        }

        // get the index of the first p tag
        const index = model.text.indexOf('<p>');

        // split up the string where the tag starts
        const startText = model.text.substring(0, index);
        const endText = model.text.substring(index);

        // wrap the initial section in a p tag
        const outText = `<p>${startText}</p>${endText}`;

        return outText;
    }

}
