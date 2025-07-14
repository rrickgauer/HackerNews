import { StoryListItem } from "../domain/models/stories/StoryListItem";
import { getDiffDisplayString } from "../utilities/dates";
import { HtmlTemplate } from "./HtmlTemplate";

export class StoryListItemCardTemplateElements
{
    public static readonly StoryListItemClass = 'story-item-list-item';
}

const ELE = StoryListItemCardTemplateElements;

export class StoryListItemTemplate extends HtmlTemplate<StoryListItem>
{
    public toHtml(model: StoryListItem): string
    {
        const url = model.url ?? model.siteUrl;
        const dtDisplay = getDiffDisplayString(model.dtDiff);

        let html = //html
        `
        <li class="${StoryListItem.StoryItemClass} ${ELE.StoryListItemClass} list-group-item" data-id=${model.id}>
            <h5 class="card-title"><a href="${url}" target="_blank" class="card-story-link">${model.title}</a></h5>
            <p class="text-muted"><small>${dtDisplay}</small></p>
            <p class="text-muted"><i class='bx bxs-user'></i>&nbsp;${model.by}</p>
            <div class="d-flex align-baseline">
                <span class="mr-3"><i class='bx bx-like'></i>&nbsp;${model.score}</span>
                <span><i class='bx bx-comment-detail'></i>&nbsp;${model.descendants}</span>
            </div>
        </li>
        `;

        return html;
    }
}
