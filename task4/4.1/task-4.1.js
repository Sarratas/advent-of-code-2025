import fs from 'node:fs';

const exec = async () => {
    const data = fs.readFileSync('./task4/4.1/data.txt', 'utf8');

    const arr = data.split("\r\n").map(row => row.split(''));

    let result = 0;
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < arr[i].length; ++j) {
            if (arr[i][j] != '@') continue;

            if (countAdj(arr, i, j) < 4) {
                result += 1;
            }
        }
    }

    console.log(result);
}

const countAdj = (arr, row, column) => {
    let res = 0;
    for (let i = row - 1; i <= row + 1; ++i) {
        for (let j = column - 1; j <= column + 1; ++j) {
            if (i == row && j == column) continue;
            if (i < 0 || i >= arr.length) continue;
            if (j < 0 || j >= arr[0].length) continue;
            if (arr[i][j] == '@') res += 1;
        }
    }

    return res;
}

exec();