import { FC, useEffect, useState } from "react";
import styles from "./TaskPage.module.sass";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader/Loader";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TTask } from "../../interfaces/interfaces";
// import { useGetTaskByIdMutation } from "../../store/userApi";
// import { db } from "../../firebase";
// import { doc, getDoc } from "firebase/firestore";
import { useGetTaskByIdMutation } from "../../store/userApi";

const TaskPage: FC = () => {
    const params = useParams();
    // const [loading, setLoading] = useState<boolean>(true);
    const [taskData, setTaskData] = useState<TTask>();
    const user = useSelector((state: RootState) => state.user);
    const [getDocById, { isLoading }] = useGetTaskByIdMutation();

    const getDoc = async () => {
        try {
            const docRef = await getDocById({
                taskId: params.id as string,
                userProjectId: user.userProjectId as string,
            });

            setTaskData(docRef.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getDoc();
    }, []);

    if (isLoading) {
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
            <div className={styles.description}>{taskData?.description}</div>
            <div className={styles.active_users}></div>
        </div>
    );
};

export default TaskPage;
