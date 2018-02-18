import { expect } from "chai";
import { Simply } from "../src/index";

describe("minutes.spec.ts subtraction ", () => {
    let sDt: Simply.SimplyDate;
    it("3.5.1 correctly subtract minutes", () => {
        sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
        expect(Simply.subtract(24).minutes.from(sDt).hour).to.equal(3);
        expect(Simply.subtract(24).minutes.from(sDt).minute).to.equal(0);
    });

    it("3.5.2 correctly subtract minutes", () => {
        sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
        expect(Simply.subtract(25).minutes.from(sDt).minute).to.equal(59);
    });
});