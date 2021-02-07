import styles from "./Radio.module.css";

function RadioOptions(props) {
    const elements = [];
    for (let index = 0; index < props.options.length; index++) {
        elements.push(<Radio 
            name={props.options[index].name} 
            value={props.options[index].value} 
            currentAlgo={props.radioValue}
            setCurrentAlgo={props.setRadioValue}
            key={props.options[index].name}
            resetElements={props.resetElements}
            currentlyPathfinding={props.currentlyPathfinding}
        />)
    }

    return (
        <div className={styles.RadioRow}>
            <div className={styles.RadioCell}>
                <div className={styles.RadioInner}>
                    <form>
                        {elements}
                    </form>
                </div>
            </div>
        </div>
    );
}

function Radio(props) {
    const handleChange = (event) => {
        if(!props.currentlyPathfinding) {
            props.setCurrentAlgo(event.target.value);
            if(props.resetElements) {
                props.resetElements();
            }
        }
    }
    
    const checked = props.currentAlgo === props.value ? true : false;
    return (
        <div className={styles.RadioItem}>
            <input type="radio" name="algo" value={props.value} onChange={handleChange} checked={checked}/>
            {props.name}
        </div>
    );
}

export default RadioOptions;