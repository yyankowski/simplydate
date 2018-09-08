import { SimplyDate } from './models';
import { getTotalNumberOfDaysInMonth } from './utilities';
import {
    subtractDays, subtractHours, subtractMilliseconds, subtractMinutes, subtractMonths, subtractSeconds,
    subtractYears
} from './subtraction';

    /**
     * Add 
     * @param value 
     */
    // export const add =  _transform("to", _toInc);
    // export const subtract = _transform("from", _toDec);
    export const addYears = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if(value < 0) { return subtractYears(value)(sDt); }

        return {
            ...sDt, year: sDt.year + value
        };
    };

    export const addMonths = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if(value < 0) { return subtractMonths(-value)(sDt); }

        const sumOfMonths = sDt.month + value;
        const mod = (sDt.month + value) % 12;

        if (sumOfMonths <= 12) {
            return Object.assign({ ...sDt }, { month: sumOfMonths });
        }

        const yearsToAdd = (sumOfMonths % 12) === 0 ? (sumOfMonths / 12) - 1 : ~~(sumOfMonths / 12);

        const {year} = addYears(yearsToAdd)(sDt);
        return { ...sDt, year, month: mod === 0 ? 12 : mod };
    };

    export const addDays = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if(value < 0) { return subtractDays(-value)(sDt); }

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

        return { ...sDt, day };
    };

    export const addHours = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if(value < 0) { return subtractHours(-value)(sDt); }

        let { hour } = sDt;
        const sum = hour + value;

        if(sum < 24){
            hour = sum;
        }
        else{
            const addOneDay = addDays(1);
            while(value--){
                hour++;
                if(hour === 24){
                    hour = 0;
                    sDt = addOneDay(sDt);
                }
            }
        }

        return { ...sDt, hour };
    };

    export const addMinutes = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if(value < 0) { return subtractMinutes(-value)(sDt); }

        let {minute} = sDt;
        const sum = minute + value;
        if(sum < 60){
            minute = sum;
        }
        else{
            const addOneHour = addHours(1);
            while(value--){
                minute++;
                if(minute === 60){
                    minute = 0;
                    sDt = addOneHour(sDt);
                }
            }
        }

        return { ...sDt, minute };
    };

    export const addSeconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if(value < 0) { return subtractSeconds(-value)(sDt); }

        let {second} = sDt;
        const sum = value + second;

        if(sum < 60){
            second = sum;
        }
        else{
            const addOneMinute = addMinutes(1);
            while(value--){
                second++;
                if(second === 60){
                    second = 0;
                    sDt = addOneMinute(sDt);
                }
            }
        }

        return { ...sDt, second };
    };

    export const addMilliseconds = (value: number) => (sDt: SimplyDate): SimplyDate => {
        if(value < 0) { return subtractMilliseconds(-value)(sDt); }

        let {millisecond} = sDt;
        const sum = value + millisecond;

        if(sum < 1000){
            millisecond = sum;
        }
        else{
            const addOneSecond = addSeconds(1);
            while(value--){
                millisecond++;
                if(millisecond === 1000){
                    millisecond = 0;
                    sDt = addOneSecond(sDt);
                }
            }
        }

        return { ...sDt, millisecond };
    };
