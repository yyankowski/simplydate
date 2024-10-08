import { Simply, SimplyDate } from "../src";

describe("milliseconds.spec.ts", () => {
  let sDt: SimplyDate;

  describe("1.0 subtraction ", () => {
    it("1.1 should correctly subtract milliseconds", () => {
      sDt = Simply.from.date(new Date("2017-03-01T03:24:00"));
      expect(Simply.subtract(500).milliseconds.from(sDt).millisecond).toBe(500);
      expect(Simply.subtract(500).milliseconds.from(sDt).second).toBe(59);
      expect(Simply.subtract(500).milliseconds.from(sDt).minute).toBe(23);
    });
  });

  describe("2.0 addition ", () => {
    it("2.1 should correctly add milliseconds", () => {
      sDt = Simply.from.date(new Date("2017-03-01T03:24:00"));
      expect(Simply.add(500).milliseconds.to(sDt).millisecond).toBe(500);
      expect(Simply.add(500).milliseconds.to(sDt).second).toBe(0);
    });

    it("2.2 should correctly add milliseconds", () => {
      sDt = Simply.from.date(new Date("2017-03-01T03:24:59"));
      expect(Simply.add(1000).milliseconds.to(sDt).millisecond).toBe(0);
      expect(Simply.add(1000).milliseconds.to(sDt).second).toBe(0);
      expect(Simply.add(1000).milliseconds.to(sDt).minute).toBe(25);
    });
  });
});
