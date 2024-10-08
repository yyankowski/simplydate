import { Simply } from "../src";

describe("parsing.spec.ts parsing strings should", () => {
  it("1.0 ", () => {
    const { year, month, day, hour, minute, second, millisecond } =
      Simply.from.string("12-25-1995", "MM-DD-YYYY");
    expect(year).toBe(1995);
    expect(month).toBe(12);
    expect(day).toBe(25);
    expect(hour).toBe(0);
    expect(minute).toBe(0);
    expect(second).toBe(0);
    expect(millisecond).toBe(0);
  });

  it("2.0 after parsing from milliseconds since the Epoch, should provide the expected time unit values", () => {
    const sDt = Simply.from.msSinceEpoch(1515035460000);
    const date = new Date(1515035460000);

    expect(sDt.year).toBe(2018);
    expect(sDt.month).toBe(1);
    expect(sDt.day).toBe(4);
    expect(sDt.hour).toBe(date.getHours());
    expect(sDt.minute).toBe(11);
  });

  it("3.0 parsing number and converting it back", () => {
    const fromUnixEpoch = Date.UTC(2018, 8, 14, 9, 4, 3, 455);
    // const timestamp = Date.UTC(now.year, now.month, now.day, now.hour, now.minute, now.second, now.millisecond);
    expect(fromUnixEpoch).toBe(1536915843455);
    const dt = new Date(1536915843455);
    expect(dt.getTime()).toBe(fromUnixEpoch);
    const sDt = Simply.from.msSinceEpoch(fromUnixEpoch);
    expect(sDt.millisecond).toBe(455);
    expect(sDt.second).toBe(3);
    expect(sDt.minute).toBe(4);
    expect(sDt.hour).toBe(dt.getHours()); // we are looking at the local computer time in this case
    expect(sDt.day).toBe(14);
    expect(sDt.month).toBe(9); // javascript month starts from 0, SimplyDate from 1
    expect(sDt.year).toBe(2018);
    expect(Simply.to.msSinceEpoch(sDt)).toBe(fromUnixEpoch);
  });
});
