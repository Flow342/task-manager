import { Dispatch, FC, FormEvent, SetStateAction, useState } from "react";
import styles from "./JoinProjectForm.module.sass";
import FormInput from "../../UI/FormInput/FormInput";
import Button from "../../UI/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { setUserProjectId } from "../../store/reducers/userSlice";

type TJoinProjectForm = {
    setVisible: Dispatch<SetStateAction<boolean>>;
};

const JoinProjectForm: FC<TJoinProjectForm> = ({ setVisible }) => {
    const [projectId, setProjectId] = useState<string>("");
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const formHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const proj = await getDoc(doc(db, "projects", projectId));
        if (proj.exists()) {
            await setDoc(
                doc(db, "projects", projectId, "users", user.id as string),
                {
                    displayName: user.name,
                    userId: user.id,
                    photoURL: user.photoURL,
                    role: null,
                    userProjectId: projectId,
                    email: user.email,
                }
            );
            await updateDoc(doc(db, "users", user.id as string), {
                userProjectId: projectId,
            });

            dispatch(setUserProjectId(projectId));
        }
        setVisible(false);
    };

    return (
        <div className={styles.wrapper}>
            <h1>Join project</h1>
            <form onSubmit={(e) => formHandler(e)} className={styles.form}>
                <label className={styles.form_label} htmlFor="id">
                    Project id
                </label>
                <FormInput
                    type="text"
                    id="Id"
                    value={projectId}
                    setValue={setProjectId}
                    placeholder="Id..."
                />
                <Button type="submit">Join</Button>
            </form>
        </div>
    );
};

export default JoinProjectForm;
