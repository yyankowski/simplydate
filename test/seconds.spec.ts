import { expect } from "chai";
import { Simply } from "../src/index";
import { SimplyDate } from "../src/models";

describe("seconds.spec.ts seconds manipulation logic should ", () => {
    describe("1.0 correctly subtract seconds", () => {
        let sDt;
        beforeEach(() => {
            sDt = Simply.from.string("12-25-2018", "MM-DD-YYYY");
        });
        it("1.1 to have valid initial seconnds", () => {
            expect(sDt.second).to.equal(0);
        });

        it("1.2 correctly subtract seconds ", () => {
           expect(Simply.subtract(1).seconds.from(sDt).second).to.equal(59);
        });
    
        it("1.3 correctly subtract seconds ", () => {
            expect(Simply.subtract(1).seconds.from(sDt).day).to.equal(24);
        });

        xit("1.4 correctly subtract seconds ", () => {
            expect(Simply.subtract(-1).seconds.from(sDt).second).to.equal(24);
        });
    });

    describe("2.0 addition operations should", () => {
        let sDt: SimplyDate;

        it("2.1 correctly add seconds", () => {
            sDt = Simply.from.date(new Date(`2017-03-01T03:24:00`));
            expect(Simply.add(59).seconds.to(sDt).second).to.equal(59);
        });

        it("2.1 correctly add seconds", () => {
            sDt = Simply.from.date(new Date(`2017-03-01T03:24:00`));
            expect(Simply.add(70).seconds.to(sDt).second).to.equal(10);
            expect(Simply.add(70).seconds.to(sDt).minute).to.equal(25);
            expect(Simply.add(70).seconds.to(sDt).hour).to.equal(3);
        });
        
    });
});