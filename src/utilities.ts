
export const isLeapYear = (year: number): boolean => {
    if (year % 100 === 0) {
        return year % 400 === 0;
    }

    return year % 4 === 0;
};

export const getTotalNumberOfDaysInMonth = (year: number, month: number): number => {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    }
    if ((month === 4 || month === 6 || month === 9 || month === 11)) {
        return 30;
    }

    return 31;
};

export const determineLastDayOfMonth = (year: number, month: number, day: number): number => {
    if (month === 2 && day > 28) {
        return isLeapYear(year) ? 29 : 28;
    }
    if ((month === 4 || month === 6 || month === 9) && day > 30) {
        return 30;
    }

    return 31;
};
