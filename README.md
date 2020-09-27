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

```
const simpleDate = Simply.from.date(new Date(`2015-02-29T03:24:00`));

```
Addition:
```
const newSimpleDate1 = Simply.add(2).days.to(simpleDate);
const newSimpleDate2 = Simply.add(12).months.to(simpleDate);
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
Get milliseconds since Unix Epoch till now.
```
Simply.to.msSinceEpoch(Simply.now())
```
