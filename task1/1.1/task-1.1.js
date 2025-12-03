import fs from 'node:fs';

const exec = async () => {
    const data = fs.readFileSync('./task1/1.1/data.txt', 'utf8');

    const rows = data.split("\n");
    console.log(rows);

    let value = 50;
    let result = 0;
    for (const row of rows) {
        const direction = row.at(0);
        const amount = Number(row.slice(1));
        value = direction == "L" ? value - amount : value + amount;
        value = value % 100;
        if (value < 0) {
            value = 100 + value;
        }

        if (value === 0) {
            result += 1;
        }
    }

    console.log(result);
}

exec();