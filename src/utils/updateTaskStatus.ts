import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const updateTaskStatusOnServer = async (
    taskId: string,
    newStatus: string,
    projectId: string
) => {
    try {
        // Ссылка на документ задачи в Firestore
        const taskDocRef = doc(db, "projects", projectId, "tasks", taskId);

        // Обновляем статус задачи
        await updateDoc(taskDocRef, { status: newStatus });

        console.log(`Task ${taskId} updated to status ${newStatus}`);
    } catch (error) {
        console.error("Error updating task status:", error);
        throw error;
    }
};
