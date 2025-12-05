import fs from 'node:fs';

const exec = async () => {
    const data = fs.readFileSync('./task5/5.2/data.txt', 'utf8');

    const ranges = data.split("\n").map(line => {
        const [start, end] = line.split("-").map(Number);
        return { start, end };
    });

    let distinctRanges = [];
    for (const range of ranges) {
        const overlapping = distinctRanges.reduce((acc, d, index) => {
            if (overlaps(d, range)) {
                acc.indexes.push(index);
                acc.ranges.push(d);
            }
            return acc;
        }, { indexes: [], ranges: []});

        if (overlapping.indexes.length === 0) {
            distinctRanges.push(range);
        } else {
            distinctRanges = distinctRanges.filter((_, i) => !overlapping.indexes.includes(i))
            distinctRanges.push({
                start: Math.min(...[range, ...overlapping.ranges].map(r => r.start)),
                end: Math.max(...[range, ...overlapping.ranges].map(r => r.end))
            });
        }
    }

    const result = distinctRanges.reduce((acc, range) => acc + range.end - range.start + 1, 0);

    console.log(result);
}

const overlaps = (range1, range2) => {
    return range2.start <= range1.start && range2.end >= range1.start
        || range2.start <= range1.end && range2.end >= range1.end
        || range2.start >= range1.start && range2.end <= range1.end;
}

exec();