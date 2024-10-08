import { useSelector } from "react-redux";
import styles from "./TopBar.module.sass";
import { AiFillProject, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import DropDown from "../../UI/DropDown/DropDown";

const TopBar = () => {
    const user = useSelector((state: RootState) => state.user);
    const [title, setTitle] = useState<string>("");
    const [userDropDown, setUserDropDown] = useState<boolean>(false);

    const getTitle = async () => {
        try {
            if (user.userProjectId) {
                const proj = await getDoc(
                    doc(db, "projects", user.userProjectId)
                );
                setTitle(proj.data()?.title);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTitle();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.left_side}>
                <AiFillProject />
                <h1>/{title}</h1>
            </div>
            <div className={styles.right_side}>
                <div className={styles.search}>
                    <AiOutlineSearch
                        fill="#464646"
                        className={styles.search_icon}
                    />
                    <input type="text" placeholder="      search tasks..." />
                </div>
                <div className={styles.user}>
                    <div className={styles.user_name}>{user.name}</div>
                    <AiOutlineUser className={styles.user_icon} />
                    <DropDown
                        setVisible={setUserDropDown}
                        visible={userDropDown}
                        side="bottom"
                        body={<div>Log-out</div>}
                    />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
