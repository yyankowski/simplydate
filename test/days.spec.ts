import { expect } from "chai";
import { Simply } from "../src/index";

describe("days.spec.ts ", () => {
    let sDt: Simply.SimplyDate;

    describe("1.0 subtraction test cases ", () => {
        it("1.1 correctly subtract a day of a regular month", () => {
            sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
            expect(Simply.subtract(1).days.from(sDt).day).to.equal(28);
        });
    });
    
    describe("2.0 addition test cases ", () => {
        it("2.1 correctly add a day to the last day of February of a regular year", () => {
            sDt = Simply.from(new Date(`2017-02-28T03:24:00`));
            expect(sDt.day).to.equal(28);
            expect(Simply.add(1).days.to(sDt).day).to.equal(1);
        });

        it("2.2 correctly add a day to the last day of February of a regular year", () => {
            sDt = Simply.from(new Date(`2017-02-28T03:24:00`));
            expect(Simply.add(1).days.to(sDt).month).to.equal(3);
        });

        it("2.3 correctly add a day to the last day of February of a regular year", () => {
            sDt = Simply.from(new Date(`2017-01-28T03:24:00`));
            expect(Simply.add(3).days.to(sDt).day).to.equal(31);
        });
    });
});