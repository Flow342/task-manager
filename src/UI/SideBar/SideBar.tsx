import styles from "./SideBar.module.sass";
import { FC, useState } from "react";
import { AiOutlineMenu, AiOutlineSetting } from "react-icons/ai";
import SideBarItem from "../SideBarItem/SideBarItem";

const SideBar: FC = () => {
    const rootStyles = [styles.side_bar];
    const [isWide, setIsWide] = useState<boolean>(false);

    // const userSignOut = async () => {
    //     try {
    //         await signOut(auth);
    //         dispatch(removeUser());
    //     } catch (err) {
    //         console.log(err, "sign out error");
    //     }
    // };

    if (isWide) {
        rootStyles.push(styles.side_bar_active);
    }

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
