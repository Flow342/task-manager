import { FC, useState } from "react";
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

    // Храним начальные координаты мыши
    const [startPosition, setStartPosition] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);

    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id,
            disabled: !dragging, // Перетаскивание разрешено только, если dragging === true
        });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    // Функция для отслеживания начала клика
    const handleMouseDown = (event: React.MouseEvent) => {
        setStartPosition({ x: event.clientX, y: event.clientY });
        setDragging(false);
    };

    // Функция для отслеживания перемещения мыши
    const handleMouseMove = (event: React.MouseEvent) => {
        if (startPosition) {
            const deltaX = Math.abs(event.clientX - startPosition.x);
            const deltaY = Math.abs(event.clientY - startPosition.y);

            if (deltaX > 10 || deltaY > 10) {
                setDragging(true); // Начинаем перетаскивание только при превышении порога в 10 пикселей
            }
        }
    };

    // Сбрасываем состояние при завершении клика
    const handleMouseUp = () => {
        setStartPosition(null);
        if (!dragging) {
            // Если элемент не перетаскивался, это обычный клик
            navigate("/tasks/" + task.id);
        }
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
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
