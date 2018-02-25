import { SimplyDate } from "./models";
import { deterimineLastDayOfMonth } from "./utilities";
import { addMonths } from "./addition";

export const subtractYears = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
    ...sDt
}, { year: sDt.year - value });

export const subtractMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
    if (value < 0) return addMonths(-value)(sDt);

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

export const subtractDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
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

export const subtractHours = (value: number) => (sDt: SimplyDate): SimplyDate => {

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

    let year = sDt.year;
    let month = sDt.month;
    let day = sDt.day;

    return Object.assign({ ...sDt }, { year, month, day, hour });
}

export const subtractMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => {
    let minute = sDt.minute;
    const subtractOneHour = subtractHours(1);
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

export const subtractSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    let { second } = sDt;
    const subtractOneMinute = subtractMinutes(1);
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

export const subtractMilliseconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
    let { millisecond } = sDt;
    const subtractOneSecond = subtractSeconds(1);
    while (value--) {
        millisecond--;
        if (millisecond === -1) {
            millisecond = 999;
            sDt = subtractOneSecond(sDt);
        }
    }

    let { minute, hour, day, month, year, second } = sDt;
    return Object.assign({ ...sDt }, { year, month, day, hour, minute, second, millisecond });
};