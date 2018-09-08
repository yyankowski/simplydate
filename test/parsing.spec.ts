import {expect} from 'chai';
import {Simply} from '../src';

describe('parsing.spec.ts parsing strings should', () => {
    it('1.0 ', () => {
        const {year, month, day, hour, minute, second, millisecond} = Simply.from.string('12-25-1995', 'MM-DD-YYYY');
        expect(year).to.equal(1995);
        expect(month).to.equal(12);
        expect(day).to.equal(25);
        expect(hour).to.equal(0);
        expect(minute).to.equal(0);
        expect(second).to.equal(0);
        expect(millisecond).to.equal(0);
    });

    it('2.0 after parsing from number, should yield back the same number', () => {
        const sDt = Simply.from.number(1515035460000);
        expect(sDt.year).to.equal(2018);
        expect(sDt.month).to.equal(1);
        expect(sDt.day).to.equal(4);
        expect(sDt.hour).to.equal(4);
        expect(sDt.minute).to.equal(11);
    });

    it('3.0 parsing number and converting it back', () => {
        const startDate = Date.UTC(2018, 8, 14, 9, 4, 3, 455);
        // const timestamp = Date.UTC(now.year, now.month, now.day, now.hour, now.minute, now.second, now.millisecond);
        expect(startDate).to.equal(1536915843455);
        const dt = new Date(1536915843455);
        expect(dt.getTime()).to.equal(startDate);
        // const MSEC = 1515035460000;
        const sDt = Simply.subtract(dt.getTimezoneOffset() * 60000).minutes.from(Simply.from.number(startDate));
        expect(sDt.millisecond).to.equal(455);
        expect(sDt.second).to.equal(3);
        expect(sDt.minute).to.equal(4);
        expect(sDt.hour).to.equal(9);
        expect(sDt.day).to.equal(14);
        expect(sDt.month).to.equal(9); // javascript month starts from 0, SimplyDate from 1
        expect(sDt.year).to.equal(2018);
        expect(Simply.to.number(sDt)).to.equal(startDate);
    });
});
