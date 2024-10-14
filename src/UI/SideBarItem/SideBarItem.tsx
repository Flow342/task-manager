import { FC, ReactNode } from "react";
import styles from "./SideBarItem.module.sass";

type props = {
    text: string;
    onClick: (e: any) => void;
    icon: ReactNode;
    isWide: boolean;
};

const SideBarItem: FC<props> = ({ text, onClick, icon, isWide }) => {
    return (
        <div
            title={isWide ? undefined : text}
            onClick={(e) => onClick(e)}
            className={styles.container}
        >
            {icon}
            <p>{text}</p>
        </div>
    );
};

export default SideBarItem;
