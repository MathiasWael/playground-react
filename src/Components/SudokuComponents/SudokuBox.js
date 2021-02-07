import styles from "./SudokuBox.module.css";

function SudokuBox(props) {
    const elements = [];
    for (let index = 0; index < props.elements.length; index++) {
        elements.push(<SudokuItem 
            key={props.elements[index].key} 
            item={props.elements[index]} 
            onElementClick={props.onElementClick}
            onKeyPress={props.onKeyPress}
            index={index}
        />);
    }

    return (
        <div id={"sudokuBoxId"} className={styles.SudokuBox}>
            {elements}
        </div>
    )
}

function SudokuItem(props) { 
    const style = {
        left: props.item.leftPos,
        top: props.item.topPos,
    }
    if(props.item.error) {
        style.backgroundColor = "rgb(243, 90, 90)";
    }
    else if(props.item.selected) {
        style.backgroundColor = "rgb(170, 170, 170)";
    }
    else if(props.item.neighbour) {
        style.backgroundColor = "rgb(202, 210, 214)";
    }
    else if(props.item.similar) {
        style.backgroundColor = "rgb(201, 201, 201)";
    }

    function onClick() {
        props.onElementClick(props.index);
    }

    let displayValue = "";
    if(props.item.value) {
        const DisplayValueStyle = [styles.DisplayValue];
        if(!props.item.default) {
            DisplayValueStyle.push(styles.DisplayValueDefault)
        }
        displayValue = <div className={DisplayValueStyle.join(' ')}> {props.item.value} </div>;
    }
    else {
        displayValue = 
            <table className={styles.NotesTable}>
                <tbody>
                    <tr className={styles.NotesTableRow}>
                        <td className={styles.NotesTableCell}>{displayNote(1, props.item.notes)}</td>
                        <td className={styles.NotesTableCell}>{displayNote(2, props.item.notes)}</td>
                        <td className={styles.NotesTableCell}>{displayNote(3, props.item.notes)}</td>
                    </tr>
                    <tr className={styles.NotesTableRow}>
                        <td className={styles.NotesTableCell}>{displayNote(4, props.item.notes)}</td>
                        <td className={styles.NotesTableCell}>{displayNote(5, props.item.notes)}</td>
                        <td className={styles.NotesTableCell}>{displayNote(6, props.item.notes)}</td>
                    </tr>
                    <tr className={styles.NotesTableRow}>
                        <td className={styles.NotesTableCell}>{displayNote(7, props.item.notes)}</td>
                        <td className={styles.NotesTableCell}>{displayNote(8, props.item.notes)}</td>
                        <td className={styles.NotesTableCell}>{displayNote(9, props.item.notes)}</td>
                    </tr>
                </tbody>
            </table>
    }

    return (
        <div style={style} className={getItemStyling(props.item.row, props.item.col)} onClick={onClick}>
            {displayValue}
        </div>
    )
}

function displayNote(value, notes) {
    //console.log("notes ", notes);
    for (let index = 0; index < notes.length; index++) {
        // eslint-disable-next-line eqeqeq
        if(notes[index] == value) {
            return value;
        }
    }
    return false;
}

function getItemStyling(row, col) {
    const classNames = [styles.SudokuElement];

    if((row + 1) % 3 === 0) {
        classNames.push(styles.Top)
    }
    else if((row + 1) % 3 === 1) {
        classNames.push(styles.Bottom)
    }

    if((col + 1) % 3 === 0) {
        classNames.push(styles.Right)
    }
    else if((col + 1) % 3 === 1) {
        classNames.push(styles.Left)
    }

    return classNames.join(' ');
}

export default SudokuBox;