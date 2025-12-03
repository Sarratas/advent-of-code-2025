import fs from 'node:fs';


const exec = async () => {
    const data = fs.readFileSync('./task2/2.2/data.txt', 'utf8');

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
    for (let l = 1; l <= length / 2; ++l) {
        if (length % l) {
            continue;
        }
        const part = numS.slice(0, l);
        if (containsOnlyPart(part, numS)) {
            return true;
        }
    }
}

const containsOnlyPart = (part, numS) => {
    for (let i = 0; i < numS.length; i += part.length) {
        if (part != numS.slice(i, i + part.length)) {
            return false;
        }
    }
    
    return true;
}

exec();