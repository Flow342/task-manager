import styles from "./Loader.module.sass";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.wrapper}>
                <div className={styles.item}>|</div>
                <div className={styles.item}>|</div>
                <div className={styles.item}>|</div>
                <div className={styles.item}>|</div>
                <div className={styles.item}>|</div>
            </div>
        </div>
    );
};

export default Loader;
