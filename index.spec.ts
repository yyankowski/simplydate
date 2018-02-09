import { Simply } from "./index";
import { expect } from "chai";

describe("SimplyDate library unit-tests", () => {
    let sDt: Simply.SimplyDate;
    beforeEach(() => {
        sDt = Simply.toSimplyDate(new Date('1995-12-17T03:24:00'));
    });

    it("1.0 should correctly set year", () => {
        expect(sDt.year).to.equal(1995);
    });

    it("2.0 should correctly set month", () => {
        expect(sDt.month).to.equal(12);
    });

    it("3.0 should correctly set day", () => {
        expect(sDt.day).to.equal(17);
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
        expect(Simply.add(2).years().to(sDt).year).to.equal(1997);
    });

    it("9.0 should correctly subtract year", () => {
        expect(Simply.subtract(7).years().from(sDt).year).to.equal(1988);
    });

    it("10.0 should correctly add month", () => {
        expect(Simply.add(2).months().to(sDt).month).to.equal(2);
    });
});
