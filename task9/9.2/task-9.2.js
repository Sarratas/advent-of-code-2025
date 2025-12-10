import fs from 'node:fs';

const getXY = (row1, row2) => {
    const x1 = Math.min(row1.x, row2.x);
    const x2 = Math.max(row1.x, row2.x);
    const y1 = Math.min(row1.y, row2.y);
    const y2 = Math.max(row1.y, row2.y);

    return [x1, x2, y1, y2];
}

const hasLinesInside = (rows, x1, x2, y1, y2) => {
    for (let i = -1; i < rows.length - 1; ++i) {
        const [lx1, lx2, ly1, ly2] = getXY(rows.at(i), rows.at(i + 1))

        if (lx1 < x2 && lx2 > x1 && ly1 < y2 && ly2 > y1) {
            return true;
        }
    }

    return false;
}

const data = fs.readFileSync('./task9/9.2/data.txt', 'utf8');

const rows = data
    .trim()
    .split(/\r?\n/)
    .map(e => e.split(','))
    .map(([x, y]) => ({ x: Number(x), y: Number(y) }));

let maxArea = 0;
for (let i = -1; i < rows.length - 1; ++i) {
    for (let j = i + 1; j < rows.length; ++j) {
        const [x1, x2, y1, y2] = getXY(rows.at(i), rows.at(j));
        const area = (x2 - x1 + 1) * (y2 - y1 + 1);

        if (area <= maxArea) continue;
        if (hasLinesInside(rows, x1, x2, y1, y2)) continue;

        maxArea = area;
    }
}

console.log(maxArea);
