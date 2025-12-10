import fs from 'node:fs';

const data = fs.readFileSync('./task9/9.1/data.txt', 'utf8');

const rows = data
    .trim()
    .split(/\r?\n/)
    .map(e => e.split(','))
    .map(([x, y]) => ({ x, y }));

rows.sort((rowA, rowB) => rowA.x != rowB.x ? rowA.x - rowB.x : rowA.y - rowB.y);
let maxArea = 0;
for (let i = 0; i < rows.length - 1; ++i) {
    for (let j = i + 1; j < rows.length; ++j) {
        const area = (Math.abs(rows[j].x - rows[i].x) + 1) * (Math.abs(rows[j].y - rows[i].y) + 1);
        maxArea = Math.max(area, maxArea);
    }
}
console.log(maxArea);
