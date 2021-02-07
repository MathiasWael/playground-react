import styles from "./MapBox.module.css";
import React, { useState } from 'react';

function MapBox(props) {
    const [mouseDown, setMouseDown] = useState(false);

    const elements = [];
    for (let index = 0; index < props.mapItems.length; index++) {
        elements.push(
            <MapItem 
                item={props.mapItems[index]} 
                key={props.mapItems[index].horizontal + ":" + props.mapItems[index].vertical}
                setItemStatus={props.setItemStatus}
                mouseDown={mouseDown}
                mouseDownHandle={mouseDownHandle}
                mouseLeaveHandle={mouseLeaveHandle}
                itemSize={props.itemSize}
            />);
    }

    function mouseDownHandle() {
        setMouseDown(true);
    }

    function mouseLeaveHandle() {
        setMouseDown(false);
    }

    return (
        <div id={"mapBoxId"} className={styles.MapBox} onMouseLeave={mouseLeaveHandle}>
            {elements}
        </div>
    );
}

function MapItem(props) {
    const color = getItemColor(props.item);
    const style = {
        height: props.itemSize,
        width: props.itemSize,
        left: props.item.leftPos,
        bottom: props.item.bottomPos,
        backgroundColor: color
    }

    if(color === "#194259") {
        style.color = "whitesmoke"
    }

    function mouseDownHandle() {
        props.setItemStatus(props.item.index);
        props.mouseDownHandle();
    }

    function mouseEnterHandle() {
        if(props.mouseDown) {
            props.setItemStatus(props.item.index)
        }
    }

    function getWeightText() {
        if(props.item.weight === 1 || props.item.status === "Block") {
            return "";
        }
        return props.item.weight;
    }

    return (
        <div style={style} className={styles.MapItem} onMouseDown={mouseDownHandle} onMouseUp={props.mouseLeaveHandle} onMouseEnter={mouseEnterHandle} draggable={false}>
            <div className={styles.MapItemInner}>
                {getWeightText()}
            </div>
        </div>
    )
}

function getItemColor(item) {
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

export default MapBox;