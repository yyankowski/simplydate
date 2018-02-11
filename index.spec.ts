import { expect } from "chai";
import { Simply } from "./index";

describe("SimplyDate library unit-tests", () => {
    let sDt: Simply.SimplyDate;
    const YEAR = 1995;
    const MONTH = 12;
    const DAY = 17;
    beforeEach(() => {
        sDt = Simply.toSimplyDate(new Date(`${YEAR}-${MONTH}-${DAY}T03:24:00`));
    });

    it("1.0 should correctly set year", () => {
        expect(sDt.year).to.equal(YEAR);
    });

    it("2.0 should correctly set month", () => {
        expect(sDt.month).to.equal(MONTH);
    });

    it("3.0 should correctly set day", () => {
        expect(sDt.day).to.equal(DAY);
    });

    it("4.0 should correctly set hour", () => {
        expect(sDt.hour).to.equal(3);
    });

    it("5.0 should correctly set minute", () => {
        expect(sDt.minute).to.equal(24);
    });

    it("6.0 should correctly set second", () => {
        expect(sDt.second).to.equal(0);
    });

    it("7.0 should correctly set millisecond", () => {
        expect(sDt.millisecond).to.equal(0);
    });

    it("8.0 should correctly add year", () => {
        expect(Simply.add(2).years.to(sDt).year).to.equal(1997);
    });

    // it("9.0 should correctly subtract year", () => {
    //     expect(Simply.subtract(7).years().from(sDt).year).to.equal(1988);
    // });

    describe("10.0 when a month value overflows 12", () => {
        it("10.1 the month should be correctly incremented.", () => {
            expect(Simply.add(2).months.to(sDt).month).to.equal(2);
        });

        it("10.2 the month should be correctly incremented.", () => {
            expect(Simply.add(12).months.to(sDt).month).to.equal(12);
        });

        it("10.3 the month should be correctly incremented.", () => {
            expect(Simply.add(13).months.to(sDt).month).to.equal(1);
        });
    
        it("10.4 the year should be correctly incremented.", () => {
            expect(Simply.add(2).months.to(sDt).year).to.equal(1996);
        });

        it("10.5 the year should be correctly incremented.", () => {
            expect(Simply.add(12).months.to(sDt).year).to.equal(1996);
        });
    });

    
});
