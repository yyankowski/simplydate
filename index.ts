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

    const to = (obj: {[key: string]: string}) => (sDt: SimplyDate) => 
        Object.assign({...sDt}, obj);

    export const add = (value: number) => ({
        month: () => ({
            to: ({year, month, day, hour, minute, second, millisecond}: SimplyDate) => ({
                year,
                month : month + 1,
                day,
                hour,
                minute,
                second,
                millisecond,
            })
        })
    })
}