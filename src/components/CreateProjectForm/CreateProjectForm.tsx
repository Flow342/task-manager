import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import styles from "./CreateProjectForm.module.sass";
import FormInput from "../../UI/FormInput/FormInput";
import Button from "../../UI/Button/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setUserProjectId } from "../../store/reducers/userSlice";

type TCreateProjectForm = {
    setVisible: Dispatch<SetStateAction<boolean>>;
};

const CreateProjectForm: FC<TCreateProjectForm> = ({ setVisible }) => {
    const [title, setTitle] = useState<string>("");
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const formHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setVisible(false);
        const docRef = await addDoc(collection(db, "projects"), {
            ownerId: user.id,
            title: title,
            users: [user.id],
            tasks: [],
        });
        dispatch(setUserProjectId(docRef.id));
    };

    return (
        <div className={styles.wrapper}>
            <h1>Create project</h1>
            <form onSubmit={(e) => formHandler(e)} className={styles.form}>
                <label className={styles.form_label} htmlFor="title">
                    Project title
                </label>
                <FormInput
                    type="text"
                    id="title"
                    value={title}
                    setValue={setTitle}
                    placeholder="e.g My project"
                />
                <Button type="submit">Create</Button>
            </form>
        </div>
    );
};

export default CreateProjectForm;
