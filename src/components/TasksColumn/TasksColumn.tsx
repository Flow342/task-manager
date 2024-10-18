import { FC, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import styles from "./TasksColumn.module.sass";
import { TTask, TUser } from "../../interfaces/interfaces";
import Task from "../../UI/Task/Task";
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

    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    const style = {
        border: isOver ? "1px solid #e0e0e0" : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} className={styles.column}>
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
                <Task task={task} key={index} />
            ))}
        </div>
    );
};

export default TasksColumn;
