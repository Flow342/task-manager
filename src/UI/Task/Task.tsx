import { FC } from "react";
import styles from "./Task.module.sass";
import { TTask } from "../../interfaces/interfaces";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store/store";
import { AiFillCalendar } from "react-icons/ai";

type TaskProps = {
    task: TTask;
    // tester: TUser;
    // performer: TUser;
    // client: TUser;
};

const Task: FC<TaskProps> = ({ task }) => {
    // const user = useSelector((state: RootState) => state.user);
    // const [isEditable, setIsEditable] = useState<boolean>(false);

    // if (user.id === client.userId && user.role === "owner") {
    // setIsEditable(true);
    // }

    return (
        <div className={styles.task}>
            <div className={styles.task_id}>#{task.id}13</div>
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
