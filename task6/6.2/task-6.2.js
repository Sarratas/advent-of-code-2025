import fs from 'node:fs';

const exec = async () => {
    const data = fs.readFileSync('./task6/6.2/data.txt', 'utf8');

    const rows = data.split("\n").map(line => line.split(''));
    let calculationIndex = 0;
    const calculations = [];
    for (let j = 0; j < rows[0].length; ++j) {
        let number = '';
        let hasContent = false;
        if (!calculations[calculationIndex]) {
            calculations[calculationIndex] = [];
        }
        
        for (let i = 0; i < rows.length; ++i) {
            const value = rows[i][j];
            if (value == ' ')  {
                continue;
            } else {
                hasContent = true;
            }
            if (['*', '+'].includes(rows[i][j])) {
                calculations[calculationIndex].push(rows[i][j]);
                continue;
            }
            
            number += rows[i][j];
        }
        
        if (!hasContent) {
            calculationIndex += 1;
            continue;
        }
        calculations[calculationIndex].push(number);
    }

    const results = calculations.map(operators => {
        const operation = operators[0];
        const numbers = operators.slice(1).map(Number);

        let result = numbers[0];
        for (const number of numbers.slice(1)) {
            result = operation === '*' ? result * number : result + number;
        }
        return result;
    });

    const result = results.reduce((acc, result) => acc + result);

    console.log(result);
}

exec();