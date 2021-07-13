



class Dates
{
    /** Time difference units */
    static DIFF_UNITS = ["years", "months", "days", "hours", "minutes"];

    
    /**
     * Returns the time difference between a datetime and now.
     * 
     * @param {Constants.DateTime} a_dtDateTime - the datetime object
     * @returns the differnece in time
     */
    static getDiffNow(a_dtDateTime) {
        const diff = DateTime.now().diff(a_dtDateTime, Dates.DIFF_UNITS);
        return diff.values;
    }

}


