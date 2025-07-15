import { ApiWrapper } from "../api/ApiWrapper";
import { CommentItem } from "../domain/models/comments/CommentItem";
import { getDifferenceDisplayString } from "../utilities/dates";
import { HtmlTemplate } from "./HtmlTemplate";


export class CommentItemTemplateElements
{
    public static readonly containerClass = 'comment-item';
    public static readonly btnToggleClass = 'comment-item-btn-toggle-thread';
    public static readonly metaClass = 'comment-item-meta';
    public static readonly threadClass = 'comment-item-thread';
    public static readonly textClass = 'comment-item-text';
    public static readonly visibilityClass = 'comment-item-hidden';
}

const ELE = CommentItemTemplateElements;

export class CommentItemTemplate extends HtmlTemplate<CommentItem>
{
    public toHtml(model: CommentItem): string
    {
        const userUrl = ApiWrapper.getUserUrl(model.by);
        
        const userUrlDisplay = //html 
        `
        <a class="text-decoration-none text-reset hover-underline" href=${userUrl}>
            ${model.by}
        </a>
        `;

        const dateDisplay = getDifferenceDisplayString(model.time);
        const kidsCommentsDisplay = this.getChildrenHtml(model);
        const displayText = this.formatText(model);

        let html = //html
        `<hr>

        <li class="${ELE.containerClass}">
            <div class="d-flex">
                <p class="${ELE.metaClass}">
                    <small class="text-body-secondary">
                        <span>${userUrlDisplay} &#183; ${dateDisplay}</span> &#183; 
                        <a href="#" class="${ELE.btnToggleClass} text-decoration-none text-reset hover-underline">Hide</a>
                    </small>
                </p>
            </div>

            <div class="${ELE.threadClass}">
                <div class="${ELE.textClass}">${displayText}</div>
                <ul class="list-comments list-unstyled">${kidsCommentsDisplay}</ul>
            </div>
        </li>
        `;

        return html;
    }

    private getChildrenHtml(model: CommentItem): string
    {
        const htmlEngine = new CommentItemTemplate();
        const kids = model.kids ?? [];
        return htmlEngine.toHtmls(kids as CommentItem[]);
    }

    private formatText(model: CommentItem): string
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
