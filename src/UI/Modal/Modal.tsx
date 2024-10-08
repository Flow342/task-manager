import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import styles from "./Modal.module.sass";

type TModal = {
    children: ReactNode;
    visible: boolean;
    setVisible: Dispatch<SetStateAction<boolean>>;
};

const Modal: FC<TModal> = ({ children, visible, setVisible }) => {
    const rootClasses = [styles.modal];

    if (visible) {
        rootClasses.push(styles.active);
    }

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setVisible(false);
        e.stopPropagation();
    };

    return (
        <div className={rootClasses.join(" ")} onClick={(e) => onClick(e)}>
            <div
                className={styles.modal_content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
