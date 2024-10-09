import { FC, useEffect, useState } from "react";
import styles from "./TaskPage.module.sass";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TTask } from "../../interfaces/interfaces";

const TaskPage: FC = () => {
    const params = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [taskData, setTaskData] = useState<TTask>();
    const user = useSelector((state: RootState) => state.user);

    const getDocById = async () => {
        try {
            const docRef = await getDoc(
                doc(
                    db,
                    "projects",
                    user.userProjectId as string,
                    "tasks",
                    params.id as string
                )
            );
            setTaskData(docRef.data() as TTask);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDocById();
    }, []);

    if (loading) {
        return (
            <div className={styles.loader_wrapper}>
                <Loader />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>{taskData?.folder}</h1>
                <div className={styles.header_other}>...</div>
            </div>
            <div>{taskData?.description}</div>
        </div>
    );
};

export default TaskPage;
