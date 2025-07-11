import { StoryListItem } from "../domain/models/stories/StoryListItem";
import { getDiffDisplayString } from "../utilities/dates";
import { HtmlTemplate } from "./HtmlTemplate";



export class StoryListItemCardTemplateElements
{
    public static readonly StoryCardClass = 'story-item-card';
}

const ELE = StoryListItemCardTemplateElements;


export class StoryListItemCardTemplate extends HtmlTemplate<StoryListItem>
{
    public toHtml(model: StoryListItem): string
    {
        const url = model.url ?? model.siteUrl;
        const dtDisplay = getDiffDisplayString(model.dtDiff);

        // add commas to score and descendants
        const scoreDisplay = model.score.toLocaleString();
        const descendantsDisplay = model.descendants.toLocaleString();

        let html = //html
        `
        <div class="col">
            <div class="${StoryListItem.StoryItemClass} card ${ELE.StoryCardClass} custom-shadow h-100" data-id=${model.id}>
                <div class="card-body">
                    <h5 class="card-title"><a href="${url}" target="_blank" class="card-story-link">${model.title}</a></h5>
                    <p class="text-muted"><small>${dtDisplay}</small></p>
                    <p class="text-muted"><i class='bx bxs-user'></i>&nbsp;${model.by}</p>
                </div>
                <div class="card-footer px-4">
                    <div class="d-flex align-baseline justify-content-between">
                        <span><i class='bx bx-like'></i>&nbsp;${scoreDisplay}</span>
                        <span><i class='bx bx-comment-detail'></i>&nbsp;${descendantsDisplay}</span>
                    </div>
                </div>
            </div>
        </div>
        `;

        return html;
    }
}



