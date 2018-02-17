import { expect } from "chai";
import { Simply } from "./index";

describe("SimplyDate library unit-tests", () => {
    let sDt: Simply.SimplyDate;

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
    
        describe("1.10 when a month value overflows 12", () => {
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
    })
    
    describe("2.0 Leap year use cases", () => {
        it("2.1 the month should be correctly incremented.", () => {
            sDt = Simply.from(new Date(`2015-02-29T03:24:00`));
            expect(Simply.add(12).months.to(sDt).month).to.equal(3);
        });

        it("2.2 the date should be correctly incremented.", () => {
            sDt = Simply.from(new Date(`2015-02-29T03:24:00`));
            expect(Simply.add(12).months.to(sDt).day).to.equal(1);
        });
    });

    describe("3.0 subtraction logic should", () => {

        describe("3.1 year subtraction ", () => {
            it("3.1.1 correctly subtract year", () => {
                sDt = Simply.from(new Date(`2017-03-29T03:24:00`));
                expect(Simply.subtract(7).years.from(sDt).year).to.equal(2010);
            });
        });
        
        describe("3.2 month subtraction ", () => {
            it("3.2.1 correctly subtract month", () => {
                sDt = Simply.from(new Date(`2017-04-29T03:24:00`));
                expect(Simply.subtract(1).months.from(sDt).month).to.equal(3);
            });
    
            it("3.2.2 correctly subtract month taking into account leap years", () => {
                sDt = Simply.from(new Date(`2016-03-29T03:24:00`));
                expect(Simply.subtract(1).months.from(sDt).day).to.equal(29);
            });
    
            it("3.2.3 correctly subtract month", () => {
                sDt = Simply.from(new Date(`2016-03-29T03:24:00`));
                expect(Simply.subtract(12).months.from(sDt).month).to.equal(3);
                expect(Simply.subtract(12).months.from(sDt).year).to.equal(2015);
            });
    
            it("3.2.4 correctly identify a leap year", () => {
                expect(Simply.isLeapYear(2016)).to.be.true;   
            });
    
            it("3.2.5 correctly subtract month of a regular year", () => {
                sDt = Simply.from(new Date(`2017-03-29T03:24:00`));
                expect(Simply.subtract(1).months.from(sDt).day).to.equal(28);
            });
        });

        describe("3.3 day subtraction ", () => {
            it("3.3.1 correctly subtract a day of a regular month", () => {
                sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
                expect(Simply.subtract(1).days.from(sDt).day).to.equal(28);
            });
        });

        describe("3.4 hours subtraction ", () => {
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

        describe("3.5 minutes subtraction ", () => {
            it("3.5.1 correctly subtract minutes", () => {
                sDt = Simply.from(new Date(`2017-03-01T03:24:00`));
                expect(Simply.subtract(24).minutes.from(sDt).hour).to.equal(3);
                expect(Simply.subtract(24).minutes.from(sDt).minute).to.equal(0);
            });
        });


    });
});
