import {SimplyDate} from "./models";
import {Localization} from "./l10n/month/month-en";

export namespace Formats {
    export const DATETIME_LOCAL = "YYYY-MM-DDTHH:mm";
    export const DATETIME_LOCAL_SECONDS = "YYYY-MM-DDTHH:mm:ss";
    export const DATETIME_LOCAL_MS ="YYYY-MM-DDTHH:mm:ss.SSS";
    export const DATE = "YYYY-MM-DD";
    export const TIME = "HH:mm";

    const pad = (num: number):string => num < 10 ? `0${num}`: `${num}`;
    const padMs = (num): string  => {
        if(num < 10) return `00${num}`;
        if(num < 100) return `0${num}`;
        return `${num}`;
    };

    const getYearByFormat = {
      "YY": (year: number) => year > 2000 ? pad(year - 2000) : year,
      "YYYY": (year: number) => year
    };

    const getLocMonth = (month: number, format: string) => Localization.MONTHS[format][month - 1];

    export const simplyDateToStringByFormatMap = {
        [DATETIME_LOCAL]: ({year, month, day, hour, minute}: SimplyDate) =>
            `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`,
        [DATETIME_LOCAL_SECONDS] : ({year, month, day, hour, minute, second}: SimplyDate) =>
            `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`,
        [DATETIME_LOCAL_MS]:  ({year, month, day, hour, minute, second, millisecond}: SimplyDate) =>
            `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}.${padMs(millisecond)}`,
        [DATE]: ({year, month, day}) => `${year}-${pad(month)}-${pad(day)}`,
        [TIME]: ({hour, minute}: SimplyDate) => `${pad(hour)}:${pad(minute)}`,
        ["YY MMM DD h:mm A"]: ({year, month, day, hour, minute} : SimplyDate) => `${getYearByFormat["YY"](year)} ${getLocMonth(month, "MMM")} ${pad(day)} ${hour}:${minute} AM`
    };
}