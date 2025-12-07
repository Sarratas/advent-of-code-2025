import fs from 'node:fs';

const exec = async () => {
    const data = fs.readFileSync('./task7/7.1/data.txt', 'utf8');

    const rows = data.trim().split("\n").map(e => e.split(''));
    const rays = new Map();
    const startingPos = rows[0].findIndex(e => e === "S");
    rays.set(startingPos, 1);

    for (const row of rows.slice(0)) {
        row.forEach((char, index) => { 
            if (char === "^" && rays.has(index)) {
                rays.set(index - 1, rays.get(index) + (rays.get(index - 1) ?? 0));
                rays.set(index + 1, rays.get(index) + (rays.get(index + 1) ?? 0));
                rays.delete(index);
            }
        });
    }

    const result = Array.from(rays.values()).reduce((acc, value) => acc + value, 0);
    console.log(result);
}

exec();