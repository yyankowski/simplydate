# simplidate
A simple functional date-time manipulation library implemented in Typescript.

Usage:

```
const simpleDate = Simply.from(new Date(`2015-02-29T03:24:00`));

```
Addition:
```
const newSimpleDate1 = Simply.add(2).days.to(sDt);
const newSimpleDate2 = Simply.add(12).months.to(sDt);
```
Subtraction:
```
const newSimpleDate1 = Simply.subtract(10).seconds.from(sDt);
const newSimpleDate2 = Simply.subtract(12).months.from(sDt);
```
Output to string
```
Simply.format(sDt).as("YYYY-MM-DDTHH:mm:ss") === "2017-03-01T03:24:00"
Simply.format(sDt).as("YYYY-MM-DD") === "2017-03-01"
```