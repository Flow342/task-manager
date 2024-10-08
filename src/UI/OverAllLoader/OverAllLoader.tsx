import Loader from "../Loader/Loader";
import styles from "./OverAllLoader.module.sass";

const OverAllLoader = () => {
    return (
        <div className={styles.loader_wrapper}>
            <div className={styles.loader}>
                <Loader />
            </div>
        </div>
    );
};

export default OverAllLoader;
