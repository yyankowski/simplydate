import { expect } from 'chai';
import { Simply, SimplyDate } from '../src';

describe('years.spec.ts', () => {
	let sDt: SimplyDate;
	it('1.0 correctly subtract year', () => {
		sDt = Simply.from.date(new Date('2017-03-29T03:24:00'));
		const { year, day, month } = Simply.subtract(7).years.from(sDt);
		expect(year).to.equal(2010);
		expect(month).to.equal(3);
		expect(day).to.equal(29);
	});

	it('1.3 correctly add years', () => {
		sDt = Simply.from.date(new Date('2017-03-29T03:24:00'));
		const { year, day, month } = Simply.add(10).years.to(sDt);
		expect(year).to.equal(2027);
		expect(month).to.equal(3);
		expect(day).to.equal(29);
	});

	describe('Edge cases', () => {
		it('1.1 correctly subtract from a leap year when the current month has more days than the resulting one', () => {
			sDt = Simply.from.date(new Date('2020-02-29T03:24:00'));
			const { year, month, day } = Simply.subtract(1).years.from(sDt);

			expect(year).to.equal(2019);
			expect(month).to.equal(3);
			expect(day).to.equal(1);
		});

		it('1.2 correctly subtract from a leap year when the resulting year is also a leap year', () => {
			sDt = Simply.from.date(new Date('2024-02-29T03:24:00'));
			const res = Simply.subtract(4).years.from(sDt);

			expect(res.year).to.equal(2020);
			expect(res.day).to.equal(29);
		});

		it('1.4 correctly add to a leap year', () => {
			sDt = Simply.from.date(new Date('2020-02-29T03:24:00'));
			const { year, day, month } = Simply.add(1).years.to(sDt);
			expect(year).to.equal(2021);
			expect(month).to.equal(3);
			expect(day).to.equal(1);
		});

		it('1.5 correctly add to a leap year when the result is also a leap year', () => {
			sDt = Simply.from.date(new Date('2020-02-29T03:24:00'));
			const { year, day, month } = Simply.add(4).years.to(sDt);
			expect(year).to.equal(2024);
			expect(month).to.equal(2);
			expect(day).to.equal(29);
		});

	});
});
