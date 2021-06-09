



class StoryCard
{
    constructor(a_apiResponse) {
        this.by = a_apiResponse.by;
        this.descendants = a_apiResponse.descendants;
        this.id = a_apiResponse.id;
        this.kids = a_apiResponse.kids;
        this.score = a_apiResponse.score;
        this.time = a_apiResponse.time;
        this.title = a_apiResponse.title;
        this.type = a_apiResponse.type;
        this.url = a_apiResponse.url;
    }


    getHtml() {
  
        let html = `
        <div class="card card-story">
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p>${this.by}</p>
            </div>
        </div>`;




        return html;
    }
}

