import fs from 'node:fs';

const exec = async () => {
    const data = fs.readFileSync('./task2/2.1/data.txt', 'utf8');

    const rows = data.split(",");

    let result = 0;
    for (const row of rows) {
        const [startS, endS] = row.split("-");
        let start = Number(startS);
        let end = Number(endS);

        for (let i = start; i <= end; ++i) {
            if (check(i)) {
                result += i;
            }
        }
    }

    console.log(result);
}

const check = (num) => {
    const numS = String(num);
    const length = numS.length;
    if (length % 2) {
        return false;
    }

    const first = numS.slice(0, length / 2);
    const last = numS.slice(length / 2);

    return first == last;
}

exec();