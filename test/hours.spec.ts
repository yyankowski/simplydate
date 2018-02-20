import { expect } from "chai";
import { Simply } from "../src/index";

describe("hours.spec.ts ", () => {
    let sDt: Simply.SimplyDate;
    it("3.4.1 correctly subtract an hour", () => {
        sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
        expect(Simply.subtract(3).hours.from(sDt).day).to.equal(1);
        expect(Simply.subtract(3).hours.from(sDt).hour).to.equal(0);
    });

    it("3.4.2 correctly subtract an hour", () => {
        sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
        expect(Simply.subtract(4).hours.from(sDt).day).to.equal(28);
        expect(Simply.subtract(4).hours.from(sDt).hour).to.equal(23);
    });

    it("3.4.3 correctly subtract an hour", () => {
        sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
        expect(Simply.subtract(24).hours.from(sDt).day).to.equal(28);
        expect(Simply.subtract(24).hours.from(sDt).hour).to.equal(3);
    });
});