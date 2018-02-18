import { expect } from "chai";
import { Simply } from "../src/index";

describe("seconds.spec.ts seconds manipulation logic should ", () => {
    describe("1.0 correctly subtract seconds", () => {
        let sDt;
        beforeEach(() => {
            sDt = Simply.fromString("12-25-2018", "MM-DD-YYYY");
        });
        it("1.1 to have valid initial seconnds", () => {
            expect(sDt.second).to.equal(0);
        });

        it("1. correctly subtract seconds ", () => {
           expect(Simply.subtract(1).seconds.from(sDt).second).to.equal(59);
        });
    
        it("2. correctly subtract seconds ", () => {
            expect(Simply.subtract(1).seconds.from(sDt).day).to.equal(24);
        });
    });
});