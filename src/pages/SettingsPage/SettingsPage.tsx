import { FC, useState } from "react";
import styles from "./SettingsPage.module.sass";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { TUser } from "../../interfaces/interfaces";

const SettingsPage: FC = () => {
    const user = useSelector((state: RootState) => state.user);
    const [users, setUsers] = useState<TUser[]>([]);

    return (
        <div className={styles.wrapper}>
            {user.role === "owner" && (
                <div className={styles.set_roles}>
                    <h1>Set roles of your project</h1>
                    <div className={styles.set_roles_field}></div>
                </div>
            )}
        </div>
    );
};

export default SettingsPage;
