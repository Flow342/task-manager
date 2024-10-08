import styles from "./TaskFeed.module.sass";
import { FC, useEffect, useState } from "react";
import {
    DocumentData,
    collection,
    getDocs,
    onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import Loader from "../../UI/Loader/Loader";
import { TTask, TUser } from "../../interfaces/interfaces";
import TasksColumn from "../TasksColumn/TasksColumn";

const TaskFeed: FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [tasks, setTasks] = useState<TTask[]>([]);
    const [users, setUsers] = useState<TUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const statuses = ["Todo", "In Progress", "In Review", "Done"];

    onSnapshot(
        collection(db, "projects", user.userProjectId as string, "tasks"),
        (docs) => {
            const taskArr: DocumentData[] = [];

            docs.forEach((task) => {
                taskArr.push(task.data());
            });

            setTasks([...(taskArr as TTask[])]);
        }
    );

    const getUsers = async () => {
        const projUsers = await getDocs(
            collection(db, "projects", user.userProjectId as string, "users")
        );
        const usersArr: DocumentData[] = [];

        projUsers.forEach((user) => {
            usersArr.push(user.data());
        });

        setUsers([...(usersArr as TUser[])]);
    };

    useEffect(() => {
        try {
            getUsers();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    return (
        <div className={styles.wrapper}>
            {loading ? (
                <div className={styles.wrapper_loader}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.task_feed}>
                    {statuses.map((item, index) => (
                        <div key={index} className={styles.task_feed_column}>
                            <TasksColumn
                                status={item}
                                tasks={tasks}
                                users={users}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskFeed;
