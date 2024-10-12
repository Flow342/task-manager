import { FC, FormEvent, useEffect, useState } from "react";
import styles from "./TaskPage.module.sass";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TTask } from "../../interfaces/interfaces";
import { AiOutlineDelete, AiOutlineSend, AiOutlineUser } from "react-icons/ai";
import { deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import DropDown from "../../UI/DropDown/DropDown";

const TaskPage: FC = () => {
    const params = useParams();
    const [taskData, setTaskData] = useState<TTask>();
    const user = useSelector((state: RootState) => state.user);
    const [comment, setComment] = useState<string>("");
    const [date, setDate] = useState<number>(0);
    const [otherVisible, setOtherVisible] = useState<boolean>(false);
    const navigate = useNavigate();

    const sendComment = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setComment("");
        try {
            if (taskData) {
                await updateDoc(
                    doc(
                        db,
                        "projects",
                        user.userProjectId as string,
                        "tasks",
                        params.id as string
                    ),
                    {
                        comments: [
                            ...taskData.comments,
                            {
                                comment: comment,
                                senderId: user.id,
                                senderName: user.name,
                                createdAt: Date.now(),
                            },
                        ],
                    }
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const dateNow = new Date().getTime();
        setDate(dateNow);
        try {
            onSnapshot(
                doc(
                    db,
                    "projects",
                    user.userProjectId as string,
                    "tasks",
                    params.id as string
                ),
                (doc) => {
                    if (doc.exists()) {
                        setTaskData(doc.data() as TTask);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    }, []);

    const passedTime = (createdAt: number) => {
        const time = Math.floor((date - Number(createdAt)) / 86400000);

        if (time == 0) {
            return "some time ago";
        } else if (time == 1) {
            return "yesterday";
        } else {
            return time.toString() + "days ago";
        }
    };

    const deleteTask = async () => {
        try {
            await deleteDoc(
                doc(
                    db,
                    "projects",
                    user.userProjectId as string,
                    "tasks",
                    params.id as string
                )
            );
        } catch (err) {
            console.log(err);
        } finally {
            navigate("/feed");
        }
    };

    // const editTask = () => {
    //     return 0;
    // };

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.header_folder_status}>
                    {taskData?.folder}
                    <div>({taskData?.status})</div>
                </div>
                {user.id === taskData?.clientId && (
                    <div
                        onClick={(e) => {
                            e.stopPropagation(), setOtherVisible(!otherVisible);
                        }}
                        className={styles.header_other}
                    >
                        ...
                        <DropDown
                            visible={otherVisible}
                            setVisible={setOtherVisible}
                            side="bottom"
                            body={
                                <div className={styles.header_other_dropdown}>
                                    <div
                                        className={
                                            styles.header_other_dropdown_item
                                        }
                                        onClick={deleteTask}
                                    >
                                        <AiOutlineDelete />
                                        Delete
                                    </div>
                                    {/* <div
                                        className={
                                            styles.header_other_dropdown_item
                                        }
                                        onClick={editTask}
                                    >
                                        <AiOutlineEdit />
                                        Edit
                                    </div> */}
                                </div>
                            }
                        />
                    </div>
                )}
            </div>
            <div className={styles.description}>{taskData?.description}</div>
            <div className={styles.comments}>
                {taskData?.comments.map((item, index) => (
                    <div key={index} className={styles.comments_item}>
                        <div className={styles.comments_item_left}>
                            <div className={styles.comments_item_left_name}>
                                <AiOutlineUser
                                    className={
                                        styles.comments_item_left_name_icon
                                    }
                                />
                                {item.senderName}
                            </div>
                            <div className={styles.comments_item_left_desc}>
                                {item.comment}
                            </div>
                        </div>
                        <div className={styles.comments_item_right_date}>
                            {passedTime(Number(item.createdAt))}
                        </div>
                    </div>
                ))}
                <form onSubmit={sendComment} className={styles.comments_send}>
                    <textarea
                        required
                        value={comment}
                        onChange={(e) => {
                            setComment(e.target.value);
                        }}
                        placeholder="Leave a comment"
                        rows={4}
                    />
                    <div className={styles.comments_send_button}>
                        <button type="submit">
                            Comment <AiOutlineSend fill="#1b1b1b" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskPage;
