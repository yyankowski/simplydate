import { expect } from 'chai';
import {Simply, SimplyDate} from '../src';

describe('years.spec.ts', () => {
    let sDt: SimplyDate;
    it('1.0 correctly subtract year', () => {
        sDt = Simply.from.date(new Date(`2017-03-29T03:24:00`));
        const {year, day, month} = Simply.subtract(7).years.from(sDt);
        expect(year).to.equal(2010);
        expect(month).to.equal(3);
        expect(day).to.equal(29);
    });

    it('1.1 correctly subtract from a leap year when the current month has more days than the resulting one', () => {
        sDt = Simply.from.date(new Date(`2020-02-29T03:24:00`));
        const res = Simply.subtract(1).years.from(sDt);

        expect(res.year).to.equal(2019);
        expect(res.day).to.equal(28);
    });
});
