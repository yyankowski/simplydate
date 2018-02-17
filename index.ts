export namespace Simply {

    export type SimplyDate = {
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number
        millisecond: number
    }

    export const from = (dt: Date): SimplyDate => ({
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
        hour: dt.getHours(),
        minute: dt.getMinutes(),
        second: dt.getSeconds(),
        millisecond: dt.getMilliseconds()
    });

    export const isLeapYear = (year: number): boolean => {
        if (year % 100 === 0) {
            return year % 400 === 0;
        }

        return year % 4 === 0;
    };

    /**
     * @param dt a string of type 2015-02-29T03:24:00
     */
    export const fromString = (dt: string): SimplyDate => from(new Date(dt));

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

    /**
     * Gets the number of days in a month. Taking into account leap years.
     * @param year 
     * @param month 
     */
    const _getNumberOfDaysInMonth = (year: number, month: number) =>
        new Date(2000 + (year % 2000), month - 1, 0).getDate();

    /**
     * Add 
     * @param value 
     */
    // export const add =  _transform("to", _toInc);
    // export const subtract = _transform("from", _toDec);
    const _addYears = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { year: sDt.year + value });

    // when a month has 30 days, but we have 31 according to the result
    const overflowDays = (month: number, day: number) => {
        if (month === 1) return 0;
        if (month === 2) return;
    }

    const _addMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
        const sumOfMonths = sDt.month + value;
        const mod = (sDt.month + value) % 12;

        if (sumOfMonths <= 12)
            return Object.assign({ ...sDt }, { month: sumOfMonths });

        const yearsToAdd = (sumOfMonths % 12) === 0 ? (sumOfMonths / 12) - 1 : ~~(sumOfMonths / 12);

        return Object.assign({ ...sDt }, {
            year: _addYears(yearsToAdd)(sDt).year,
            month: mod === 0 ? 12 : mod
        });
    }

    const _addDays = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { day: ((sDt.day + value) % _getNumberOfDaysInMonth(sDt.year, sDt.month)) });

    const _addHours = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addMilliseconds = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    export const add = (value: number) => ({
        years: {
            to: _addYears(value)
        },
        months: {
            to: _addMonths(value)
        },
        days: () => ({
            to: _addMonths(value)
        }),
        hours: () => ({
            to: _addHours(value)
        }),
        minutes: () => ({
            to: _addMinutes(value)
        }),
        seconds: () => ({
            to: _addSeconds(value)
        }),
        milliseconds: () => ({
            to: _addMilliseconds(value)
        })
    });

    const _subtractYears = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { year: sDt.year - value });


    const deterimineLastDayOfMonth = (year: number, month: number, day: number): number => {
        if (month === 2 && day > 28) {
            return isLeapYear(year) ? 29 : 28;
        }
        if ((month === 4 || month === 6 || month === 9) && day > 30) {
            return 30;
        }

        return 31;
    }

    const _subtractMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
        let year = sDt.year;
        let month = sDt.month;
        let day = sDt.day;
        while (value--) {
            month--;
            if (month === 0) {
                month = 12;
                year--;
            }
        }

        day = deterimineLastDayOfMonth(year, month, day);

        return Object.assign({ ...sDt }, { year, month, day });
    }

    const _subtractDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
        let year = sDt.year;
        let month = sDt.month;
        let day = sDt.day;

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

        return Object.assign({ ...sDt }, { year, month, day });
    };

    const _subtractHours = (value: number) => (sDt: SimplyDate): SimplyDate => {
        
        let hour = sDt.hour;
        const subtractOneDay = _subtractDays(1);
        while(value--){
            hour--;
            if(hour === -1){
                hour = 23;
                sDt = subtractOneDay(sDt);
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
        while(value--) {
            minute--;
            if(minute === -1){
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
            from: _addSeconds(value)
        },
        milliseconds:{
            from: _addMilliseconds(value)
        }
    });
}