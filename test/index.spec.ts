import { Simply, SimplyDate } from '../src';

describe('SimplyDate library unit-tests', () => {
    let sDt: SimplyDate;

    describe('1.0 simple use cases should', () => {
        const YEAR = 1995;
        const MONTH = 12;
        const DAY = 17;
        beforeEach(() => {
            sDt = Simply.from.date(new Date(`${YEAR}-${MONTH}-${DAY}T03:24:00`));
        });

        it('1.1 should correctly set year', () => {
            expect(sDt.year).toBe(YEAR);
        });

        it('1.2 should correctly set month', () => {
            expect(sDt.month).toBe(MONTH);
        });

        it('1.3 should correctly set day', () => {
            expect(sDt.day).toBe(DAY);
        });

        it('1.4 should correctly set hour', () => {
            expect(sDt.hour).toBe(3);
        });

        it('1.5 should correctly set minute', () => {
            expect(sDt.minute).toBe(24);
        });

        it('1.6 should correctly set second', () => {
            expect(sDt.second).toBe(0);
        });

        it('1.7 should correctly set millisecond', () => {
            expect(sDt.millisecond).toBe(0);
        });

        it('1.8 should correctly add year', () => {
            expect(Simply.add(2).years.to(sDt).year).toBe(1997);
        });
    });

    describe('2.0 formatting functionality should', () => {

        it('2.1 format a SimplyDate as expected', () => {
            sDt = Simply.from.date(new Date('2017-03-01T03:24:00'));
            expect(Simply.format(sDt).as('YYYY-MM-DDTHH:mm')).toBe('2017-03-01T03:24');
            expect(Simply.format(sDt).as('YYYY-MM-DDTHH:mm:ss')).toBe('2017-03-01T03:24:00');
            expect(Simply.format(sDt).as('YYYY-MM-DDTHH:mm:ss.SSS')).toBe('2017-03-01T03:24:00.000');
        });

        it('2.2 format a SimplyDate as expected', () => {
            sDt = Simply.from.date(new Date('2017-03-01T03:01:00'));
            expect(Simply.format(sDt).as('YYYY-MM-DDTHH:mm:ss.SSS')).toBe('2017-03-01T03:01:00.000');
        });

        it('2.3 format a SimplyDate as expected', () => {
            sDt = Simply.from.date(new Date('2017-03-01'));
            expect(Simply.format(sDt).as('YYYY-MM-DD')).toBe('2017-03-01');
        });

        it('2.4 format a SimplyDate as expected', () => {
            sDt = Simply.from.date(new Date('2017-03-01T03:24'));
            expect(Simply.format(sDt).as('HH:mm')).toBe('03:24');
        });

        it('2.5 format as am', () => {
            sDt = Simply.from.string('2017-03-29T03:24:00');
            expect(Simply.format(sDt).as('YY MMM DD h:mm A')).toBe('17 Mar 29 3:24 AM');
        });

        it('2.6 format as pm', () => {
            sDt = Simply.from.string('2017-03-29T13:24:00');
            expect(Simply.format(sDt).as('YY MMM DD h:mm A')).toBe('17 Mar 29 1:24 PM');
        });

        it('2.7 format as HH:mm:ss', () => {
            sDt = Simply.from.string('2017-03-29T13:24:00');
            expect(Simply.format(sDt).as('HH:mm:ss')).toBe('13:24:00');
        });

        it('2.8 format using Intl.DateTimeFormat to German date ', () => {
            const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            } as const;

            sDt = Simply.from.string('2017-03-29T13:24:00');
            expect(Simply.format(sDt).as({ locale: "de-DE", options })).toBe("Mittwoch, 29. März 2017");
        });
    });

    describe('3.0 operations with Unix Epoch', () => {
        it('should correctly convert date', () => {
            expect(Simply.to.msSinceEpoch(Simply.from.string('2017-03-29T13:24:11'), -120))
                .toBe(1490786651000);
        });
    });
});
