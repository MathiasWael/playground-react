import React, { useState, useEffect } from 'react';
import styles from "./PathfindingPage.module.css";
import RadioOptions from "./GenericComponents/Radio";
import MapBox from "./PathfindingPageComponents/MapBox"
import { resetElements } from "./PathfindingPageComponents/Helper"
import Djikstra from "./PathfindingPageComponents/PathfindingAlgorithms"
import SliderBox from "./GenericComponents/Slider";

function PathfindingPage (props) {
    const [mapBoxRect, setMapBoxRect] = useState({height: 0, width: 0});
    const [coloringOption, setColoringOption] = useState("Start");
    const [mapItems, setMapItems] = useState([]);
    const [currentlyPathfinding, setCurrentlyPathfinding] = useState(false);
    const [startPathfinding, setStartPathfinding] = useState(false);
    const itemSize = 49;

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const mapBoxElement = document.getElementById('mapBoxId');
        const rect = mapBoxElement.getBoundingClientRect();
        //console.log("rect ", rect);
        if(mapBoxRect.height !== rect.height || mapBoxRect.width !== rect.width || mapBoxRect.top !== rect.top) {
            setMapBoxRect(rect);
            resetElements(rect.height, rect.width, rect.top, itemSize, setMapItems);
        }
    });

    function setItemStatus(itemIndex) {
        if(!currentlyPathfinding) {
            const tmp = [...mapItems];
            if(coloringOption === "Start") {
                for (let index = 0; index < tmp.length; index++) {
                    if(tmp[index].status === "Start") {
                        tmp[index].status = "Empty";
                    }
                }
            }
            else if(coloringOption === "End") {
                for (let index = 0; index < tmp.length; index++) {
                    if(tmp[index].status === "End") {
                        tmp[index].status = "Empty";
                    }
                }
            }
    
            tmp[itemIndex].status = coloringOption;
            setMapItems(tmp);
        }
    }

    function onStartClick() {
        if(!currentlyPathfinding) {
            if(!mapItems.find(x => x.status === "Start")) {
                alert("Start Node Required");
            }
            else if(!mapItems.find(x => x.status === "End")) {
                alert("End Node Required");
            }
            else {
                setStartPathfinding(true);
            }
        }
    }

    function onRefreshClick() {
        if(!currentlyPathfinding) {
            resetElements(mapBoxRect.height, mapBoxRect.width, mapBoxRect.top, itemSize, setMapItems)
        }
    }

    if(startPathfinding) {
        setStartPathfinding(false);
        setCurrentlyPathfinding(true);
        Djikstra(mapItems, setCurrentlyPathfinding, setMapItems, mapBoxRect, itemSize);
    }

    return (
        <div className={styles.PathfindingPage}>
            <RadioOptions 
                radioValue={coloringOption}
                setRadioValue={setColoringOption}
                currentlyPathfinding={currentlyPathfinding}
                resetElements={null}
                options={[
                    { name: "Start", value: "Start" },
                    { name: "End", value: "End" },
                    { name: "Block", value:"Block" },
                    { name: "Empty", value:"Empty" },
                ]}
            />
            <MapBox 
                mapItems={mapItems}
                setItemStatus={setItemStatus}
                itemSize={itemSize}
            />
            <SliderBox />
            <div className={styles.StartRow}>
                <div className={styles.StartCell}>
                    <div className={styles.Start} onClick={onRefreshClick}>
                        Refresh
                    </div>
                    <div className={styles.Start} onClick={onStartClick}>
                        Start
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PathfindingPage;