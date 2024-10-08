import { FC, useState } from "react";
import styles from "./TasksColumn.module.sass";
import { TTask, TUser } from "../../interfaces/interfaces";
import Task from "../../UI/Task/Task";
import { getUserById } from "../../utils/getUserById";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import Modal from "../../UI/Modal/Modal";

type props = {
    status: string;
    tasks: TTask[];
    users: TUser[];
};

const TasksColumn: FC<props> = ({ status, tasks, users }) => {
    const filtredTasks = tasks.filter(
        (task) => task.status.toLowerCase() === status.toLowerCase()
    );
    const folders = new Set(tasks.map((task) => task.folder));
    const [createModal, setCreateModal] = useState<boolean>(false);

    return (
        <div className={styles.column}>
            <Modal
                children={
                    <CreateTaskForm
                        folders={[...folders]}
                        status={status}
                        modal={createModal}
                        setModal={setCreateModal}
                        users={users}
                    />
                }
                setVisible={setCreateModal}
                visible={createModal}
            />
            <div className={styles.column_header}>
                <h1 className={styles.column_header_status}>{status}</h1>
                <div className={styles.column_header_options}>
                    <div
                        onClick={() => setCreateModal(true)}
                        className={styles.column_header_options_new}
                    >
                        +
                    </div>
                </div>
            </div>
            {!filtredTasks.length && (
                <div className={styles.no_tasks}>No tasks yet</div>
            )}
            {filtredTasks.map((task, index) => (
                <Task
                    // tester={getUserById(users, task.testerId)}
                    // client={getUserById(users, task.clientId)}
                    // performer={getUserById(users, task.performerId)}
                    task={task}
                    key={index}
                />
            ))}
        </div>
    );
};

export default TasksColumn;
