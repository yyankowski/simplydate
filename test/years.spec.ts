import { Simply, SimplyDate } from "../src";

describe("years.spec.ts", () => {
  let sDt: SimplyDate;
  it("1.0 correctly subtract year", () => {
    sDt = Simply.from.date(new Date("2017-03-29T03:24:00"));
    const { year, day, month } = Simply.subtract(7).years.from(sDt);
    expect(year).toBe(2010);
    expect(month).toBe(3);
    expect(day).toBe(29);
  });

  it("1.3 correctly add years", () => {
    sDt = Simply.from.date(new Date("2017-03-29T03:24:00"));
    const { year, day, month } = Simply.add(10).years.to(sDt);
    expect(year).toBe(2027);
    expect(month).toBe(3);
    expect(day).toBe(29);
  });

  describe("Edge cases", () => {
    it("1.1 correctly subtract from a leap year when the current month has more days than the resulting one", () => {
      sDt = Simply.from.date(new Date("2020-02-29T03:24:00"));
      const { year, month, day } = Simply.subtract(1).years.from(sDt);

      expect(year).toBe(2019);
      expect(month).toBe(3);
      expect(day).toBe(1);
    });

    it("1.2 correctly subtract from a leap year when the resulting year is also a leap year", () => {
      sDt = Simply.from.date(new Date("2024-02-29T03:24:00"));
      const res = Simply.subtract(4).years.from(sDt);

      expect(res.year).toBe(2020);
      expect(res.day).toBe(29);
    });

    it("1.4 correctly add to a leap year", () => {
      sDt = Simply.from.date(new Date("2020-02-29T03:24:00"));
      const { year, day, month } = Simply.add(1).years.to(sDt);
      expect(year).toBe(2021);
      expect(month).toBe(3);
      expect(day).toBe(1);
    });

    it("1.5 correctly add to a leap year when the result is also a leap year", () => {
      sDt = Simply.from.date(new Date("2020-02-29T03:24:00"));
      const { year, day, month } = Simply.add(4).years.to(sDt);
      expect(year).toBe(2024);
      expect(month).toBe(2);
      expect(day).toBe(29);
    });

    it("1.6 should correctly handle leap years when adding years", () => {
      // starting from a leap year
      let sDt = Simply.from.date(new Date("2020-02-29T03:24:00"));
      // adding 1 year should result in another leap year
      let { year, month, day } = Simply.add(1).years.to(sDt);
      expect(year).toBe(2021);
      expect(month).toBe(3);
      expect(day).toBe(1);

      // starting from a leap year
      sDt = Simply.from.date(new Date("2020-02-29T03:24:00"));
      // adding 4 years should result in another leap year
      ({ year, month, day } = Simply.add(4).years.to(sDt));
      expect(year).toBe(2024);
      expect(month).toBe(2);
      expect(day).toBe(29);

      // starting from a non-leap year
      sDt = Simply.from.date(new Date("2021-02-28T03:24:00"));
      // adding 1 year should result in a non-leap year
      ({ year, month, day } = Simply.add(1).years.to(sDt));
      expect(year).toBe(2022);
      expect(month).toBe(2);
      expect(day).toBe(28);

      // starting from a non-leap year
      sDt = Simply.from.date(new Date("2021-02-28T03:24:00"));
      // adding 4 years should result in a non-leap year
      ({ year, month, day } = Simply.add(4).years.to(sDt));
      expect(year).toBe(2025);
      expect(month).toBe(2);
      expect(day).toBe(28);
    });

    it("1.7 correctly subtract a zero value", () => {
      sDt = Simply.from.date(new Date("2017-03-29T03:24:00"));
      const { year, day, month } = Simply.subtract(0).years.from(sDt);
      expect(year).toBe(2017);
      expect(month).toBe(3);
      expect(day).toBe(29);
    });

    it("1.8 correctly add a zero value", () => {
      sDt = Simply.from.date(new Date("2017-03-29T03:24:00"));
      const { year, day, month } = Simply.add(0).years.to(sDt);
      expect(year).toBe(2017);
      expect(month).toBe(3);
      expect(day).toBe(29);
    });

    it("1.9 correctly add a negative value", () => {
      sDt = Simply.from.date(new Date("2017-03-29T03:24:00"));
      const { year, day, month } = Simply.add(-1).years.to(sDt);
      expect(year).toBe(2016);
      expect(month).toBe(3);
      expect(day).toBe(29);
    });
  });
});
