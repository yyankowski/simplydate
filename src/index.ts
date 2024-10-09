// &&&& Localizations
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Localization {
  static readonly MONTHS = {
    MMM: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
  };
}

// &&&& // Localizations

export interface SimplyDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
}

// &&&& utilities
const isLeapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

// &&&& // utilities

// &&&&&&& subtraction

const subtractYears =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate => {
    if (value === 0) return sDt;

    let { day, month } = sDt;
    const year = sDt.year - value;

    // when the source year is a leap year and the target is not
    // i.e. February 29, 2020 minus 1 year should equal March 1, 2019
    if (day > 28 && sDt.month === 2) {
      if (isLeapYear(sDt.year) && !isLeapYear(year)) {
        day = 1;
        month = 3;
      }
    }

    return {
      year: sDt.year - value,
      month,
      day,
      hour: sDt.hour,
      minute: sDt.minute,
      second: sDt.second,
      millisecond: sDt.millisecond,
    };
  };

/**
 * Subtracts months from the current month value. If the value is negative then an addition operation is run.
 */
const subtractMonths =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate => {
    if (value === 0) return sDt;
    const date = Simply.to.date(sDt);
    date.setMonth(date.getMonth() - value);
    return Simply.from.date(date);
  };

// &&&&&&& //subtraction

// &&&&&&& addition
/**
 * Add
 * @param value
 */
const addYears =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate => {
    if (value === 0) return sDt;

    const date = Simply.to.date(sDt);
    date.setFullYear(date.getFullYear() + value);

    return Simply.from.date(date);
  };

const addMonths =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate => {
    if (value === 0) return sDt;

    const date = Simply.to.date(sDt);
    date.setMonth(date.getMonth() + value);
    return Simply.from.date(date);
  };

const addDays =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate =>
    addMilliseconds(value * 86400000)(sDt);

const addMilliseconds =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate => {
    if (value === 0) return sDt;

    const curMs = Simply.to.date(sDt).getTime();

    return fromMsSinceEpoch(curMs + value);
  };

const addSeconds =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate =>
    addMilliseconds(value * 1000)(sDt);

const addMinutes =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate =>
    addMilliseconds(value * 60000)(sDt);

const addHours =
  (value: number) =>
  (sDt: Readonly<SimplyDate>): SimplyDate =>
    addMilliseconds(value * 3600000)(sDt);
// &&&&&&& // addition

const DATETIME_LOCAL = "YYYY-MM-DDTHH:mm";
const pad = (num: number): string => (num < 10 ? `0${num}` : `${num}`);
const padMs = (num: number): string => {
  if (num < 10) {
    return `00${num}`;
  }
  if (num < 100) {
    return `0${num}`;
  }
  return `${num}`;
};

const getYearByFormat = {
  YY: (year: number) => (year > 2000 ? pad(year - 2000) : year),
  YYYY: (year: number) => year,
};

const getLocMonth = (month: number, _format: string) =>
  Localization.MONTHS[_format][month - 1];

const simplyDateToStringByFormatMap = {
  ["YYYY-MM-DDTHH:mm"]: ({ year, month, day, hour, minute }: SimplyDate) =>
    `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}`,
  ["YYYY-MM-DDTHH:mm:ss"]: ({
    year,
    month,
    day,
    hour,
    minute,
    second,
  }: SimplyDate) =>
    `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}`,
  ["YYYY-MM-DDTHH:mm:ss.SSS"]: ({
    year,
    month,
    day,
    hour,
    minute,
    second,
    millisecond,
  }: SimplyDate) =>
    `${year}-${pad(month)}-${pad(day)}T${pad(hour)}:${pad(minute)}:${pad(second)}.${padMs(millisecond)}`,
  ["YYYY-MM-DD"]: ({ year, month, day }) => `${year}-${pad(month)}-${pad(day)}`,
  ["HH:mm"]: ({ hour, minute }: SimplyDate) => `${pad(hour)}:${pad(minute)}`,
  ["HH:mm:ss"]: ({ hour, minute, second }: SimplyDate) =>
    `${pad(hour)}:${pad(minute)}:${pad(second)}`,
  ["YY MMM DD h:mm A"]: ({ year, month, day, hour, minute }: SimplyDate) => {
    const amPm = hour > 12 ? "PM" : "AM";
    return `${getYearByFormat.YY(year)} ${getLocMonth(month, "MMM")} ${pad(day)} ${hour % 12}:${minute} ${amPm}`;
  },
  ["MM/DD/YYYY"]: ({ year, month, day }: SimplyDate) =>
    `${pad(month)}/${pad(day)}/${year}`,
  ["DD/MM/YYYY"]: ({ year, month, day }: SimplyDate) =>
    `${pad(day)}/${pad(month)}/${year}`,
  ["MM/DD/YYYY HH:mm"]: ({ year, month, day, hour, minute }: SimplyDate) =>
    `${pad(month)}/${pad(day)}/${year} ${pad(hour)}:${pad(minute)}`,
  ["DD/MM/YYYY HH:mm"]: ({ year, month, day, hour, minute }: SimplyDate) =>
    `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)}`,
  ["MM/DD/YYYY HH:mm:ss"]: ({
    year,
    month,
    day,
    hour,
    minute,
    second,
  }: SimplyDate) =>
    `${pad(month)}/${pad(day)}/${year} ${pad(hour)}:${pad(minute)}:${pad(second)}`,
  ["DD/MM/YYYY HH:mm:ss"]: ({
    year,
    month,
    day,
    hour,
    minute,
    second,
  }: SimplyDate) =>
    `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)}:${pad(second)}`,
  ["MMM DD, YYYY"]: ({ year, month, day }: SimplyDate) =>
    `${Localization.MONTHS.MMM[month]} ${pad(day)}, ${pad(year)}`,
};

const dateTimeStringFromPattern = {
  "MM-DD-YYYY": (dt: string): SimplyDate => {
    const data = dt.split("-");
    return {
      year: Number.parseInt(data[2], 10),
      month: Number.parseInt(data[0], 10),
      day: Number.parseInt(data[1], 10),
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };
  },
};

const fromDate = (dt: Readonly<Date>): SimplyDate => {
  if (!dt) {
    throw new Error("Date must be specified");
  }

  return {
    year: dt.getFullYear(),
    month: dt.getMonth() + 1,
    day: dt.getDate(),
    hour: dt.getHours(),
    minute: dt.getMinutes(),
    second: dt.getSeconds(),
    millisecond: dt.getMilliseconds(),
  };
};

/**
 * From Unix epoch
 * @param dt 1514851200000
 */
const fromMsSinceEpoch = (dt: number): SimplyDate => fromDate(new Date(dt));

/**
 *
 * @param {string} dt a string of type 2015-02-29T03:24:00
 * @param {string} pattern
 * @returns {SimplyDate}
 */
const fromString = (dt: string, pattern?: string): SimplyDate => {
  if (!dt || typeof pattern !== "string") {
    throw new Error("Date string parameter not specified");
  }
  if (pattern) {
    if (!dateTimeStringFromPattern[pattern]) {
      throw new Error(`Date pattern ${pattern} is not supported`);
    }
    return dateTimeStringFromPattern[pattern](dt);
  }
  return fromDate(new Date(dt));
};

/**
 * Converts an instance of SimplyDate to Date.
 * @param sDt
 */
const toDate = (sDt: Readonly<SimplyDate>): Date | undefined => {
  if (!sDt) {
    return undefined;
  }

  return new Date(
    sDt.year,
    sDt.month - 1,
    sDt.day,
    sDt.hour,
    sDt.minute,
    sDt.second,
    sDt.millisecond,
  );
};

/**
 * Returns the number of milliseconds in a SimplyDate object since January 1, 1970, 00:00:00, universal time.
 * Equivalent to getTime of the JavaScript Date object.
 * @param {SimplyDate} sDt
 * @param timezoneOffsetMinutes number (optional)
 * @returns {number}
 */
const toMsSinceEpoch = (
  sDt: Readonly<SimplyDate>,
  timezoneOffsetMinutes?: number,
): number => {
  if (timezoneOffsetMinutes == null) {
    const dt = new Date();
    timezoneOffsetMinutes = dt.getTimezoneOffset();
  }

  const _sdt = Simply.add(timezoneOffsetMinutes).minutes.to(sDt);
  return Date.UTC(
    _sdt.year,
    _sdt.month - 1,
    _sdt.day,
    _sdt.hour,
    _sdt.minute,
    _sdt.second,
    _sdt.millisecond,
  );
};

const to = {
  date: toDate,
  msSinceEpoch: toMsSinceEpoch,
};

const from = {
  date: fromDate,
  msSinceEpoch: fromMsSinceEpoch,
  string: fromString,
};

const now = (): SimplyDate => {
  return from.date(new Date());
};

const add = (value: number) => ({
  years: {
    to: addYears(value),
  },
  months: {
    to: addMonths(value),
  },
  days: {
    to: addDays(value),
  },
  hours: {
    to: addHours(value),
  },
  minutes: {
    to: addMinutes(value),
  },
  seconds: {
    to: addSeconds(value),
  },
  milliseconds: {
    to: addMilliseconds(value),
  },
});

const subtract = (value: number) => ({
  years: {
    from: subtractYears(value),
  },
  months: {
    from: subtractMonths(value),
  },
  days: {
    from: addDays(-value),
  },
  hours: {
    from: addHours(-value),
  },
  minutes: {
    from: addMinutes(-value),
  },
  seconds: {
    from: addSeconds(-value),
  },
  milliseconds: {
    from: addMilliseconds(-value),
  },
});

type TimeFormatOptions = ConstructorParameters<typeof Intl.DateTimeFormat>;

const format = (sDt: Readonly<SimplyDate>) => ({
  as: (
    _format:
      | string
      | { locale: TimeFormatOptions[0]; options: TimeFormatOptions[1] },
  ): string => {
    if (!_format) {
      return simplyDateToStringByFormatMap[DATETIME_LOCAL](sDt);
    }

    if (typeof _format === "object") {
      const date = new Intl.DateTimeFormat(
        _format.locale ?? "default",
        _format.options,
      );
      return date.format(Simply.to.date(sDt));
    }

    const formatFn = simplyDateToStringByFormatMap[_format];
    if (formatFn) {
      return formatFn(sDt);
    }

    return simplyDateToStringByFormatMap[DATETIME_LOCAL](sDt);
  },
});

const getTimeZoneOffsetMs = (): number => {
  return new Date().getTimezoneOffset();
};

export const Simply = {
  now,
  to,
  add,
  subtract,
  from,
  getTimeZoneOffsetMs,
  format,
};
