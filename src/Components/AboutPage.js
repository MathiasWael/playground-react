import styles from "./AboutPage.module.css";

function AboutPage (props) {
    return (
        <div className={styles.AboutPage}>
            <div className={styles.AboutPageInner}>
                This website was a personal hobby project, to help myself become more acquainted with the React library. 
                <br/><br/> As such, I have not made any optimisations for viewing it on mobile, tablet or other low resolution devices.
                <br/>I also developed it using Chrome, so there may occur errors if using other browsers.
                <br/><br/><br/><br/>mathiaswael@hotmail.dk
                <br/> <a href="https://github.com/MathiasWael/playground-react" className={styles.GitLink}> https://github.com/MathiasWael/playground-react </a>
            </div>
        </div>
    );
}

export default AboutPage;