import fs from 'node:fs';

const data = fs.readFileSync('./task6/6.1/data.txt', 'utf8');

const rows = data.trim().split(/\r?\n/).map(line => line.split(/\s+/));
const calculations = [];
rows.forEach((row) => {
    row.forEach((value, index) => {
        if (!calculations[index]) {
            calculations[index] = [];
        }
        calculations[index].push(value);
    })
});

const results = calculations.map(operators => {
    const operation = operators.slice(-1)[0];
    const numbers = operators.slice(0, -1).map(Number);
    let result = numbers[0];
    for (const number of numbers.slice(1)) {
        result = operation === '*' ? result * number : result + number;
    }
    return result;
})

const result = results.reduce((acc, result) => acc + result);

console.log(result);
