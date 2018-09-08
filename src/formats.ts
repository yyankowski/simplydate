import {SimplyDate} from './models';
import {Localization} from './l10n/month/month-en';

export namespace Formats {
    export const DATETIME_LOCAL = 'YYYY-MM-DDTHH:mm';

    const pad = (num: number): string => num < 10 ? `0${num}`: `${num}`;
    const padMs = (num): string  => {
        if(num < 10) { return `00${num}`; }
        if(num < 100) { return `0${num}`; }
        return `${num}`;
    };

    const getYearByFormat = {
      YY: (year: number) => year > 2000 ? pad(year - 2000) : year,
      YYYY: (year: number) => year
    };

    const getLocMonth = (month: number, format: string) => Localization.MONTHS[format][month - 1];

    export const simplyDateToStringByFormatMap = {
        ['YYYY-MM-DDTHH:mm']: ({year, month, day, hour, minute}: SimplyDate) =>
            `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`,
        ['YYYY-MM-DDTHH:mm:ss'] : ({year, month, day, hour, minute, second}: SimplyDate) =>
            `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`,
        ['YYYY-MM-DDTHH:mm:ss.SSS']:  ({year, month, day, hour, minute, second, millisecond}: SimplyDate) =>
            `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}.${padMs(millisecond)}`,
        ['YYYY-MM-DD']: ({year, month, day}) => `${year}-${pad(month)}-${pad(day)}`,
        ['HH:mm']: ({hour, minute}: SimplyDate) => `${pad(hour)}:${pad(minute)}`,
        ['HH:mm:ss']: ({hour, minute, second}: SimplyDate) => `${pad(hour)}:${pad(minute)}:${pad(second)}`,
        ['YY MMM DD h:mm A']: ({year, month, day, hour, minute}: SimplyDate) => {
            const amPm = hour > 12 ? 'PM' : 'AM';
            return `${getYearByFormat.YY(year)} ${getLocMonth(month, 'MMM')} ${pad(day)} ${hour % 12}:${minute} ${amPm}`;
        }
    };
}
