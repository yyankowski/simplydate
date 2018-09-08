import { expect } from 'chai';
import { Simply } from '../src';
import { SimplyDate } from '../src/models';

describe('years.spec.ts', () => {
    let sDt: SimplyDate;
    it('3.1.1 correctly subtract year', () => {
        sDt = Simply.from.date(new Date(`2017-03-29T03:24:00`));
        expect(Simply.subtract(7).years.from(sDt).year).to.equal(2010);
    });
});
