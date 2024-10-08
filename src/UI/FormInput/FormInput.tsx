import styles from "./FormInput.module.sass";
import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react";

interface IInputData extends InputHTMLAttributes<HTMLInputElement> {
    setValue: Dispatch<SetStateAction<string>>;
}

const FormInput: FC<IInputData> = ({ setValue, ...rest }) => {
    return (
        <input
            className={styles.form_input}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setValue(e.currentTarget.value)
            }
            {...rest}
        />
    );
};

export default FormInput;
