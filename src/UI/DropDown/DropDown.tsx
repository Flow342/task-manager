import { FC, ReactNode, useRef } from "react";
import styles from "./DropDown.module.sass";
import { useClickOutside } from "../../hooks/useOutsideClick";

interface IDropDownData {
    body: ReactNode;
    visible: boolean;
    side: "left" | "right" | "bottom" | "top";
    setVisible: (visible: boolean) => void;
}

const DropDown: FC<IDropDownData> = ({ body, visible, setVisible, side }) => {
    const rootClasses = [styles.drop_down];
    if (side == "left") {
        rootClasses.push(styles.left);
    } else if (side == "right") {
        rootClasses.push(styles.right);
    } else if (side == "bottom") {
        rootClasses.push(styles.bottom);
    } else if (side == "top") {
        rootClasses.push(styles.top);
    }

    const ref = useRef<HTMLDivElement>(null);

    useClickOutside(ref, () => setVisible(false));

    if (visible) {
        rootClasses.push(styles.drop_down_active);
    }

    return (
        <div ref={ref} className={rootClasses.join(" ")}>
            {body}
        </div>
    );
};

export default DropDown;
