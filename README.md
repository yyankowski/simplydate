# SimplyDate

This is a basic functional, non-mutating date-time manipulation library implemented in Typescript. It supports time zones and is suitable for simple and basic date formatting and manipulation. Please note that this library is a personal project and is not ready for production use. _Use it at your own risk_.

## Installation:

NPM

```
npm install --save simplydate
```

Yarn

```
yarn add simplydate
```

## Usage Examples:

```
import {Simply} from "simplydate"
```

**Type definition**

```typescript
type SimplyDate = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  millisecond: number;
};
```

**Ways to initialize:**

```typescript
const simpleDate = Simply.from.date(new Date(`2015-02-29T03:24:00`));
const simpleDateFromMs = Simply.from.msSinceEpoch(1515035460000);
const simpleDateFromString = Simply.from.string("12-25-1995", "MM-DD-YYYY");
const nowDate = Simply.now();
```

**Accessing properties:**

```typescript
console.log(nowDate.day);
console.log(simpleDate.month);
```

**Addition:**

```typescript
const newSimpleDate1 = Simply.add(2).days.to(simpleDate);
const newSimpleDate2 = Simply.add(12).months.to(newSimpleDate1);
```

**Subtraction:**

```typescript
const newSimpleDate1 = Simply.subtract(10).seconds.from(simpleDate);
const newSimpleDate2 = Simply.subtract(12).months.from(simpleDate);
```

**Output to string**

```typescript
const simpleDate = Simply.from.date(new Date(`2017-03-01T03:24:00`));
Simply.format(simpleDate).as("YYYY-MM-DDTHH:mm:ss") === "2017-03-01T03:24:00";
Simply.format(simpleDate).as("YYYY-MM-DD") === "2017-03-01";
```

**With timezones**
see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

```typescript
const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
            };
Simply.format(sDt).as({ locale: "de-DE", options })) === "Mittwoch, 29. März 2017"
```

**The following date formats are supported:**

```typescript
// ISO 8601 format with milliseconds
'YYYY-MM-DDTHH:mm:ss.SSS' => '2017-03-01T03:24:00.000'
// ISO 8601 format without milliseconds
'YYYY-MM-DDTHH:mm:ss' => '2017-03-01T03:24:00'
// ISO 8601 with minutes only
'YYYY-MM-DDTHH:mm' => '2017-03-01T03:24'

// Date-only formats
'YYYY-MM-DD' => '2017-03-01'
'MM/DD/YYYY' => '03/01/2017'
'DD/MM/YYYY' => '01/03/2017'
'MMMM DD, YYYY' => 'March 01, 2017'
'MMM DD, YYYY' => 'Mar 01, 2017'

// Time-only formats
'HH:mm' => '03:24'
'HH:mm:ss' => '13:24:00'
'hh:mm A' => '3:24 PM'
'hh:mm:ss.SSS A' => '01:24:45.123 PM'

// Custom Date-Time with AM/PM
'YY MMM DD h:mm A' => '17 Mar 29 3:24 AM'
'MMMM Do, YYYY [at] h:mm A' => 'March 29th, 2017 at 3:24 AM'

// Date and Time combined
'MM/DD/YYYY HH:mm' => '03/01/2017 03:24'
'DD/MM/YYYY HH:mm:ss' => '01/03/2017 13:24:00'

// Week and Day-of-Year formats
'DDD YYYY' => '88 2017' // Day of year

// 12-hour with optional AM/PM
'hh:mm A' => '3:24 AM'

// Full Date with day of the week
'dddd, MMMM Do YYYY' => 'Wednesday, March 29th 2017'

// ISO 8601 UTC format
'YYYY-MM-DDTHH:mm:ss.SSSZ' => '2017-03-29T13:24:45.123Z'
```

**Get milliseconds since Unix Epoch till now.**

```typescript
Simply.to.msSinceEpoch(Simply.now());
```
