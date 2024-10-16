import { FC } from "react";
import { useDraggable } from "@dnd-kit/core";
import styles from "./Task.module.sass";
import { TTask } from "../../interfaces/interfaces";
import { AiFillCalendar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type TaskProps = {
    task: TTask;
};

const Task: FC<TaskProps> = ({ task }) => {
    const navigate = useNavigate();

    // Хук DnD Kit для перетаскиваемого элемента
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id, // Уникальный id для каждого task
        });

    // Применение трансформации при перетаскивании
    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        opacity: isDragging ? 0.5 : 1, // Уменьшение прозрачности при перетаскивании
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners} // Добавляем обработчики событий
            {...attributes} // Добавляем необходимые атрибуты
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
