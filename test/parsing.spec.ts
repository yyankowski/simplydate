import { expect } from "chai";
import { Simply } from "../src/index";
describe("parsing.spec.ts parsing strings should", () => {
    it("4.1 ", () => {
        const {year, month, day, hour, minute, second, millisecond} = Simply.fromString("12-25-1995", "MM-DD-YYYY");
        expect(year).to.equal(1995);
        expect(month).to.equal(12);
        expect(day).to.equal(25);
        expect(hour).to.equal(0);
        expect(minute).to.equal(0);
        expect(second).to.equal(0);
        expect(millisecond).to.equal(0);
    });
});