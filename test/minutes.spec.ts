import { expect } from 'chai';
import {Simply, SimplyDate} from '../src';

describe('minutes.spec.ts', () => {
    let sDt: SimplyDate;

    describe('1.0 subtraction ', () => {
        beforeEach(() => {
            sDt = Simply.from.date(new Date(`2017-03-01T03:24:00`));
        });

        it('1.1 correctly subtract minutes', () => {
            expect(Simply.subtract(24).minutes.from(sDt).hour).to.equal(3);
            expect(Simply.subtract(24).minutes.from(sDt).minute).to.equal(0);
        });
    
        it('1.2 correctly subtract minutes', () => {
            expect(Simply.subtract(25).minutes.from(sDt).minute).to.equal(59);
        });
    });

    describe('2.0 addition ', () => {
        beforeEach(() => {
            sDt = Simply.from.date(new Date(`2017-03-01T03:24:00`));
        });

        it('2.1 correctly add minutes', () => {
            expect(Simply.add(24).minutes.to(sDt).hour).to.equal(3);
            expect(Simply.add(36).minutes.to(sDt).minute).to.equal(0);
        });
    
        it('2.2 correctly add minutes', () => {
            expect(Simply.add(36).minutes.to(sDt).hour).to.equal(4);
        });
    });
});
