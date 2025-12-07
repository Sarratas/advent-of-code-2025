import fs from 'node:fs';

const data = fs.readFileSync('./task5/5.1/data.txt', 'utf8');

const [data1, data2] = data.split(/\r?\n\r?\n/);
const ranges = data1.split(/\r?\n/).map(line => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
});
const available = data2.split(/\r?\n/).map(Number);

let result = 0;
for (const item of available) {
    result += +ranges.some(range => range.start <= item && range.end >= item);
}

console.log(result);
