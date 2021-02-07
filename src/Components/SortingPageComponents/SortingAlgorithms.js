import { cloneDeep } from "lodash";

async function InsertionSort(sortingElements, setSortingElements, setCurrentlySorting) {
    let tempElements = cloneDeep(sortingElements);

    for (let index = 1; index < tempElements.length; index++) {
        let currentTarget = tempElements[index];

        colorElement(true, currentTarget.identifier)
        await sleep(getDelay());

        let currentIndex = index;
        while((currentIndex > 0) && tempElements[currentIndex].height < tempElements[currentIndex - 1].height) {
            let tmp = tempElements[currentIndex - 1];
            tempElements[currentIndex - 1] = tempElements[currentIndex];
            tempElements[currentIndex] = tmp;

            swapElements(tmp, tempElements[currentIndex - 1]);
            await sleep(getDelay());
            currentIndex--;
        }
        colorElement(false, currentTarget.identifier)
    }

    setSortingElements(tempElements);
    setCurrentlySorting(false);
}

async function SelectionSort(sortingElements, setSortingElements, setCurrentlySorting) {
    let tempElements = cloneDeep(sortingElements);

    for (let index = 0; index < tempElements.length; index++) {
        let min = index;
        let currentTarget = tempElements[index];
        colorElement(true, currentTarget.identifier)
        await sleep(getDelay());

        for (let i = index + 1; i < tempElements.length; i++) {
            colorElement(true, tempElements[i].identifier)
            await sleep(getDelay());

            if(tempElements[i].height < tempElements[min].height) {
                min = i;
            }
            colorElement(false, tempElements[i].identifier)
        }
        if(min !== index) {
            let tmp = tempElements[index];
            tempElements[index] = tempElements[min];
            tempElements[min] = tmp;

            swapElements(tmp, tempElements[index])
        }

        colorElement(false, currentTarget.identifier)
    }

    setSortingElements(tempElements);
    setCurrentlySorting(false);
}

async function BubbleSort(sortingElements, setSortingElements, setCurrentlySorting) {
    let tempElements = cloneDeep(sortingElements);
    let length = tempElements.length - 1;
    let swap = false;

    do {
        swap = false;
        for (let index = 0; index < length; index++) {
            let currentTarget = tempElements[index];
            //currentTarget.active = true;
            let nextTarget = tempElements[index + 1];
            //nextTarget.active = true;

            colorElement(true, currentTarget.identifier)
            colorElement(true, nextTarget.identifier)
            //setSortingElements(tempElements);
            await sleep(getDelay());

            if(tempElements[index].height > tempElements[index + 1].height) {
                swap = true;
                let tmp = tempElements[index];
                tempElements[index] = tempElements[index + 1];
                tempElements[index + 1] = tmp;

                swapElements(tmp, tempElements[index])
            }
            // currentTarget.active = false;
            // nextTarget.active = false;
            colorElement(false, currentTarget.identifier)
            colorElement(false, nextTarget.identifier)
        }
        length--;
    } while (swap)
    
    setSortingElements(tempElements);
    setCurrentlySorting(false);
}

function swapElements(item1, item2) {
    const tmp = item1.left;
    item1.left = item2.left;
    item2.left = tmp;
    
    document.getElementById(item1.identifier).style.left = item1.left + "px"
    document.getElementById(item2.identifier).style.left = item2.left + "px"
}

function colorElement(active, key) {
    if(active) {
        document.getElementById(key).style.backgroundColor = "#c5812c";
    }
    else {
        document.getElementById(key).style.backgroundColor = "#002d47";
    }
}

function getDelay() {
    const test = document.getElementsByClassName("MuiSlider-thumb");
    if(test.length === 0) return 100;
    
    const slider = document.getElementsByClassName("MuiSlider-thumb")[0].getAttribute("aria-valuenow");
    if(slider) {
        return slider;
    }
    return 100;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { InsertionSort, BubbleSort, SelectionSort };