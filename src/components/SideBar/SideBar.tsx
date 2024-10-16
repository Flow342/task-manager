import styles from "./SideBar.module.sass";
import { FC, useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import SideBarItem from "../../UI/SideBarItem/SideBarItem";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router-dom";

const SideBar: FC = () => {
    const rootStyles = [styles.side_bar];
    const [isWide, setIsWide] = useState<boolean>(false);
    const windowSizeX = useWindowSize().width;
    const navigate = useNavigate();

    useEffect(() => {
        if (windowSizeX > 1600) {
            setIsWide(true);
        } else {
            setIsWide(false);
        }
    }, []);

    if (!isWide) {
        rootStyles.push(styles.side_bar_active);
    }
    return (
        <nav className={rootStyles.join(" ")}>
            <SideBarItem
                icon={<AiOutlineSetting className={styles.icon} />}
                isWide={isWide}
                onClick={() => navigate("/settings")}
                text="Settings"
            />
            <SideBarItem
                icon={<div className={styles.icon}>?</div>}
                isWide={isWide}
                onClick={() => 0}
                text="Help"
            />
            <div className={styles.bottom_close}>
                <SideBarItem
                    icon={<AiOutlineMenu className={styles.icon} />}
                    isWide={isWide}
                    onClick={() => setIsWide(!isWide)}
                    text="Close"
                />
            </div>
        </nav>
    );
};

export default SideBar;
