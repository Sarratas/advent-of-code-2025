import fs from 'node:fs';

const findMax = (start, end, str) => {
    let max = 0;
    let maxIndex = 0;
    for (let i = start; i < end; ++i) {
        if (str.at(i) > max) {
            max = str.at(i)
            maxIndex = i;
        }
    }

    return [ max, maxIndex ]
}

const data = fs.readFileSync('./task3/3.1/data.txt', 'utf8');

const rows = data.split(/\r?\n/);

let result = 0;
for (const row of rows) {
    const [ max, maxIndex ] = findMax(0, row.length - 1, row);
    const [ max2 ] = findMax(maxIndex + 1, row.length, row);

    const sum = Number(max + max2); // concat
    result += sum;
}

console.log(result);
