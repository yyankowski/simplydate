namespace Simply {

    export type SimplyDate = {
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number
        millisecond: number
    }

    export const now = (): SimplyDate => {
        const now = new Date();

        return {
            year: now.getFullYear(),
            month: now.getMonth(),
            day: now.getDay(),
            hour: now.getHours(),
            minute: now.getMinutes(),
            second: now.getSeconds(),
            millisecond: now.getMilliseconds()
        }
    };

    export const toDate = (sDt: SimplyDate): Date => {
        if(!sDt) return null;

        return new Date(sDt.year, sDt.month, sDt.day, sDt.hour, sDt.minute, sDt.second, sDt.millisecond);
    }

    const incBy = (n1: number, n2: number) => n1 + n2; 

    const decBy = (n1: number, n2: number) => n1 - n2;

    /**
     * Adds a value to the SimplyDate
     * @param obj {month: 4}
     */
    const _to = (action: Function) => 
        ({year, month, day, hour, minute, second, millisecond}: SimplyDate) => 
        (sDt: SimplyDate): SimplyDate => 
        Object.assign({...sDt}, {
            year: year ? action(year, sDt.year) : sDt.year,
            month: month ? action(month, sDt.month) : sDt.month,
            day: day ? action(day, sDt.day) : sDt.day,
            hour: hour ? action(hour, sDt.hour) : sDt.hour,
            minute : minute ? action(minute, sDt.minute) : sDt.minute,
            second : second ? action(second, sDt.second) : sDt.second,
            millisecond : millisecond ? action(millisecond, sDt.millisecond) : sDt.millisecond
        });

    const _toInc = _to(incBy);
    const _toDec = _to(decBy);
    const _transform = (preposition: string, action: (p: SimplyDate) => (p1: SimplyDate) => SimplyDate) => (value: number) => ({
        years: () => ({
            [preposition]: action({year: value} as SimplyDate)
        }),
        months: () => ({
            [preposition]: action({month: value} as SimplyDate)
        }),
        days: () => ({
            [preposition]: action({day: value} as SimplyDate)
        }),
        hours: () => ({
            [preposition]: action({hour: value} as SimplyDate)
        }),
        minutes: () => ({
            [preposition]: action({minute: value} as SimplyDate)
        }),
        seconds: () => ({
            [preposition]: action({second: value} as SimplyDate)
        }),
        milliseconds: () => ({
            [preposition]: action({millisecond: value} as SimplyDate)
        })
    })

    /**
     * Add 
     * @param value 
     */
    export const add =  _transform("to", _toInc);
    export const subtract = _transform("from", _toDec);

}