import { getItemNeighbours } from "./Helper"

const _ = require('lodash');

async function Djikstra(mapItems, setCurrentlyPathfinding, setMapItems, mapBoxRect, itemSize) {
    const map = _.cloneDeep(mapItems);
    const unvisitedSet = _.cloneDeep(map);

    for (let index = 0; index < unvisitedSet.length; index++) {
        unvisitedSet[index].neighbours = getItemNeighbours(unvisitedSet[index], unvisitedSet, mapBoxRect.width, mapBoxRect.height, itemSize);
    }

    let startIndex = 0;
    for (let index = 0; index < unvisitedSet.length; index++) {
        unvisitedSet[index].distance = 99999999999;
        unvisitedSet[index].previous = null;

        if(unvisitedSet[index].status === "Start") {
            startIndex = index;
        }
    }
    unvisitedSet[startIndex].distance = 0;

    while(unvisitedSet.length !== 0) {
        let currentNodeIndex = djikstraFindNextTarget(unvisitedSet);
        if(currentNodeIndex === -1) {
            break;
        }
        const currentNode = unvisitedSet[currentNodeIndex];
        unvisitedSet.splice(currentNodeIndex, 1);
        
        if(currentNode.status === "End") {
            paintDjikstraPath(map, currentNode, setMapItems);
            break;
        }

        currentNode.status = "current";
        map[currentNode.index].status = "current";
        colorElement(map[currentNode.index]);
        await sleep(getDelay());

        for (let index = 0; index < currentNode.neighbours.length; index++) {
            if(currentNode.neighbours[index].status === "visited" || currentNode.neighbours[index].status === "Block") {
                continue;
            }

            const newDistance = currentNode.distance + currentNode.neighbours[index].weight;
            if(newDistance < currentNode.neighbours[index].distance) {
                currentNode.neighbours[index].distance = newDistance;
                currentNode.neighbours[index].previous = currentNode;
            }
        }

        map[currentNode.index].status = "visited";
        colorElement(map[currentNode.index]);
        await sleep(getDelay());
    }

    setMapItems(map);
    setCurrentlyPathfinding(false);
}

async function paintDjikstraPath(map, target) {
    if(map[target.index].status === "End" || !target.previous) {
        map[target.index].status = "pathGoal";
    }
    else {
        map[target.index].status = "path";
    }

    colorElement(map[target.index]);
    colorElementText(map[target.index])
    await sleep(getDelay());
    if(target.previous) {
        paintDjikstraPath(map, target.previous);
    }
}

function djikstraFindNextTarget(unvisitedSet) {
    let currentNodeIndex = -1;
    let shortestDistance = 99999999998;
    for (let index = 0; index < unvisitedSet.length; index++) {
        if(unvisitedSet[index].distance < shortestDistance) {
            shortestDistance = unvisitedSet[index].distance;
            currentNodeIndex = index;
        }
    }
    return currentNodeIndex;
}

function colorElement(item) {
    document.getElementById(item.key).style.backgroundColor = getColor(item);
}

function colorElementText(item) {
    document.getElementById(item.key).style.color = "whitesmoke";
}

function getColor(item) {
    switch (item.status) {
        case "Start":
            return "#00e500";
        case "End":
            return "#e50000";
        case "Block":
            return "#333333";
        case "visited":
            return "#A0A093"
        case "pathGoal":
            return "#47677A";
        case "path":
            return "#194259";
        case "current":
            return "#194259";
        
        default:
            return "#e5e5e5";
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

export default Djikstra;