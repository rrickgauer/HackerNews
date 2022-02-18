
/**
 * This class parses the current url.
 */
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

    /**
     * Get the value of the given url query parm key
     * @param {string} a_strKey - url query parm key
     * @returns the value of the key 
     */
    getQueryParm(a_strKey) {
        return this.urlParms.get(a_strKey);
    }

    /**
     * Get the value url path
     * 
     * @param {number} index - path index
     * @returns string
     */
    getUrlPathSectionValue(index) {
        const pathSections = this.url.pathname.split('/');
        return pathSections[index + 1];
    }
}