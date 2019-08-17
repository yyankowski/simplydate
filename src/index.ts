// &&&& Localizations
class Localization {
    static readonly  MONTHS = {
        MMM : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };
}
// &&&& // Localizations

export type SimplyDate = Readonly<{
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    millisecond: number
}>;

// &&&& utilities
const isLeapYear = (year: number): boolean => {
    if (year % 100 === 0) {
        return year % 400 === 0;
    }

    return year % 4 === 0;
};

const getTotalNumberOfDaysInMonth = (year: number, month: number): number => {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    if ((month === 4 || month === 6 || month === 9 || month === 11)) {
        return 30;
    }

    return 31;
};

const determineLastDayOfMonth = (year: number, month: number, day: number): number => {
    if (month === 2 && day > 28) {
        return isLeapYear(year) ? 29 : 28;
    }
    if ((month === 4 || month === 6 || month === 9) && day > 30) {
        return 30;
    }

    return 31;
};

// &&&& // utilities

// &&&&&&& subtraction

const subtractYears = (value: number) => (sDt: SimplyDate): SimplyDate => {

    let day = sDt.day;
    const year = sDt.year - value;
    // if we are in the zone of days that may be bigger that the total days in the given month
    // then take the last day of the given month
    if(day > 28) {
        const lastDay = getTotalNumberOfDaysInMonth(year, sDt.month);
        if(day > lastDay) {
            day = lastDay;
        }
    }

    return {...sDt, year: sDt.year - value, day};
};

/**
 * Subtracts months from the current month value. If the value is negative then an addition operation is run.
 * @param {number} value
 * @returns {(sDt: SimplyDate) => SimplyDate}
 */
const subtractMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return addMonths(-value)(sDt);
    }

    const diff = sDt.month - value;

    let year = sDt.year;
    let month = sDt.month;
    let day = sDt.day;
    // if we are still in the same year
    if (diff > 0) {
        month = diff;
    }
    else {
        while (value--) {
            month--;
            if (month === 0) {
                month = 12;
                year--;
            }
        }

        day = determineLastDayOfMonth(year, month, day);
    }

    return {...sDt, year, month, day};
};

const subtractDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return addDays(-value)(sDt);
    }

    let year = sDt.year;
    let month = sDt.month;
    let day = sDt.day;

    const diff = day - value;

    // if we are still in the same month
    if (diff > 0) {
        day = diff;
    }
    else {
        while (value--) {
            day--;
            if (day === 0) {
                day = 31;
                month--;
                if (month === 0) {
                    month = 12;
                    year--;
                }

                day = determineLastDayOfMonth(year, month, day);
            }
        }
    }

    return {...sDt, year, month, day};
};

const subtractHours = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return addHours(-value)(sDt);
    }

    let hour = sDt.hour;
    const diff = hour - value;

    // if we are still in the same day
    if (diff > -1) {
        hour = diff;
    }
    else {
        const subtractOneDay = subtractDays(1);
        while (value--) {
            hour--;
            if (hour === -1) {
                hour = 23;
                sDt = subtractOneDay(sDt);
            }
        }
    }

    return {...sDt, hour};
};

const subtractMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return addMinutes(-value)(sDt);
    }

    let minute = sDt.minute;

    const diff = minute - value;

    if (diff > -1) {
        minute = diff;
    }
    else {
        const subtractOneHour = subtractHours(1);
        while (value--) {
            minute--;
            if (minute === -1) {
                minute = 59;
                sDt = subtractOneHour(sDt);
            }
        }
    }

    return {...sDt, minute};
};

const subtractSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return addSeconds(-value)(sDt);
    }

    let {second} = sDt;

    const diff = second - value;

    if (diff > -1) {
        second = diff;
    }
    else {
        const subtractOneMinute = subtractMinutes(1);
        while (value--) {
            second--;
            if (second === -1) {
                second = 59;
                sDt = subtractOneMinute(sDt);
            }
        }
    }

    return {...sDt, second};
};

const subtractMilliseconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return addMilliseconds(-value)(sDt);
    }

    let {millisecond} = sDt;

    const diff = millisecond - value;

    if (diff > -1) {
        millisecond = diff;
    }
    else {
        const subtractOneSecond = subtractSeconds(1);
        while (value--) {
            millisecond--;
            if (millisecond === -1) {
                millisecond = 999;
                sDt = subtractOneSecond(sDt);
            }
        }
    }

    return {...sDt, millisecond};
};

// &&&&&&& //subtraction

// &&&&&&& addition
/**
 * Add
 * @param value
 */
const addYears = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return subtractYears(value)(sDt);
    }

    return {...sDt, year: sDt.year + value};
};

const addMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return subtractMonths(-value)(sDt);
    }

    const sumOfMonths = sDt.month + value;
    const mod = (sDt.month + value) % 12;

    if (sumOfMonths <= 12) {
        return Object.assign<SimplyDate, Pick<SimplyDate, 'month'>>(sDt, {month: sumOfMonths});
    }

    const yearsToAdd = (sumOfMonths % 12) === 0 ? (sumOfMonths / 12) - 1 : ~~(sumOfMonths / 12);

    const {year} = addYears(yearsToAdd)(sDt);
    return {...sDt, year, month: mod === 0 ? 12 : mod};
};

const addDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return subtractDays(-value)(sDt);
    }

    let {day} = sDt;
    const lastDayOfMonth = getTotalNumberOfDaysInMonth(sDt.year, sDt.month);

    const sum = value + day;
    if (sum <= lastDayOfMonth) {
        day = sum;
    }
    else {
        const addOneMonth = addMonths(1);
        while (value--) {
            day++;
            if (day > lastDayOfMonth) {
                day = 1;
                sDt = addOneMonth(sDt);
            }
        }
    }

    return {...sDt, day};
};

const addHours = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return subtractHours(-value)(sDt);
    }

    let {hour} = sDt;
    const sum = hour + value;

    if (sum < 24) {
        hour = sum;
    }
    else {
        const addOneDay = addDays(1);
        while (value--) {
            hour++;
            if (hour === 24) {
                hour = 0;
                sDt = addOneDay(sDt);
            }
        }
    }

    return {...sDt, hour};
};

const addMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return subtractMinutes(-value)(sDt);
    }

    let {minute} = sDt;
    const sum = minute + value;
    if (sum < 60) {
        minute = sum;
    }
    else {
        const addOneHour = addHours(1);
        while (value--) {
            minute++;
            if (minute === 60) {
                minute = 0;
                sDt = addOneHour(sDt);
            }
        }
    }

    return {...sDt, minute};
};

const addSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return subtractSeconds(-value)(sDt);
    }

    let {second} = sDt;
    const sum = value + second;

    if (sum < 60) {
        second = sum;
    }
    else {
        const addOneMinute = addMinutes(1);
        while (value--) {
            second++;
            if (second === 60) {
                second = 0;
                sDt = addOneMinute(sDt);
            }
        }
    }

    return {...sDt, second};
};

const addMilliseconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) {
        return subtractMilliseconds(-value)(sDt);
    }

    let {millisecond} = sDt;
    const sum = value + millisecond;

    if (sum < 1000) {
        millisecond = sum;
    }
    else {
        const addOneSecond = addSeconds(1);
        while (value--) {
            millisecond++;
            if (millisecond === 1000) {
                millisecond = 0;
                sDt = addOneSecond(sDt);
            }
        }
    }

    return {...sDt, millisecond};
};

// &&&&&&& // addition

const DATETIME_LOCAL = 'YYYY-MM-DDTHH:mm';
const pad = (num: number): string => num < 10 ? `0${num}` : `${num}`;
const padMs = (num): string => {
    if (num < 10) {
        return `00${num}`;
    }
    if (num < 100) {
        return `0${num}`;
    }
    return `${num}`;
};

const getYearByFormat = {
    YY: (year: number) => year > 2000 ? pad(year - 2000) : year,
    YYYY: (year: number) => year
};

const getLocMonth = (month: number, _format: string) => Localization.MONTHS[_format][month - 1];

const simplyDateToStringByFormatMap = {
    ['YYYY-MM-DDTHH:mm']: ({year, month, day, hour, minute}: SimplyDate) =>
        `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`,
    ['YYYY-MM-DDTHH:mm:ss']: ({year, month, day, hour, minute, second}: SimplyDate) =>
        `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`,
    ['YYYY-MM-DDTHH:mm:ss.SSS']: ({year, month, day, hour, minute, second, millisecond}: SimplyDate) =>
        `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}.${padMs(millisecond)}`,
    ['YYYY-MM-DD']: ({year, month, day}) => `${year}-${pad(month)}-${pad(day)}`,
    ['HH:mm']: ({hour, minute}: SimplyDate) => `${pad(hour)}:${pad(minute)}`,
    ['HH:mm:ss']: ({hour, minute, second}: SimplyDate) => `${pad(hour)}:${pad(minute)}:${pad(second)}`,
    ['YY MMM DD h:mm A']: ({year, month, day, hour, minute}: SimplyDate) => {
        const amPm = hour > 12 ? 'PM' : 'AM';
        return `${getYearByFormat.YY(year)} ${getLocMonth(month, 'MMM')} ${pad(day)} ${hour % 12}:${minute} ${amPm}`;
    }
};

const dateTimeStringFromPattern = {
    'MM-DD-YYYY': (dt: string): SimplyDate => {
        const data = dt.split('-');
        return {
            year: Number.parseInt(data[2], 10),
            month: Number.parseInt(data[0], 10),
            day: Number.parseInt(data[1], 10),
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        };
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
const fromMsSinceEpoch = (dt: number): SimplyDate => fromDate(new Date(dt));

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
    return fromDate(new Date(dt));
};

/**
 * Converts an instance of SimplyDate to Date.
 * @param sDt
 */
const toDate = (sDt: SimplyDate): Date => {
    if (!sDt) {
        return null;
    }

    return new Date(sDt.year, sDt.month - 1, sDt.day, sDt.hour, sDt.minute, sDt.second, sDt.millisecond);
};

/**
 * Returns the number of milliseconds in a SimplyDate object since January 1, 1970, 00:00:00, universal time.
 * Equivalent to getTime of the JavaScript Date object.
 * @param {SimplyDate} sDt
 * @returns {number}
 */
const toMsSinceEpoch = (sDt: SimplyDate): number => {
    const dt = new Date();
    const _sdt = Simply.add(dt.getTimezoneOffset()).minutes.to(sDt);
    return Date.UTC(_sdt.year, _sdt.month - 1, _sdt.day, _sdt.hour, _sdt.minute, _sdt.second, _sdt.millisecond);
};

export namespace Simply {

    export const to = {
        date: toDate,
        msSinceEpoch: toMsSinceEpoch
    };

    export const from = {
        date: fromDate,
        msSinceEpoch: fromMsSinceEpoch,
        string: fromString
    };

    export const now = (): SimplyDate => {
        return from.date(new Date());
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
        as: (_format: string) => {
            const formatFn = simplyDateToStringByFormatMap[_format];
            if (formatFn) {
                return formatFn(sDt);
            }

            return simplyDateToStringByFormatMap[DATETIME_LOCAL](sDt);
        }
    });

    export const getTimeZoneOffsetMs = (): number => {
        return new Date().getTimezoneOffset();
    };
}
