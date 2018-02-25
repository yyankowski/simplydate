import { expect } from "chai";
import { Simply } from "../src/index";
import './parsing.spec';
import './minutes.spec';
import './seconds.spec';
import './years.spec';
import './days.spec';
import './hours.spec';
import './milliseconds.spec';
import { SimplyDate } from "../src/models";

describe("SimplyDate library unit-tests", () => {
    let sDt: SimplyDate;

    describe("1.0 simple use cases should", () => {
        const YEAR = 1995;
        const MONTH = 12;
        const DAY = 17;
        beforeEach(() => {
            sDt = Simply.from(new Date(`${YEAR}-${MONTH}-${DAY}T03:24:00`));
        });
    
        it("1.1 should correctly set year", () => {
            expect(sDt.year).to.equal(YEAR);
        });
    
        it("1.2 should correctly set month", () => {
            expect(sDt.month).to.equal(MONTH);
        });
    
        it("1.3 should correctly set day", () => {
            expect(sDt.day).to.equal(DAY);
        });
    
        it("1.4 should correctly set hour", () => {
            expect(sDt.hour).to.equal(3);
        });
    
        it("1.5 should correctly set minute", () => {
            expect(sDt.minute).to.equal(24);
        });
    
        it("1.6 should correctly set second", () => {
            expect(sDt.second).to.equal(0);
        });
    
        it("1.7 should correctly set millisecond", () => {
            expect(sDt.millisecond).to.equal(0);
        });
    
        it("1.8 should correctly add year", () => {
            expect(Simply.add(2).years.to(sDt).year).to.equal(1997);
        });
    });

    describe("2.0 formatting functionality should", () => {
        let sDt: SimplyDate;

        it("2.1 format a SimplyDate as expected", () => {
            sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
            expect(Simply.format(sDt).as("YYYY-MM-DDTHH:mm")).to.equal("2017-03-01T03:24");
            expect(Simply.format(sDt).as("YYYY-MM-DDTHH:mm:ss")).to.equal("2017-03-01T03:24:00");
            expect(Simply.format(sDt).as("YYYY-MM-DDTHH:mm:ss.SSS")).to.equal("2017-03-01T03:24:00.000");
        });

        it("2.2 format a SimplyDate as expected", () => {
            sDt = Simply.from(new Date(`2017-03-01T03:01:00`));
            expect(Simply.format(sDt).as("YYYY-MM-DDTHH:mm:ss.SSS")).to.equal("2017-03-01T03:01:00.000");
        });

        it("2.3 format a SimplyDate as expected", () => {
            sDt = Simply.from(new Date(`2017-03-01`));
            expect(Simply.format(sDt).as("YYYY-MM-DD")).to.equal("2017-03-01");
        });

        it("2.4 format a SimplyDate as expected", () => {
            sDt = Simply.from(new Date(`2017-03-01T03:24`));
            expect(Simply.format(sDt).as("HH:mm")).to.equal("03:24");
        });
    });
});
