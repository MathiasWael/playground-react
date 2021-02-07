function GenerateElements(rect) {
    const leftoverLeft = (rect.width - 450) / 2;
    const leftoverTop = (rect.height - 450) / 2;

    const elements = [];
    for (let indexRow = 0; indexRow < 9; indexRow++) {
        const topPos = rect.bottom - ((indexRow + 1) * 50) - leftoverTop;
        for (let indexCol = 0; indexCol < 9; indexCol++) {
            const leftPos = (indexCol * 50) + leftoverLeft;
            elements.push({
                key: indexRow + ":" + indexCol,
                row: indexRow,
                col: indexCol,
                leftPos: leftPos,
                topPos: topPos,
                value: null,
                notes: [],
                default: true
            })
        }
    }

    for (let index = 0; index < elements.length; index++) {
        if(elements[index].row < 3) {
            if(elements[index].col < 3) {
                elements[index].quadrant = 1;
            }
            else if(elements[index].col < 6) {
                elements[index].quadrant = 2;
            }
            else {
                elements[index].quadrant = 3;
            }
        }
        else if(elements[index].row < 6) {
            if(elements[index].col < 3) {
                elements[index].quadrant = 4;
            }
            else if(elements[index].col < 6) {
                elements[index].quadrant = 5;
            }
            else {
                elements[index].quadrant = 6;
            }
        }
        else {
            if(elements[index].col < 3) {
                elements[index].quadrant = 7;
            }
            else if(elements[index].col < 6) {
                elements[index].quadrant = 8;
            }
            else {
                elements[index].quadrant = 9;
            }
        }
    }

    
    const randomIndexes = [];
    for (let index = 0; index < 9; index++) {
        randomIndexes.push(Math.floor(Math.random() * 100));
    }

    const sudokuNumbers = [1,2,3,4,5,6,7,8,9];
    let randomRowNumbers = [];
    for (let index = 0; index < 9; index++) {
        let chosenIndex = 0;
        let highest = randomIndexes[0];

        for (let index = 0; index < randomIndexes.length; index++) {
            if(randomIndexes[index] > highest) {
                highest = randomIndexes[index];
                chosenIndex = index;
            }
        }
        
        randomRowNumbers.push(sudokuNumbers[chosenIndex]);
        randomIndexes.splice(chosenIndex, 1);
        sudokuNumbers.splice(chosenIndex, 1);
    }

    const shiftNumbers = [3,3,1,3,3,1,3,3];
    for (let indexOuter = 0; indexOuter < 9; indexOuter++) {
        for (let index = 0; index < 9; index++) {
            elements[(indexOuter * 9) + index].value = randomRowNumbers[index];
            elements[(indexOuter * 9) + index].solution = randomRowNumbers[index];
        }
        if(indexOuter === 8) {
            break;
        }
        const shiftAmount = shiftNumbers.pop();
        const tmpShift = randomRowNumbers.splice(0, shiftAmount);
        randomRowNumbers = randomRowNumbers.concat(tmpShift);
    }

    let removeAmount = 50;
    while(removeAmount > 0) {
        const removeIndex = Math.floor(Math.random() * 81);
        const item = elements[removeIndex];
        if(!item.value) {
            continue;
        }
        item.value = null;
        item.default = false;
        removeAmount--;
    }

    return elements;
}

export { GenerateElements }