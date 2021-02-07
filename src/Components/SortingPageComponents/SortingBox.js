import styles from "./SortingBox.module.css";
import React, { useEffect } from 'react';

function SortingBox (props) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const sortingBoxElement = document.getElementById('sortingBoxId');
        if(props.boxSize.height !== sortingBoxElement.clientHeight || props.boxSize.width !== Math.floor(sortingBoxElement.clientWidth)) {
            props.setBoxSize({height: sortingBoxElement.clientHeight, width: Math.floor(sortingBoxElement.clientWidth)})
        }
        const rect = sortingBoxElement.getBoundingClientRect();
        //console.log("rect ", rect);
        if(props.sortingBoxRect.bottom !== rect.bottom) {
            props.setSortingBoxRect(rect);
        }
    });

    const elements = [];
    for (let index = 0; index < props.sortingElements.length; index++) {
        elements.push(<SortingElement 
            sortingElement={props.sortingElements[index]} 
            left={index * 20 + props.leftoverSpace} 
            key={props.sortingElements[index].identifier}
            sortingBoxRect={props.sortingBoxRect}
        />);
    }

    return (
        <div className={styles.SortingBox} id={"sortingBoxId"}>
            {elements}
        </div>
    );
}

function SortingElement (props) {
    const style = {
        height: props.sortingElement.height, 
        width: 10,
        left: props.left,
        bottom: props.sortingBoxRect.height - props.sortingBoxRect.y
    };

    let classNames = [styles.SortingElement];
    if(props.sortingElement.active) {
        classNames.push(styles.SortingElementActive);
    }
    else {
        classNames.push(styles.SortingElementInactive);
    }

    return (
        <div style={style} className={classNames.join(' ')}/>
    );
}

export default SortingBox;