import styles from "./TaskFeed.module.sass";
import { FC, useEffect, useRef, useState } from "react";
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
import { DndContext, DragEndEvent } from "@dnd-kit/core"; // Импортируем компоненты DnD Kit
import { updateTaskStatusOnServer } from "../../utils/updateTaskStatus";

const TaskFeed: FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [tasks, setTasks] = useState<TTask[]>([]);
    const [users, setUsers] = useState<TUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const feedRef = useRef<HTMLDivElement>(null);

    const statuses = ["Todo", "In Progress", "In Review", "Done"];

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
            onSnapshot(
                collection(
                    db,
                    "projects",
                    user.userProjectId as string,
                    "tasks"
                ),
                (docs) => {
                    if (!docs.empty) {
                        const taskArr: DocumentData[] = [];

                        docs.forEach((task) => {
                            taskArr.push({ ...task.data(), id: task.id });
                        });

                        setTasks([...(taskArr as TTask[])]);
                        if (docs.size == taskArr.length) {
                            setLoading(false);
                        }
                    } else {
                        setLoading(false);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }, [user.userProjectId]);

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        const newStatus = over.id as
            | "done"
            | "Todo"
            | "in progress"
            | "in review"
            | "testing"
            | "released";

        const currentTask = tasks.find((task) => task.id === String(active.id));

        if (!currentTask || currentTask.status === newStatus) {
            return;
        }

        const previousStatus = currentTask.status;

        const updatedTasks = tasks.map((task) =>
            task.id === String(active.id)
                ? { ...task, status: newStatus }
                : task
        );
        setTasks(updatedTasks);

        try {
            await updateTaskStatusOnServer(
                String(active.id),
                newStatus,
                user.userProjectId as string
            );
            console.log("Task status updated on server.");
        } catch (error) {
            console.error("Failed to update task on server:", error);

            const revertedTasks = tasks.map((task) =>
                task.id === String(active.id)
                    ? { ...task, status: previousStatus }
                    : task
            );
            setTasks(revertedTasks);

            alert("Error updating the task on the server. Please try again.");
        }
    };

    return (
        <div className={styles.wrapper}>
            {loading ? (
                <div className={styles.wrapper_loader}>
                    <Loader />
                </div>
            ) : (
                // Оборачиваем TaskFeed в DndContext
                <DndContext onDragEnd={handleDragEnd}>
                    <div className={styles.task_feed} ref={feedRef}>
                        {statuses.map((item, index) => (
                            <div
                                key={index}
                                className={styles.task_feed_column}
                            >
                                <TasksColumn
                                    status={item}
                                    tasks={tasks}
                                    users={users}
                                />
                            </div>
                        ))}
                    </div>
                </DndContext>
            )}
        </div>
    );
};

export default TaskFeed;
