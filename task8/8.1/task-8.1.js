import fs from 'node:fs';

const calcDist = (a, b) => {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
}

const data = fs.readFileSync('./task8/8.1/data.txt', 'utf8');

const rows = data
    .trim()
    .split(/\r?\n/)
    .map(e => e.split(','))
    .map(([x, y, z], index) => ({ x: Number(x), y: Number(y), z: Number(z), circuit: index + 1 }));

const pairs = [];
for (let i = 0; i < rows.length - 1; ++i) {
    for (let j = i + 1; j < rows.length; ++j) {
        pairs.push({ i, j, dist: calcDist(rows[i], rows[j])});
    }
}
pairs.sort((a, b) => a.dist - b.dist);

let iterations = 1000;
for (const { i, j } of pairs) {
    if (iterations-- == 0) {
        break;
    }

    if (rows[i].circuit === rows[j].circuit) continue;

    const circuit = rows[i].circuit;
    rows[i].circuit = circuit;
    rows.filter(row => row.circuit == rows[j].circuit).forEach(row => row.circuit = circuit);
    rows[j].circuit = circuit;
}

const groups = rows.reduce((acc, row) => {
    if (!acc[row.circuit]) {
        acc[row.circuit] = 0;
    }
    acc[row.circuit] += 1;
    return acc;
}, {});

const groupsSorted = Object.values(groups);
groupsSorted.sort((a, b) => b - a);

const result = groupsSorted
    .slice(0, 3)
    .reduce((acc, v) => acc * v, 1);

console.log(result);
