import { getTotalNumberOfDaysInMonth, deterimineLastDayOfMonth } from "./utilities";
import { SimplyDate } from "./models";
import { addYears, addMonths, addDays } from "./addition";

export namespace Simply {

    export const from = (dt: Date): SimplyDate => ({
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
        hour: dt.getHours(),
        minute: dt.getMinutes(),
        second: dt.getSeconds(),
        millisecond: dt.getMilliseconds()
    });

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
    }
    /**
     * @param dt a string of type 2015-02-29T03:24:00
     */
    export const fromString = (dt: string, pattern?: string): SimplyDate => {
        if (pattern) {
            return dateTimeStringFromPattern[pattern](dt);
        }
        return from(new Date(dt));
    }

    /**
     * From Unix epoch
     * @param dt 1514851200000
     */
    export const fromNumber = (dt: number): SimplyDate => from(new Date(dt));

    export const now = (): SimplyDate => {
        const now = new Date();

        return from(now);
    };

    /**
     * Converts an instance of SimplyDate to Date.
     * @param sDt
     */
    export const toDate = (sDt: SimplyDate): Date => {
        if (!sDt) return null;

        return new Date(sDt.year, sDt.month, sDt.day, sDt.hour, sDt.minute, sDt.second, sDt.millisecond);
    }

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

    const _subtractYears = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { year: sDt.year - value });

    

    

    const _subtractMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if (value < 0) return _addMonths(-value)(sDt);

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

            day = deterimineLastDayOfMonth(year, month, day);
        }

        return Object.assign({ ...sDt }, { year, month, day });
    }

    const _subtractDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
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
                        year--
                    }

                    day = deterimineLastDayOfMonth(year, month, day);
                }
            }
        }

        return Object.assign({ ...sDt }, { year, month, day });
    };

    const _subtractHours = (value: number) => (sDt: SimplyDate): SimplyDate => {

        let hour = sDt.hour;
        const diff = hour - value;

        // if we are still in the same day
        if (diff > -1) {
            hour = diff;
        }
        else {
            const subtractOneDay = _subtractDays(1);
            while (value--) {
                hour--;
                if (hour === -1) {
                    hour = 23;
                    sDt = subtractOneDay(sDt);
                }
            }
        }

        let year = sDt.year;
        let month = sDt.month;
        let day = sDt.day;

        return Object.assign({ ...sDt }, { year, month, day, hour });
    }

    const _subtractMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => {
        let minute = sDt.minute;
        const subtractOneHour = _subtractHours(1);
        while (value--) {
            minute--;
            if (minute === -1) {
                minute = 59;
                sDt = subtractOneHour(sDt)
            }
        }

        let year = sDt.year;
        let month = sDt.month;
        let day = sDt.day;
        let hour = sDt.hour;

        return Object.assign({ ...sDt }, { year, month, day, hour, minute });
    };

    const _subtractSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
        let { second } = sDt;
        const subtractOneMinute = _subtractMinutes(1);
        while (value--) {
            second--;
            if (second === -1) {
                second = 59;
                sDt = subtractOneMinute(sDt);
            }
        }

        let { minute, hour, day, month, year } = sDt;
        return Object.assign({ ...sDt }, { year, month, day, hour, minute, second });
    };

    export const subtract = (value: number) => ({
        years: {
            from: _subtractYears(value)
        },
        months: {
            from: _subtractMonths(value)
        },
        days: {
            from: _subtractDays(value)
        },
        hours: {
            from: _subtractHours(value)
        },
        minutes: {
            from: _subtractMinutes(value)
        },
        seconds: {
            from: _subtractSeconds(value)
        },
        milliseconds: {
            from: _addMilliseconds(value)
        }
    });
}