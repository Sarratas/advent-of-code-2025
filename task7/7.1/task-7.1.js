import fs from 'node:fs';

const exec = async () => {
    const data = fs.readFileSync('./task7/7.1/data.txt', 'utf8');

    const rows = data.trim().split("\n").map(e => e.split(''));
    const rays = new Set();
    const startingPos = rows[0].findIndex(e => e === "S");
    rays.add(startingPos);

    let result = 0;
    for (const row of rows.slice(0)) {
        row.forEach((char, index) => { 
            if (char === "^" && rays.has(index)) {
                rays.add(index - 1);
                rays.add(index + 1);
                rays.delete(index);
                result += 2;
            }
        });
    }

    console.log(result);
}

exec();