function resetElements(height, width, top, itemSize, setMapItems) {
    const noOfHorizontalItems = getNoOfHorizontalItems(width, itemSize);
    const noOfVerticalItems = getNoOfVerticalItems(height, itemSize);
    const leftoverHorizontal = (width - (noOfHorizontalItems * (itemSize + 1))) / 2;
    const leftoverVertical = (height - (noOfVerticalItems * (itemSize + 1))) / 2;

    const newMapItems = [];
    let index = 0;
    for (let vertIndex = 0; vertIndex < noOfVerticalItems; vertIndex++) {
        for (let horiIndex = 0; horiIndex < noOfHorizontalItems; horiIndex++) {
            const bottomPos = (height - top) + (vertIndex * (itemSize + 1));
            const leftPos = horiIndex * (itemSize + 1);

            newMapItems.push({
                status: "Empty",
                horizontal: horiIndex,
                vertical: vertIndex,
                bottomPos: bottomPos + leftoverVertical,
                leftPos: leftPos + leftoverHorizontal,
                index: index,
                weight: getRandomWeight()
            });
            index++;
        }
    }

    setMapItems(newMapItems);
}

function getRandomWeight() {
    const createWeight = getRandomInt(4);
    if(createWeight !== 0) {
        return getRandomInt(45) + 5;
    }
    return 1;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

function getNoOfVerticalItems(height, itemSize) {
    return Math.floor(height / itemSize) - 1;
}
function getNoOfHorizontalItems(width, itemSize) {
    return Math.floor(width / itemSize) - 1;
}

function getItemNeighbours(item, mapItems, width, height, itemSize) {
    const maxHorizontal = getNoOfHorizontalItems(width, itemSize);
    const maxVertical = getNoOfVerticalItems(height, itemSize);
    const neighbours = [];
    if(item.horizontal > 0) {
        neighbours.push(mapItems[item.index - 1]);
    }
    if(item.horizontal + 1 < maxHorizontal) {
        neighbours.push(mapItems[item.index + 1]);
    }
    if(item.vertical > 0) {
        neighbours.push(mapItems[item.index - maxHorizontal]);
    }
    if(item.vertical + 1 < maxVertical) {
        neighbours.push(mapItems[item.index + maxHorizontal]);
    }

    return neighbours;
}

export { resetElements, getItemNeighbours, getNoOfHorizontalItems, getNoOfVerticalItems };