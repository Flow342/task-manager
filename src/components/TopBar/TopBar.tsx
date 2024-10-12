import { useDispatch, useSelector } from "react-redux";
import styles from "./TopBar.module.sass";
import { AiFillProject, AiOutlineUser, AiOutlineSearch } from "react-icons/ai";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import DropDown from "../../UI/DropDown/DropDown";
import { signOut } from "firebase/auth";
import { removeUser } from "../../store/reducers/userSlice";
import Loader from "../../UI/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useGetProjectByIdMutation } from "../../store/userApi";

const TopBar = () => {
    const user = useSelector((state: RootState) => state.user);
    const [title, setTitle] = useState<string>("");
    const [userDropDown, setUserDropDown] = useState<boolean>(false);
    const [getProject] = useGetProjectByIdMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getTitle = async () => {
        try {
            if (user.userProjectId) {
                const proj = await getProject({
                    userProjectId: user.userProjectId,
                });
                setTitle(proj.data?.title as string);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getTitle();
        document.title = title;
    }, []);

    const userSignOut = async () => {
        try {
            await signOut(auth);
            dispatch(removeUser());
        } catch (err) {
            console.log(err, "sign out error");
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.left_side}>
                {user.userProjectId && (
                    <div className={styles.project_title}>
                        <AiFillProject />
                        <div onClick={() => navigate("/feed")}>
                            /{title ? title : <Loader />}
                        </div>
                    </div>
                )}
            </div>
            <div className={styles.right_side}>
                <div className={styles.search}>
                    <AiOutlineSearch
                        fill="#464646"
                        className={styles.search_icon}
                    />
                    <input
                        id="search"
                        type="text"
                        placeholder="      search tasks..."
                    />
                </div>
                <div
                    onClick={(e) => {
                        e.stopPropagation();
                        setUserDropDown(!userDropDown);
                    }}
                    className={styles.user}
                >
                    <div className={styles.user_name}>{user.name}</div>
                    <DropDown
                        setVisible={setUserDropDown}
                        visible={userDropDown}
                        side="left"
                        body={
                            <div className={styles.user_dropdown}>
                                <div
                                    onClick={userSignOut}
                                    className={styles.user_dropdown_item}
                                >
                                    Log-out
                                </div>
                            </div>
                        }
                    />
                    <AiOutlineUser className={styles.user_icon} />
                </div>
            </div>
        </div>
    );
};

export default TopBar;
