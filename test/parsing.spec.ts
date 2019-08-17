import {expect} from 'chai';
import {Simply} from '../src';

describe('parsing.spec.ts parsing strings should', () => {
    it('1.0 ', () => {
        const {year, month, day, hour, minute, second, millisecond} = Simply.from.string('12-25-1995', 'MM-DD-YYYY');
        expect(year).to.equal(1995, 'year');
        expect(month).to.equal(12, 'month');
        expect(day).to.equal(25, 'day');
        expect(hour).to.equal(0, 'hour');
        expect(minute).to.equal(0, 'minute');
        expect(second).to.equal(0, 'second');
        expect(millisecond).to.equal(0, 'millisecond');
    });

    it('2.0 after parsing from milliseconds since the Epoch, should provide the expected time unit values', () => {
        const sDt = Simply.from.msSinceEpoch(1515035460000);
        expect(sDt.year).to.equal(2018, 'year');
        expect(sDt.month).to.equal(1, 'month');
        expect(sDt.day).to.equal(4, 'day');
        expect(sDt.hour).to.equal(4, 'hour');
        expect(sDt.minute).to.equal(11, 'minute');
    });

    it('3.0 parsing number and converting it back', () => {
        const fromUnixEpoch = Date.UTC(2018, 8, 14, 9, 4, 3, 455);
        // const timestamp = Date.UTC(now.year, now.month, now.day, now.hour, now.minute, now.second, now.millisecond);
        expect(fromUnixEpoch).to.equal(1536915843455);
        const dt = new Date(1536915843455);
        expect(dt.getTime()).to.equal(fromUnixEpoch);
        const sDt = Simply.from.msSinceEpoch(fromUnixEpoch);
        // const offsetHours = dt.getTimezoneOffset();
        // expect(offsetHours).to.equal(120);
        expect(sDt.millisecond).to.equal(455);
        expect(sDt.second).to.equal(3);
        expect(sDt.minute).to.equal(4);
        expect(sDt.hour).to.equal(11); // we are looking at the local computer time in this case
        expect(sDt.day).to.equal(14);
        expect(sDt.month).to.equal(9); // javascript month starts from 0, SimplyDate from 1
        expect(sDt.year).to.equal(2018);
        expect(Simply.to.msSinceEpoch(sDt)).to.equal(fromUnixEpoch, 'epoch');
    });
});
