import { Simply, SimplyDate } from '../src';

describe('hours.spec.ts ', () => {
	let sDt: SimplyDate;

	describe('1.0 subtraction should',() => {
		beforeEach(() => {
			sDt = Simply.from.date(new Date('2017-03-01T03:24:00'));
		});

		it('1.1 correctly subtract an hour', () => {
			expect(Simply.subtract(3).hours.from(sDt).day).toBe(1);
			expect(Simply.subtract(3).hours.from(sDt).hour).toBe(0);
		});

		it('1.2 correctly subtract an hour', () => {
			expect(Simply.subtract(4).hours.from(sDt).day).toBe(28);
			expect(Simply.subtract(4).hours.from(sDt).hour).toBe(23);
		});

		it('1.3 correctly subtract an hour', () => {
			expect(Simply.subtract(24).hours.from(sDt).day).toBe(28);
			expect(Simply.subtract(24).hours.from(sDt).hour).toBe(3);
		});

		it('1.4 correctly subtract a negative value', () => {
			expect(Simply.subtract(-2).hours.from(sDt).hour).toBe(5);
		});
	});

	describe('2.0 addition logic should', () => {
		beforeEach(() => {
			sDt = Simply.from.date(new Date('2017-03-01T03:24:00'));
		});

		it('2.1 correctly add hours', () => {
			expect(Simply.add(3).hours.to(sDt).hour).toBe(6);
		});

		it('2.2 correctly add negative hours', () => {
			expect(Simply.add(-3).hours.to(sDt).hour).toBe(0);
		});

		it('2.3 correctly add hours and increment days', () => {
			expect(Simply.add(21).hours.to(sDt).hour).toBe(0);
			expect(Simply.add(21).hours.to(sDt).day).toBe(2);
		});
	});
});
