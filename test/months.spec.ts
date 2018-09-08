import { expect } from "chai";
import { Simply } from "../src/index";
import { isLeapYear } from "../src/utilities";
import { SimplyDate } from "../src/models";

describe("3.2 month subtraction logic should", () => {
    let sDt: SimplyDate;

    it("3.2.1 correctly subtract month", () => {
        sDt = Simply.from.date(new Date(`2017-04-29T03:24:00`));
        expect(Simply.subtract(1).months.from(sDt).month).to.equal(3);
    });

    it("3.2.2 correctly subtract month taking into account leap years", () => {
        sDt = Simply.from.date(new Date(`2016-03-29T03:24:00`));
        expect(Simply.subtract(1).months.from(sDt).day).to.equal(29);
    });

    it("3.2.3 correctly subtract month", () => {
        sDt = Simply.from.date(new Date(`2016-03-29T03:24:00`));
        expect(Simply.subtract(12).months.from(sDt).month).to.equal(3);
        expect(Simply.subtract(12).months.from(sDt).year).to.equal(2015);
    });

    it("3.2.4 correctly identify a leap year", () => {
        expect(isLeapYear(2016)).to.be.true;   
    });

    it("3.2.5 correctly subtract month of a regular year", () => {
        sDt = Simply.from.date(new Date(`2017-03-29T03:24:00`));
        expect(Simply.subtract(1).months.from(sDt).day).to.equal(28);
    });

    it("3.2.6 correctly subtract month by a negative value", () => {
        sDt = Simply.from.date(new Date(`2017-03-29T03:24:00`));
        expect(Simply.subtract(-1).months.from(sDt).month).to.equal(4);
    });

    describe("1.10 when a month value overflows 12", () => {
        const YEAR = 1995;
        const MONTH = 12;
        const DAY = 17;
        beforeEach(() => {
            sDt = Simply.from.date(new Date(`${YEAR}-${MONTH}-${DAY}T03:24:00`));
        });
        
        it("1.10.1 the month should be correctly incremented.", () => {
            expect(Simply.add(2).months.to(sDt).month).to.equal(2);
        });

        it("1.10.2 the month should be correctly incremented.", () => {
            expect(Simply.add(12).months.to(sDt).month).to.equal(12);
            expect(Simply.add(24).months.to(sDt).month).to.equal(12);
        });

        it("1.10.3 the month should be correctly incremented.", () => {
            expect(Simply.add(13).months.to(sDt).month).to.equal(1);
            expect(Simply.add(11).months.to(sDt).month).to.equal(11);
        });
    
        it("1.10.4 the year should be correctly incremented.", () => {
            expect(Simply.add(2).months.to(sDt).year).to.equal(1996);
        });

        it("1.10.5 the year should be correctly incremented.", () => {
            expect(Simply.add(12).months.to(sDt).year).to.equal(1996);
            expect(Simply.add(13).months.to(sDt).year).to.equal(1997);
            expect(Simply.add(24).months.to(sDt).year).to.equal(1997);
        });

    });

    describe("2.0 Leap year use cases", () => {
        it("2.1 the month should be correctly incremented.", () => {
            sDt = Simply.from.date(new Date(`2015-02-29T03:24:00`));
            expect(Simply.add(12).months.to(sDt).month).to.equal(3);
        });

        it("2.2 the date should be correctly incremented.", () => {
            sDt = Simply.from.date(new Date(`2015-02-29T03:24:00`));
            expect(Simply.add(12).months.to(sDt).day).to.equal(1);
        });
    });
});