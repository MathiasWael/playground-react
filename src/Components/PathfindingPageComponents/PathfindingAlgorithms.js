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
        setMapItems(map);
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
        setMapItems(map);
        await sleep(getDelay());
    }

    setCurrentlyPathfinding(false);
}

async function paintDjikstraPath(map, target, setMapItems) {
    if(map[target.index].status === "End" || !target.previous) {
        map[target.index].status = "pathGoal";
    }
    else {
        map[target.index].status = "path";
    }
    setMapItems(map);
    await sleep(getDelay());
    if(target.previous) {
        paintDjikstraPath(map, target.previous, setMapItems);
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