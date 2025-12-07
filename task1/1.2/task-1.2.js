import fs from 'node:fs';

const getChange = (direction, amount, value) => {
    if (value != 0) {
        if (direction == "L") return Math.min(amount, value)
        else return Math.min(amount, 100 - value);
    } else {
        return Math.min(amount, 100)
    }
}

const data = fs.readFileSync('./task1/1.2/data.txt', 'utf8');

const rows = data.split(/\r?\n/);
console.log(rows);

let value = 50;
let result = 0;
for (const row of rows) {
    const direction = row.at(0);
    let amount = Number(row.slice(1));
    while (amount) {
        const change = getChange(direction, amount, value);
        value = direction == "L" ? value - change : value + change;
        amount -= change;
        value = value % 100;
        if (value < 0) {
            value = 100 + value;
        }
        if (value === 0) {
            result += 1;
        }
    }
}

console.log(result);
