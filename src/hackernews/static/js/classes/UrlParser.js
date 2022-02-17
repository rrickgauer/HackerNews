

export default class UrlParser
{
    constructor(a_strUrl=null) {
        if (a_strUrl == undefined || a_strUrl == null) {
            this.url = window.location;
        }

        this.queryString = window.location.search;
        this.urlParms = new URLSearchParams(this.queryString);
        
        this.url = new URL(window.location);

        this.getQueryParm = this.getQueryParm.bind(this);
    }

    getQueryParm(a_strKey) {
        return this.urlParms.get(a_strKey);
    }

    getUrlPathSectionValue(index) {

        const pathSections = this.url.pathname.split('/');

        return pathSections[index + 1];
    }
}