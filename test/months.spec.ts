import { Simply, SimplyDate } from "../src";

describe("3.2 month subtraction logic should", () => {
  let sDt: SimplyDate;

  it("3.2.1 correctly subtract month", () => {
    sDt = Simply.from.date(new Date("2017-04-29T03:24:00"));
    expect(Simply.subtract(1).months.from(sDt).month).toBe(3);
  });

  it("3.2.2 correctly subtract month taking into account leap years", () => {
    sDt = Simply.from.date(new Date("2016-03-29T03:24:00"));
    expect(Simply.subtract(1).months.from(sDt).day).toBe(29);
  });

  it("3.2.3 correctly subtract month", () => {
    sDt = Simply.from.date(new Date("2016-03-29T03:24:00"));
    expect(Simply.subtract(12).months.from(sDt).month).toBe(3);
    expect(Simply.subtract(12).months.from(sDt).year).toBe(2015);
  });

  it("3.2.5 correctly subtract month of a regular year", () => {
    sDt = Simply.from.string("2017-03-29T03:24:00");
    const { month, day, year } = Simply.subtract(1).months.from(sDt);
    expect(year).toBe(2017);
    expect(month).toBe(3);
    expect(day).toBe(1);
  });

  it("3.2.6 correctly subtract month by a negative value", () => {
    sDt = Simply.from.date(new Date("2017-03-29T03:24:00"));
    expect(Simply.subtract(-1).months.from(sDt).month).toBe(4);
  });

  it("3.2.7 correctly subtract month by a positive value", () => {
    sDt = Simply.from.date(new Date("2017-03-15T03:24:00"));
    expect(Simply.subtract(1).months.from(sDt).month).toBe(2);
    expect(Simply.subtract(1).months.from(sDt).day).toBe(15);
  });

  describe("1.10 when a month value overflows 12", () => {
    const YEAR = 1995;
    const MONTH = 12;
    const DAY = 17;
    beforeEach(() => {
      sDt = Simply.from.date(new Date(`${YEAR}-${MONTH}-${DAY}T03:24:00`));
    });

    it("1.10.1 the month should be correctly incremented.", () => {
      expect(Simply.add(2).months.to(sDt).month).toBe(2);
    });

    it("1.10.2 the month should be correctly incremented.", () => {
      expect(Simply.add(12).months.to(sDt).month).toBe(12);
      expect(Simply.add(24).months.to(sDt).month).toBe(12);
    });

    it("1.10.3 the month should be correctly incremented.", () => {
      expect(Simply.add(13).months.to(sDt).month).toBe(1);
      expect(Simply.add(11).months.to(sDt).month).toBe(11);
    });

    it("1.10.4 the year should be correctly incremented.", () => {
      expect(Simply.add(2).months.to(sDt).year).toBe(1996);
    });

    it("1.10.5 the year should be correctly incremented.", () => {
      expect(Simply.add(12).months.to(sDt).year).toBe(1996);
      expect(Simply.add(13).months.to(sDt).year).toBe(1997);
      expect(Simply.add(24).months.to(sDt).year).toBe(1997);
    });
  });

  describe("2.0 Leap year use cases", () => {
    it("2.1 the month should be correctly incremented.", () => {
      sDt = Simply.from.date(new Date("2015-02-29T03:24:00"));
      expect(Simply.add(12).months.to(sDt).month).toBe(3);
    });

    it("2.2 the date should be correctly incremented.", () => {
      sDt = Simply.from.date(new Date("2015-02-29T03:24:00"));
      expect(Simply.add(12).months.to(sDt).day).toBe(1);
    });
  });

  describe("4.0 Edge cases with last month days not being similar", () => {
    it("4.1 the month should be correctly incremented.", () => {
      // May in 2017 has 31 days, whereas June 2017 has only 30
      const sDt = Simply.from.string("2017-05-31T03:24:00");
      const { month, day } = Simply.add(1).months.to(sDt);
      expect(month).toBe(7);
      expect(day).toBe(1);
    });

    it("4.2 the month should be correctly incremented.", () => {
      // May in 2017 has 31 days, whereas June 2018 has only 30
      const sDt = Simply.from.string("2017-05-31T03:24:00");
      const { year, month, day } = Simply.add(13).months.to(sDt);
      expect(year).toBe(2018);
      expect(month).toBe(7);
      expect(day).toBe(1);
    });

    it("4.3 the month should be correctly decremented.", () => {
      // May in 2017 has 31 days, whereas June 2018 has only 30
      const sDt = Simply.from.string("2017-07-31T03:24:00");
      const { year, month, day } = Simply.subtract(1).months.from(sDt);
      expect(year).toBe(2017);
      expect(month).toBe(7);
      expect(day).toBe(1);
    });

    it("4.4 correctly subtract month by a negative value", () => {
      // March in 2018 has 31 days, April only 30.
      const sDt = Simply.from.string("2018-03-31");
      const { year, month, day } = Simply.subtract(-1).months.from(sDt);
      expect(year).toBe(2018);
      expect(month).toBe(5);
      expect(day).toBe(1);
    });

    it("4.5 correctly add month by a negative value", () => {
      // March in 2018 has 31 days, April only 30.
      const sDt = Simply.from.string("2018-03-15");
      const { year, month, day } = Simply.add(-1).months.to(sDt);
      expect(year).toBe(2018);
      expect(month).toBe(2);
      expect(day).toBe(15);
    });
  });
});
