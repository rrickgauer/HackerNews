import { DateTime, Duration } from "../lib/luxon";

const DIFF_UNITS = ["years", "months", "days", "hours", "minutes", "seconds"];

/**
 * Returns the time difference between a datetime and now.
 */
export function getDifferenceNow(date: DateTime): Duration
{
    return DateTime.now().diff(date, DIFF_UNITS);
}

export function getDateTimeFromUnix(seconds: number): DateTime
{
    return DateTime.fromSeconds(seconds);
}


/**
 * Generate the date difference display string.
 */
export function getDifferenceDisplayString(duration: Duration): string;
export function getDifferenceDisplayString(date: DateTime): string;
export function getDifferenceDisplayString(value: Duration | DateTime): string
{
    if (value instanceof DateTime)
    {
        value = getDifferenceNow(value);
    }

    let numUnits: number | null = null;
    let unitType: string | null = null;

    if (value.days > 0)
    {
        numUnits = value.days;
        unitType = 'day';
    } 
    else if (value.hours > 0)
    {
        numUnits = value.hours;
        unitType = 'hour';
    } 
    else if (value.minutes > 1)
    {
        numUnits = value.minutes;
        unitType = 'minute';
    }

    if (Array.from([numUnits, unitType]).includes(null))
    {
        return 'just now';
    }

    // append an s if there is more than 1 of the units
    if (numUnits! > 1)
    {
        unitType += 's';
    }

    // throw them all together
    let result = `${numUnits} ${unitType} ago`;

    return result;
}