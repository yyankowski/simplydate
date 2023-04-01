import { expect } from 'chai';
import { Simply, SimplyDate } from '../src';

describe('days.spec.ts ', () => {
	let sDt: SimplyDate;

	describe('1.0 subtraction test cases ', () => {
		beforeEach(() => {
			sDt = Simply.from.date(new Date('2017-03-01T03:24:00'));
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
			sDt = Simply.from.date(new Date('2017-02-28T03:24:00'));
		});
		it('2.1 correctly add a day to the last day of February of a regular year', () => {
			expect(sDt.day).to.equal(28);
			expect(Simply.add(1).days.to(sDt).day).to.equal(1);
		});

		it('2.2 correctly add a day to the last day of February of a regular year', () => {
			expect(Simply.add(1).days.to(sDt).month).to.equal(3);
		});

		it('2.3 correctly add a day to the last day of February of a regular year', () => {
			sDt = Simply.from.date(new Date('2017-01-28T03:24:00'));
			expect(Simply.add(3).days.to(sDt).day).to.equal(31);
		});

		it('2.4 correctly add a negative value', () => {
			sDt = Simply.from.date(new Date('2017-01-28T03:24:00'));
			expect(Simply.add(-3).days.to(sDt).day).to.equal(25);
		});
	});
	
	describe('3.0 edge test cases', () => {
		  beforeEach(() => {
		    sDt = Simply.from.date(new Date('2022-01-01T00:00:00'));
		  });

		  it('3.1 correctly add a day to the last day of February of a leap year', () => {
		    sDt = Simply.from.date(new Date('2024-02-29T00:00:00'));
		    expect(Simply.add(1).days.to(sDt).day).to.equal(1);
		  });

		  it('3.2 correctly subtract a day from the first day of a year', () => {
		    sDt = Simply.from.date(new Date('2022-01-01T00:00:00'));
		    expect(Simply.subtract(1).days.from(sDt).day).to.equal(31);
		    expect(Simply.subtract(1).days.from(sDt).month).to.equal(12);
		    expect(Simply.subtract(1).days.from(sDt).year).to.equal(2021);
		  });

		  it('3.3 correctly subtract a day from the last day of a year', () => {
		    sDt = Simply.from.date(new Date('2022-12-31T00:00:00'));
		    expect(Simply.subtract(1).days.from(sDt).day).to.equal(30);
		    expect(Simply.subtract(1).days.from(sDt).month).to.equal(12);
		    expect(Simply.subtract(1).days.from(sDt).year).to.equal(2022);
		  });

		  it('3.4 correctly add 365 days to a non-leap year', () => {
		    sDt = Simply.from.date(new Date('2022-01-01T00:00:00'));
		    expect(Simply.add(365).days.to(sDt).day).to.equal(1);
		    expect(Simply.add(365).days.to(sDt).month).to.equal(1);
		    expect(Simply.add(365).days.to(sDt).year).to.equal(2023);
		  });

		  it('3.5 correctly add 366 days to a leap year', () => {
		    sDt = Simply.from.date(new Date('2024-01-01T00:00:00'));
		    expect(Simply.add(366).days.to(sDt).day).to.equal(1);
		    expect(Simply.add(366).days.to(sDt).month).to.equal(1);
		    expect(Simply.add(366).days.to(sDt).year).to.equal(2025);
		  });

		  it('3.6 correctly subtract 365 days from a non-leap year', () => {
		    sDt = Simply.from.date(new Date('2022-01-01T00:00:00'));
		    expect(Simply.subtract(365).days.from(sDt).day).to.equal(1);
		    expect(Simply.subtract(365).days.from(sDt).month).to.equal(1);
		    expect(Simply.subtract(365).days.from(sDt).year).to.equal(2021);
		  });

		  it('3.7 correctly subtract 366 days from a leap year', () => {
		    sDt = Simply.from.date(new Date('2020-01-01T03:24:00'));
		    const result = Simply.subtract(366).days.from(sDt);
		    const expected = Simply.from.date(new Date('2019-01-01T03:24:00'));
		    expect(result.year).to.equal(expected.year);
		    expect(result.month).to.equal(expected.month);
		    expect(result.day).to.equal(expected.day);
		    expect(result.hour).to.equal(expected.hour);
		    expect(result.minute).to.equal(expected.minute);
		    expect(result.second).to.equal(expected.second);
		    expect(result.millisecond).to.equal(expected.millisecond);
		  });

		  it('3.8 correctly subtract a negative value from a leap year', () => {
		    sDt = Simply.from.date(new Date('2020-01-01T03:24:00'));
		    expect(Simply.subtract(-1).days.from(sDt).day).to.equal(2);
		  });

		  it('3.9 correctly add 366 days to a leap year', () => {
		    sDt = Simply.from.date(new Date('2020-01-01T03:24:00'));
		    expect(Simply.add(366).days.to(sDt).day).to.equal(1);
		  });

		  it('3.10 correctly add a negative value to a leap year', () => {
		    sDt = Simply.from.date(new Date('2020-01-01T03:24:00'));
		    expect(Simply.add(-1).days.to(sDt).day).to.equal(31);
		  });

  	});
});
