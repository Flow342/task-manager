import { FC, useState } from "react";
import styles from "./CreateOrJoinProject.module.sass";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import CreateProjectForm from "../CreateProjectForm/CreateProjectForm";
import JoinProjectForm from "../JoinProjectForm/JoinProjectForm";

const CreateOrJoinProject: FC = () => {
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [joinModal, setJoinModal] = useState<boolean>(false);

    const toggleCreate = () => {
        setCreateModal(!createModal);
    };

    const toggleJoin = () => {
        setJoinModal(!joinModal);
    };
    return (
        <div className={styles.create_or_join_project}>
            <h1>Create or log in to the project</h1>
            <div className={styles.buttons}>
                <Button onClick={toggleCreate} className={styles.create_button}>
                    Create
                </Button>
                <Button onClick={toggleJoin} className={styles.join_button}>
                    Join
                </Button>
            </div>
            {createModal && (
                <Modal
                    children={<CreateProjectForm setVisible={setCreateModal} />}
                    setVisible={setCreateModal}
                    visible={createModal}
                />
            )}
            {joinModal && (
                <Modal
                    children={<JoinProjectForm setVisible={setJoinModal} />}
                    setVisible={setJoinModal}
                    visible={joinModal}
                />
            )}
        </div>
    );
};

export default CreateOrJoinProject;
