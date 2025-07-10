import { DateTime, Duration } from "../lib/luxon";

const DIFF_UNITS = ["years", "months", "days", "hours", "minutes", "seconds"];

/**
 * Returns the time difference between a datetime and now.
 */
export function getDifferenceNow(date: DateTime): Duration
{
    return DateTime.now().diff(date, DIFF_UNITS);
}

/**
 * Generate the date difference display string.
 */
export function getDiffDisplayString(duration: Duration): string
{
    let numUnits: number | null = null;
    let unitType: string | null = null;

    if (duration.days > 0)
    {
        numUnits = duration.days;
        unitType = 'day';
    } 
    else if (duration.hours > 0)
    {
        numUnits = duration.hours;
        unitType = 'hour';
    } 
    else if (duration.minutes > 1)
    {
        numUnits = duration.minutes;
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