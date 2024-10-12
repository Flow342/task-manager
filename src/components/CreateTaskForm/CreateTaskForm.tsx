import {
    Dispatch,
    FC,
    FormEvent,
    SetStateAction,
    useEffect,
    useState,
} from "react";
import styles from "./CreateTaskForm.module.sass";
import FormInput from "../../UI/FormInput/FormInput";
import "react-date-picker/dist/DatePicker.css";
import { TUser } from "../../interfaces/interfaces";
import FormSelectUser from "../../UI/FormSelectUser/FormSelectUser";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import OverAllLoader from "../../UI/OverAllLoader/OverAllLoader";
import { AiOutlineClose } from "react-icons/ai";

type TCreateTaskForm = {
    users: TUser[];
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
    folders: string[];
    status: string;
};

const CreateTaskForm: FC<TCreateTaskForm> = ({
    users,
    modal,
    setModal,
    status,
    folders,
}) => {
    const [folder, setFolder] = useState<string>("");
    const [desc, setDesc] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [tester, setTester] = useState<string>("");
    const [performer, setPerformer] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isNewFolder, setIsNewFolder] = useState<boolean>(false);
    const user = useSelector((state: RootState) => state.user);

    const testers: TUser[] = users.filter((user) => user.role == "tester");

    const performers: TUser[] = users.filter(
        (user) => user.role == "performer"
    );

    const date = new Date();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await addDoc(
                collection(
                    db,
                    "projects",
                    user.userProjectId as string,
                    "tasks"
                ),
                {
                    clientId: user.id,
                    performerId: performer,
                    testerId: tester,
                    description: desc,
                    createdAt: date.toISOString().split("T")[0],
                    deadline: deadline,
                    comments: [],
                    status: status,
                    folder: folder,
                }
            );
        } catch (err) {
            console.log(err);
            resetModal();
        } finally {
            resetModal();
            setIsLoading(false);
            setModal(false);
        }
    };

    const resetModal = () => {
        if (!modal) {
            setFolder("");
            setDeadline("");
            setDesc("");
            setPerformer("");
            setTester("");
        }
    };

    const changeFolderSelect = (e: any) => {
        e.preventDefault();
        setIsNewFolder(!isNewFolder);
        setFolder("");
    };

    useEffect(() => {
        resetModal();
    }, [modal]);

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            {isLoading && <OverAllLoader />}
            <h1 className={styles.form_title}>Create Task</h1>
            {isNewFolder || !folders.length ? (
                <div className={styles.form_folder}>
                    <label htmlFor="folder_input">Folder</label>
                    <FormInput
                        id="folder_input"
                        setValue={setFolder}
                        value={folder}
                        required
                    />
                    <AiOutlineClose
                        className={styles.icon}
                        onClick={changeFolderSelect}
                    />
                </div>
            ) : (
                <div className={styles.form_folder}>
                    <label htmlFor="folder_select">Select</label>
                    <select
                        onChange={(e) => setFolder(e.target.value)}
                        className={styles.form_folder_select}
                        required
                        id="folder_select"
                    >
                        <option value="" hidden>
                            folder
                        </option>

                        {[...folders].map((folder, index) => (
                            <option value={folder} key={index}>
                                {folder}
                            </option>
                        ))}
                    </select>
                    or
                    <button
                        onClick={changeFolderSelect}
                        type="button"
                        className={styles.button}
                    >
                        New folder
                    </button>
                </div>
            )}

            <FormInput
                placeholder="Description"
                value={desc}
                setValue={setDesc}
                id="desc"
                required
            />
            <div className={styles.form_deadline}>
                <label htmlFor="deadline">Deadline</label>
                <input
                    id="deadline"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    type="date"
                    className={styles.form_deadline_input}
                    min={date.toISOString().split("T")[0]}
                />
            </div>
            {testers.length && (
                <FormSelectUser
                    req={false}
                    setUser={setTester}
                    users={testers}
                    title="Tester"
                />
            )}
            {performers.length && (
                <FormSelectUser
                    req={false}
                    setUser={setPerformer}
                    users={performers}
                    title="Performer"
                />
            )}
            <div className={styles.submit_wrapper}>
                <button type="submit" className={styles.button}>
                    Create
                </button>
            </div>
        </form>
    );
};

export default CreateTaskForm;
