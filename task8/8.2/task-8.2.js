import fs from 'node:fs';

const calcDist = (a, b) => {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2;
}

const data = fs.readFileSync('./task8/8.2/data.txt', 'utf8');

const rows = data
    .trim()
    .split(/\r?\n/)
    .map(e => e.split(','))
    .map(([x, y, z], index) => ({ x: Number(x), y: Number(y), z: Number(z), circuit: index }));

const pairs = [];
for (let i = 0; i < rows.length - 1; ++i) {
    for (let j = i + 1; j < rows.length; ++j) {
        pairs.push({ i, j, dist: calcDist(rows[i], rows[j])});
    }
}
pairs.sort((a, b) => a.dist - b.dist);

let lastPair = {};
for (const {i, j } of pairs) {
    if (rows[i].circuit === rows[j].circuit) continue;

    lastPair = { i, j };
    const circuit = rows[i].circuit;
    rows[i].circuit = circuit;
    rows.filter(row => row.circuit == rows[j].circuit).forEach(row => row.circuit = circuit);
    rows[j].circuit = circuit;
}

const result = rows[lastPair.i].x * rows[lastPair.j].x;
console.log(result);