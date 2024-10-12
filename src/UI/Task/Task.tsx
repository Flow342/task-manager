import { FC } from "react";
import styles from "./Task.module.sass";
import { TTask } from "../../interfaces/interfaces";
import { AiFillCalendar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type TaskProps = {
    task: TTask;
};

const Task: FC<TaskProps> = ({ task }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/tasks/" + task.id)}
            className={styles.task}
        >
            <div className={styles.task_id}>#{task.id}</div>
            <div className={styles.task_description}>{task.description}</div>
            <div className={styles.task_wrappers}>
                <div className={styles.task_wrappers_folder}>{task.folder}</div>
                {task.deadline && (
                    <div className={styles.task_wrappers_deadline}>
                        <AiFillCalendar fill="#804142" />
                        {task.deadline.slice(5, task.deadline.length)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Task;
