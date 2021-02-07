import styles from "./Slider.module.css";
import Slider from "@material-ui/core/Slider";

function SliderBox(props) {
    return (
        <div className={styles.SliderBox}>
            <div className={styles.SliderBoxInner}>
                <div className={styles.Slider}> Delay
                    <Slider 
                        min={0}
                        max={200}
                        defaultValue={100}
                    />
                </div>
            </div>
        </div>
    );
}

export default SliderBox;