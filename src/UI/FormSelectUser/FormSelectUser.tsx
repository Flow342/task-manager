import { Dispatch, FC, SetStateAction } from "react";
import styles from "./FormSelectUser.module.sass";
import { TUser } from "../../interfaces/interfaces";

type props = {
    setUser: Dispatch<SetStateAction<string>>;
    title?: string;
    users: TUser[];
    req: boolean;
};

const FormSelectUser: FC<props> = ({ setUser, title, users, req }) => {
    return (
        <div className={styles.wrapper}>
            {title && <label htmlFor={title}>{title}</label>}
            <select
                required={req}
                onChange={(e) => setUser(e.target.value)}
                id={title}
                className={styles.select}
            >
                <option value="" hidden>
                    select
                </option>
                {[...users].map((item, index) => (
                    <option value={item.userId} key={index}>
                        {item.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FormSelectUser;
