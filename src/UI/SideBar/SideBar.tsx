import styles from "./SideBar.module.sass";
import { FC, useMemo, useState } from "react";
import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import SideBarItem from "../SideBarItem/SideBarItem";
import { useWindowSize } from "react-use";

const SideBar: FC = () => {
    const rootStyles = [styles.side_bar];
    const [isWide, setIsWide] = useState<boolean>(false);
    const windowSizeX = useWindowSize().width;

    if (!isWide) {
        rootStyles.push(styles.side_bar_active);
    }

    useMemo(() => {
        if (windowSizeX > 1024) {
            setIsWide(true);
        } else {
            setIsWide(false);
        }
    }, [windowSizeX]);

    return (
        <nav className={rootStyles.join(" ")}>
            <SideBarItem
                icon={<AiOutlineMenu className={styles.icon} />}
                isWide={isWide}
                onClick={() => setIsWide(!isWide)}
                text="Close"
            />
            <SideBarItem
                icon={<AiOutlineSetting className={styles.icon} />}
                isWide={isWide}
                onClick={() => 0}
                text="Settings"
            />
            <SideBarItem
                icon={<div className={styles.icon}>?</div>}
                isWide={isWide}
                onClick={() => 0}
                text="Help"
            />
        </nav>
    );
};

export default SideBar;
