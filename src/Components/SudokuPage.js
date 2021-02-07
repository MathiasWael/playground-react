/* eslint-disable eqeqeq */
import styles from "./SudokuPage.module.css";
import SudokuBox from "./SudokuComponents/SudokuBox";
import React, { useState, useEffect } from 'react';
import { GenerateElements } from "./SudokuComponents/Helper";

function SudokuPage (props) {
    const [mapBoxRect, setMapBoxRect] = useState({height: 0, width: 0});
    const [sudokuElements, setSudokuElements] = useState([]);
    const [notesMode, setNotesMode] = useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const mapBoxElement = document.getElementById('sudokuBoxId');
        const rect = mapBoxElement.getBoundingClientRect();
        //console.log("rect ", rect);
        if(mapBoxRect.height !== rect.height || mapBoxRect.width !== rect.width || mapBoxRect.top !== rect.top) {
            setMapBoxRect(rect);
            setSudokuElements(GenerateElements(rect));
        }
    });

    function onRestartClick() {
        setSudokuElements(GenerateElements(mapBoxRect));
    }
    function onHintClick() {
        for (let index = 0; index < sudokuElements.length; index++) {
            if(sudokuElements[index].selected) {
                writeToElement(index, sudokuElements[index].solution);
                break;
            }
        }
    }
    function onNotesClick() {
        if(notesMode) {
            setNotesMode(false);
        }
        else {
            setNotesMode(true);
        }
    }
    function onElementClick(itemIndex) {
        const tmp = [...sudokuElements];
        for (let index = 0; index < tmp.length; index++) {
            tmp[index].selected = false;
            tmp[index].neighbour = false;
        }

        const item = tmp[itemIndex];
        item.selected = true;
        
        for (let index = 0; index < tmp.length; index++) {
            if(tmp[index].key === item.key) {
                continue;
            }
            if(tmp[index].row === item.row || tmp[index].col === item.col || tmp[index].quadrant === item.quadrant) {
                tmp[index].neighbour = true;
            }
            if(item.value) {
                if(tmp[index].value == item.value) {
                    tmp[index].similar = true;
                }
                else {
                    tmp[index].similar = false;
                }
            }
            else {
                tmp[index].similar = false;
            }
        }

        setSudokuElements(tmp);
    }
    function writeToElement(itemIndex, value) {
        const tmp = [...sudokuElements];
        const item = tmp[itemIndex];
        if(item.default) {
            return;
        }
        if(notesMode) {
            let eraseNode = false;
            for (let index = 0; index < item.notes.length; index++) {
                if(item.notes[index] === value) {
                    eraseNode = true;
                    item.notes.splice(index, 1);
                    break;
                }
            }
            if(!eraseNode) {
                item.notes.push(value);
            }
        }
        else {
            for (let index = 0; index < tmp.length; index++) {
                tmp[index].similar = false;
            }
            if(item.value == value) {
                item.value = null;
            }
            else {
                item.value = value;
                for (let index = 0; index < tmp.length; index++) {
                    if(tmp[index].value == value) {
                        tmp[index].similar = true;
                    }
                }
            }
            checkErrors(tmp, item);
        }
        
        setSudokuElements(tmp);
    }
    function onKeyPress(e) {
        if(!isNaN(e.key) && e.key != 0) {
            for (let index = 0; index < sudokuElements.length; index++) {
                if(sudokuElements[index].selected) {
                    writeToElement(index, e.key);
                    break;
                }
            }
        }
    }

    function checkErrors(tmp, item) {
        for (let index = 0; index < tmp.length; index++) {
            tmp[index].error = false;
        }
        for (let index = 0; index < tmp.length; index++) {
            checkError(tmp, tmp[index]);
        }
    }

    function checkError(tmp, item) {
        for (let index = 0; index < tmp.length; index++) {
            if(tmp[index].col === item.col || tmp[index].row === item.row || tmp[index].quadrant === item.quadrant) {
                if(tmp[index].key === item.key) {
                    continue;
                }
                if(tmp[index].value == item.value && item.value) {
                    tmp[index].error = true;
                    item.error = true;
                }
            }
        }
    }

    const NotesStyling = [styles.Options];
    if(notesMode) {
        NotesStyling.push(styles.NotesActive)
    }
    else {
        NotesStyling.push(styles.NotesInactive)
    }

    return (
        <div className={styles.SudokuPage} onKeyPress={onKeyPress} tabIndex="-1">
            <div className={styles.PageRow}>
                <div className={styles.OptionsCell}>
                    <div className={NotesStyling.join(' ')} onClick={onNotesClick} draggable={false}>
                        Notes
                    </div>
                    <div className={styles.Options} onClick={onHintClick} draggable={false}>
                        Hint
                    </div>
                </div>
            </div>
            <SudokuBox
                rect={mapBoxRect}
                elements={sudokuElements}
                onElementClick={onElementClick}
                onKeyPress={onKeyPress}
            />
            <div className={styles.PageRow}>
                <div className={styles.RestartCell}>
                    <div className={styles.Restart} onClick={onRestartClick} draggable={false}>
                        Restart
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SudokuPage;