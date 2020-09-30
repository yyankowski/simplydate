# SimplyDate
A basic functional, non-mutating date-time manipulation library implemented in Typescript.
It doesn't support time zones and is useful if you need basic and simple date formatting and manipulation.
The library is a personal project and not ready for production! 
Use at your own risk.

Installation:

NPM
```
npm install --save simplydate
```

Yarn
```
yarn add simplydate
```

##Usage Examples:

````
import {Simply} from "simplydate"
````

Type definition
```
type SimplyDate = {
    year: number,
    month: number,
    day: number,
    hour: number,
    minute: number,
    second: number,
    millisecond: number
}
```

Initialize:
```
const simpleDate = Simply.from.date(new Date(`2015-02-29T03:24:00`));
const nowDate = Simply.now();
```

Accessing properties:
```
console.log(nowDate.day);
console.log(simpleDate.month);
```

Addition:
```
const newSimpleDate1 = Simply.add(2).days.to(simpleDate);
const newSimpleDate2 = Simply.add(12).months.to(newSimpleDate1);

```
Subtraction:
```
const newSimpleDate1 = Simply.subtract(10).seconds.from(simpleDate);
const newSimpleDate2 = Simply.subtract(12).months.from(simpleDate);
```
Output to string
```
Simply.format(sDt).as("YYYY-MM-DDTHH:mm:ss") === "2017-03-01T03:24:00"
Simply.format(sDt).as("YYYY-MM-DD") === "2017-03-01"
```

Supported formats:
```
'YYYY-MM-DDTHH:mm:ss.SSS' => '2017-03-01T03:24:00.000'
'YYYY-MM-DDTHH:mm:ss' => '2017-03-01T03:24:00'
'YYYY-MM-DDTHH:mm' => '2017-03-01T03:24'

'YYYY-MM-DD' => '2017-03-01'
'HH:mm' => '03:24'
'HH:mm:ss' => '13:24:00'

'YY MMM DD h:mm A' => '17 Mar 29 3:24 AM'
'YY MMM DD h:mm A' => '17 Mar 29 3:24 AM'
```

Get milliseconds since Unix Epoch till now.
```
Simply.to.msSinceEpoch(Simply.now())
```
