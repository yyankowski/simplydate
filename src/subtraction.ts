import { SimplyDate } from './models';
import { determineLastDayOfMonth } from './utilities';
import {addDays, addHours, addMilliseconds, addMinutes, addMonths, addSeconds} from './addition';

export const subtractYears = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
    ...sDt
}, { year: sDt.year - value });

/**
 * Subtracts months from the current month value. If the value is negative then an addition operation is run.
 * @param {number} value
 * @returns {(sDt: SimplyDate) => SimplyDate}
 */
export const subtractMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) { return addMonths(-value)(sDt); }

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

    return {...sDt, year, month, day };
};

export const subtractDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if(value < 0) { return addDays(-value)(sDt); }

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

    return { ...sDt,  year, month, day };
};

export const subtractHours = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if(value < 0) { return addHours(-value)(sDt); }

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

    return { ...sDt, hour };
};

export const subtractMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if(value < 0) { return addMinutes(-value)(sDt); }

    let minute = sDt.minute;

    const diff = minute - value;

    if(diff > -1){
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

    return { ...sDt, minute };
};

export const subtractSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if(value < 0) { return addSeconds(-value)(sDt); }

    let { second } = sDt;

    const diff = second - value;

    if(diff > - 1){
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

    return { ...sDt, second };
};

export const subtractMilliseconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if(value < 0) { return addMilliseconds(-value)(sDt); }

    let { millisecond } = sDt;

    const diff = millisecond - value;

    if(diff > -1){
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

    return { ...sDt, millisecond };
};
