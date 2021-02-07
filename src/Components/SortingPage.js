import React, { useState, useEffect } from 'react';
import styles from "./SortingPage.module.css";
import { InsertionSort, BubbleSort, SelectionSort } from "./SortingPageComponents/SortingAlgorithms";
import RadioOptions from "./GenericComponents/Radio";
import SliderBox from "./GenericComponents/Slider";
import SortingBox from "./SortingPageComponents/SortingBox";

function SortingPage (props) {
    const [sortingElements, setSortingElements] = useState([]);
    const [boxSize, setBoxSize] = useState({height: 0, width: 0});
    const [sortingBoxRect, setSortingBoxRect] = useState({height: 0});
    const [selectedSorting, setSelectedSorting] = useState("InsertionSort");
    const [startSorting, setStartSorting] = useState(false);
    const [currentlySorting, setCurrentlySorting] = useState(false);

    const noOfSortingElements = Math.floor(boxSize.width / 20) - 1;
    useEffect(() => {
        resetElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noOfSortingElements, boxSize.height]);

    function resetElements() {
        if(!currentlySorting) {
            const newSortingElements = [];
            for (let index = 0; index < noOfSortingElements; index++) {
                const randomHeight = Math.floor(Math.random() * (boxSize.height - 60)) + 30;
                newSortingElements.push({height: randomHeight, identifier: index});
            }
            setSortingElements(newSortingElements);
        }
    }

    function onStartClick() {
        if(!currentlySorting) {
            setStartSorting(true);
        }
    }

    if(startSorting) {
        setStartSorting(false);
        setCurrentlySorting(true);
        AlgorithmManager(sortingElements, setSortingElements, selectedSorting, setCurrentlySorting);
    }

    return (
        <div className={styles.SortingPage}>
            <RadioOptions 
                radioValue={selectedSorting}
                setRadioValue={setSelectedSorting}
                resetElements={resetElements}
                currentlySorting={currentlySorting}
                options={[
                    { name: "Insertion", value: "InsertionSort" },
                    { name: "Bubble", value: "BubbleSort" },
                    { name: "Selection", value:"SelectionSort" }
                ]}
            />
            <SortingBox 
                boxSize={boxSize}
                setBoxSize={setBoxSize}
                sortingBoxRect={sortingBoxRect}
                setSortingBoxRect={setSortingBoxRect}
                sortingElements={sortingElements}
                leftoverSpace={(boxSize.width - (noOfSortingElements * 20)) / 2 + 5}
            />
            <SliderBox />
            <div className={styles.StartRow}>
                <div className={styles.StartCell}>
                    <div className={styles.Start} onClick={onStartClick}>
                        Start
                    </div>
                </div>
            </div>
        </div>
    );
}

function AlgorithmManager(sortingElements, setSortingElements, selectedSorting, setCurrentlySorting) {
    switch(selectedSorting) {
        case "InsertionSort":
            InsertionSort(sortingElements, setSortingElements, setCurrentlySorting);
            break;
        case "BubbleSort":
            BubbleSort(sortingElements, setSortingElements, setCurrentlySorting);
            break;
        case "SelectionSort":
            SelectionSort(sortingElements, setSortingElements, setCurrentlySorting);
            break;
        default:
            break;
    }
}

export default SortingPage;