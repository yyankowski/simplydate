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
        if(!sDt) return null;

        return new Date(sDt.year, sDt.month, sDt.day, sDt.hour, sDt.minute, sDt.second, sDt.millisecond);
    }

    const incBy = (n1: number, n2: number) => n1 + n2; 

    const decBy = (n1: number, n2: number) => n2 - n1;

    /**
     * Used to set parts of a date.
     * e.g { month: 4 }
     */
    type ActionParam =  SimplyDate;
    /**
     * 
     * @param action 
     */
    const _to = (action: Function) => 
        ({year, month, day, hour, minute, second, millisecond}: ActionParam) => 
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

    type Preposition = "to" | "from";
    const _toInc = _to(incBy);
    const _toDec = _to(decBy);
    const _transform = (preposition: Preposition, action: (p: SimplyDate) => (p1: SimplyDate) => SimplyDate) => (value: number) => ({
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