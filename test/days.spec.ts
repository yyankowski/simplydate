import { expect } from 'chai';
import { Simply } from '../src';
import { SimplyDate } from '../src/models';

describe('days.spec.ts ', () => {
    let sDt: SimplyDate;

    describe('1.0 subtraction test cases ', () => {
        beforeEach(() => {
            sDt = Simply.from.date(new Date(`2017-03-01T03:24:00`));
        });
        it('1.1 correctly subtract a day of a regular month', () => {
            expect(Simply.subtract(1).days.from(sDt).day).to.equal(28);
        });

        it('1.2 correctly subtract a negative value', () => {
            expect(Simply.subtract(-1).days.from(sDt).day).to.equal(2);
        });
    });
    
    describe('2.0 addition test cases ', () => {
        beforeEach(() => {
            sDt = Simply.from.date(new Date(`2017-02-28T03:24:00`));
        });
        it('2.1 correctly add a day to the last day of February of a regular year', () => {
            expect(sDt.day).to.equal(28);
            expect(Simply.add(1).days.to(sDt).day).to.equal(1);
        });

        it('2.2 correctly add a day to the last day of February of a regular year', () => {
            expect(Simply.add(1).days.to(sDt).month).to.equal(3);
        });

        it('2.3 correctly add a day to the last day of February of a regular year', () => {
            sDt = Simply.from.date(new Date(`2017-01-28T03:24:00`));
            expect(Simply.add(3).days.to(sDt).day).to.equal(31);
        });

        it('2.4 correctly add a negative value', () => {
            sDt = Simply.from.date(new Date(`2017-01-28T03:24:00`));
            expect(Simply.add(-3).days.to(sDt).day).to.equal(25);
        });
    });
});
