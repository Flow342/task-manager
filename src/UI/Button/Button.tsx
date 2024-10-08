import { ButtonHTMLAttributes, FC } from "react";
import styles from "./Button.module.sass";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
}

const Button: FC<IButton> = ({ children, ...rest }) => {
    return (
        <button {...rest} className={styles.button}>
            {children}
        </button>
    );
};

export default Button;
