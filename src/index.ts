import { SimplyDate } from "./models";
import { addYears, addMonths, addDays, addHours, addMinutes, addSeconds, addMilliseconds } from "./addition";
import { subtractYears, subtractMonths, subtractDays, subtractHours, subtractMinutes, subtractSeconds, subtractMilliseconds } from "./subtraction";
import {Formats} from "./formats";

export namespace Simply {

    import simplyDateToStringByFormatMap = Formats.simplyDateToStringByFormatMap;
    import DATETIME_LOCAL = Formats.DATETIME_LOCAL;

    const dateTimeStringFromPattern = {
        "MM-DD-YYYY": (dt: string): SimplyDate => {
            const data = dt.split("-");
            return {
                year: Number.parseInt(data[2]),
                month: Number.parseInt(data[0]),
                day: Number.parseInt(data[1]),
                hour: 0,
                minute: 0,
                second: 0,
                millisecond: 0
            }
        }
    };

    const fromDate = (dt: Date): SimplyDate => ({
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
        hour: dt.getHours(),
        minute: dt.getMinutes(),
        second: dt.getSeconds(),
        millisecond: dt.getMilliseconds()
    });

    /**
     * From Unix epoch
     * @param dt 1514851200000
     */
    const fromNumber = (dt: number): SimplyDate => from.date(new Date(dt));

    /**
     *
     * @param {string} dt a string of type 2015-02-29T03:24:00
     * @param {string} pattern
     * @returns {SimplyDate}
     */
    const fromString = (dt: string, pattern?: string): SimplyDate => {
        if (pattern) {
            return dateTimeStringFromPattern[pattern](dt);
        }
        return from.date(new Date(dt));
    };

    export const from = {
        date: fromDate,
        number: fromNumber,
        string: fromString
    };

    export const now = (): SimplyDate => {
        const now = new Date();

        return from.date(now);
    };

    /**
     * Converts an instance of SimplyDate to Date.
     * @param sDt
     */
    export const toDate = (sDt: SimplyDate): Date => {
        if (!sDt) return null;

        return new Date(sDt.year, sDt.month, sDt.day, sDt.hour, sDt.minute, sDt.second, sDt.millisecond);
    };

    export const add = (value: number) => ({
        years: {
            to: addYears(value)
        },
        months: {
            to: addMonths(value)
        },
        days: {
            to: addDays(value)
        },
        hours: {
            to: addHours(value)
        },
        minutes: {
            to: addMinutes(value)
        },
        seconds: {
            to: addSeconds(value)
        },
        milliseconds: {
            to: addMilliseconds(value)
        }
    });

    export const subtract = (value: number) => ({
        years: {
            from: subtractYears(value)
        },
        months: {
            from: subtractMonths(value)
        },
        days: {
            from: subtractDays(value)
        },
        hours: {
            from: subtractHours(value)
        },
        minutes: {
            from: subtractMinutes(value)
        },
        seconds: {
            from: subtractSeconds(value)
        },
        milliseconds: {
            from: subtractMilliseconds(value)
        }
    });

    export const format = (sDt: SimplyDate) => ({
      as: (format: string) => {
          const formatFn = simplyDateToStringByFormatMap[format];
          if(formatFn) {
              return formatFn(sDt);
          }

          return simplyDateToStringByFormatMap[DATETIME_LOCAL](sDt);
      }
    });
}