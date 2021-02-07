import styles from "./MenuPage.module.css";
import { useHistory } from "react-router-dom";

function MenuPage() {
    let history = useHistory();

    function redirect(ref) {
        history.push(ref);
    }

    return (
        <div className={styles.MenuPage}>
            <div className={styles.MenuPageRow}>
                <MenuButton 
                    title={"Sorting Algorithms"}
                    style={styles.MenuTopLeft}
                    link={"/sorting"}
                    redirect={redirect}
                />
                <MenuButton 
                    title={"Djikstra Pathfinding"}
                    style={styles.MenuTopRight}
                    link={"/pathfinding"}
                    redirect={redirect}
                />
            </div>
            <div className={styles.MenuPageRow}>
                <MenuButton 
                    title={"Sudoku"}
                    style={styles.MenuBottomLeft}
                    link={"/sudoku"}
                    redirect={redirect}
                />
                <MenuButton 
                    title={"About"}
                    style={styles.MenuBottomRight}
                    link={"/about"}
                    redirect={redirect}
                />
            </div>
        </div>
    );
}

function MenuButton (props) {
    function onClick () {
        props.redirect(props.link);
    }

    return (
        <div className={[styles.MenuButton, props.style].join(' ')} onClick={onClick}>
            {props.title}
        </div>
    );
}

export default MenuPage;