import { SimplyDate } from "./models";
import { getTotalNumberOfDaysInMonth } from "./utilities";

/**
     * Add 
     * @param value 
     */
    // export const add =  _transform("to", _toInc);
    // export const subtract = _transform("from", _toDec);
    export const addYears = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { year: sDt.year + value });


    export const addMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
        const sumOfMonths = sDt.month + value;
        const mod = (sDt.month + value) % 12;

        if (sumOfMonths <= 12)
            return Object.assign({ ...sDt }, { month: sumOfMonths });

        const yearsToAdd = (sumOfMonths % 12) === 0 ? (sumOfMonths / 12) - 1 : ~~(sumOfMonths / 12);

        const {year} = addYears(yearsToAdd)(sDt);
        return Object.assign({ ...sDt }, {
            year,
            month: mod === 0 ? 12 : mod
        });
    }

    export const addDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
        let { day } = sDt;
        const lastDayOfMonth = getTotalNumberOfDaysInMonth(sDt.year, sDt.month);
        
        const sum = value + day;
        if(sum <= lastDayOfMonth) {
            day = sum;
        }
        else{
            const addOneMonth = addMonths(1);
            while(value--){
                day++;
                if(day > lastDayOfMonth){
                    day = 1;
                    sDt = addOneMonth(sDt);
                }
            }
        }

        const {year, month} = sDt;

        return Object.assign({ ...sDt }, { year, month, day });
    };

    export const addHours = (value: number) => (sDt: SimplyDate): SimplyDate => {
        let { hour } = sDt;
        const sum = hour + value;

        if(sum < 24){
            hour = sum;
        }
        else{
            let addOneDay = addDays(1);
            while(value--){
                hour++;
                if(hour === 24){
                    hour = 0;
                    sDt = addOneDay(sDt);
                }
            }
        }

        const {year, month, day} = sDt;

        return Object.assign({ ...sDt }, { year, month, day, hour });
    };

    const _addMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });

    const _addMilliseconds = (value: number) => (sDt: SimplyDate): SimplyDate => Object.assign({
        ...sDt
    }, { hour: (sDt.hour + value) % 24 });