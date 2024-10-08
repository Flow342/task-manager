import { FC } from "react";
import styles from "./TaskFeedPage.module.sass";
import TaskFeed from "../../components/TaskFeed/TaskFeed";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CreateOrJoinProject from "../../components/CreateOrLoginProject/CreateOrJoinProject";

const TaskFeedPage: FC = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className={styles.wrapper}>
            {user.userProjectId ? (
                <div className={styles.task_feed}>
                    <TaskFeed />
                </div>
            ) : (
                <CreateOrJoinProject />
            )}
        </div>
    );
};

export default TaskFeedPage;
