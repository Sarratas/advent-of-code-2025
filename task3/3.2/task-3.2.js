import fs from 'node:fs';


const exec = async () => {
    const data = fs.readFileSync('./task3/3.2/data.txt', 'utf8');

    const rows = data.split("\r\n");

    let result = 0;
    for (const row of rows) {
        let maxes = [], maxIndexes = [];
        let sum = "";
        for (let limit = 11, i = 0; limit >= 0; --limit, ++i) {
            const [ max, maxIndex ] = findMax(i != 0 ? maxIndexes[i - 1] + 1 : 0, row.length - limit, row);
            maxes.push(max);
            maxIndexes.push(maxIndex);

            sum += max; // concat
        }

        result += Number(sum);
    }


    console.log(result);
}

const findMax = (start, end, str) => {
    let max = 0;
    let maxIndex = 0;
    for (let i = start; i < end; ++i) {
        if (str.at(i) > max) {
            max = str.at(i)
            maxIndex = i;
        }
    }

    return [ max, maxIndex ]
}

exec();