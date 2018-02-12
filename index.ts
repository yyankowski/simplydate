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

    export const toSimplyDate = (dt: Date) => ({
        year: dt.getFullYear(),
        month: dt.getMonth() + 1,
        day: dt.getDate(),
        hour: dt.getHours(),
        minute: dt.getMinutes(),
        second: dt.getSeconds(),
        millisecond: dt.getMilliseconds()
    })

    export const now = (): SimplyDate => {
        const now = new Date();

        return toSimplyDate(now);
    };

    export const toDate = (sDt: SimplyDate): Date => {
        if (!sDt) return null;

        return new Date(sDt.year, sDt.month, sDt.day, sDt.hour, sDt.minute, sDt.second, sDt.millisecond);
    }

    const _getNumberOfDaysInMonth = (year: number, month: number) => 
        new Date(2000 + (year % 2000), month - 1, 0).getDate();

    /**
     * Add 
     * @param value 
     */
    // export const add =  _transform("to", _toInc);
    // export const subtract = _transform("from", _toDec);
    const _addYears = (value: number) => (sDt: SimplyDate) => Object.assign({
        ...sDt
    }, { year: sDt.year + value });


    // when month value overflows 12, the year should be incremented
    const _increaseYearIfNeeded = ({ year, month }: SimplyDate, value: number): number => {
        return year + (~~((month + value) / 12));
    }

    const _addMonths = (value: number) => (sDt: SimplyDate) => {
        const sumOfMonths = sDt.month + value;
        const mod = (sDt.month + value) % 12;
        // const totalDaysInMonth = _getNumberOfDaysInMonth()

        if(sumOfMonths <= 12) 
            return Object.assign({...sDt}, { month: sumOfMonths});

        const yearsToAdd = (sumOfMonths % 12) === 0 ? (sumOfMonths / 12) - 1 :  ~~(sumOfMonths / 12);

        return Object.assign({...sDt}, {
                year: _addYears(yearsToAdd)(sDt).year,
                month: mod === 0 ? 12 : mod
            });
    }

    const _addDays = (value: number) => (sDt: SimplyDate) => Object.assign({
        ...sDt
    }, { day: ((sDt.day + value) % _getNumberOfDaysInMonth(sDt.year, sDt.month)) });

    const _addHours = (value: number) => (sDt: SimplyDate) => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addMinutes = (value: number) => (sDt: SimplyDate) => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addSeconds = (value: number) => (sDt: SimplyDate) => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addMilliseconds = (value: number) => (sDt: SimplyDate) => Object.assign({
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
    })

}