async function InsertionSort(sortingElements, setSortingElements, setCurrentlySorting) {
    let tempElements = [...sortingElements];

    for (let index = 1; index < tempElements.length; index++) {
        let currentTarget = tempElements[index];
        currentTarget.active = true;
        setSortingElements(tempElements);
        await sleep(getDelay());

        let currentIndex = index;
        while((currentIndex > 0) && tempElements[currentIndex].height < tempElements[currentIndex - 1].height) {
            let tmp = tempElements[currentIndex - 1];
            tempElements[currentIndex - 1] = tempElements[currentIndex];
            tempElements[currentIndex] = tmp;

            setSortingElements(tempElements);
            await sleep(getDelay());
            currentIndex--;
        }

        currentTarget.active = false;
    }

    setCurrentlySorting(false);
}

async function SelectionSort(sortingElements, setSortingElements, setCurrentlySorting) {
    let tempElements = [...sortingElements];

    for (let index = 0; index < tempElements.length; index++) {
        let min = index;

        let currentTarget = tempElements[index];
        currentTarget.active = true;
        setSortingElements(tempElements);
        await sleep(getDelay());

        for (let i = index + 1; i < tempElements.length; i++) {
            tempElements[i].active = true;
            setSortingElements(tempElements);
            await sleep(getDelay());

            if(tempElements[i].height < tempElements[min].height) {
                min = i;
            }
            tempElements[i].active = false;
        }
        if(min !== index) {
            let tmp = tempElements[index];
            tempElements[index] = tempElements[min];
            tempElements[min] = tmp;
        }

        currentTarget.active = false;
    }

    setCurrentlySorting(false);
}

async function BubbleSort(sortingElements, setSortingElements, setCurrentlySorting) {
    let tempElements = [...sortingElements];
    let length = tempElements.length - 1;
    let swap = false;

    do {
        swap = false;
        for (let index = 0; index < length; index++) {
            let currentTarget = tempElements[index];
            currentTarget.active = true;
            let nextTarget = tempElements[index + 1];
            nextTarget.active = true;

            setSortingElements(tempElements);
            await sleep(getDelay());

            if(tempElements[index].height > tempElements[index + 1].height) {
                swap = true;
                let tmp = tempElements[index];
                tempElements[index] = tempElements[index + 1];
                tempElements[index + 1] = tmp;
            }
            currentTarget.active = false;
            nextTarget.active = false;
        }
        length--;
    } while (swap)
    
    setCurrentlySorting(false);
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