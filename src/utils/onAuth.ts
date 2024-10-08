import { User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { removeUser, setLoading, setUser } from "../store/reducers/userSlice";
import { db } from "../firebase";
import { Dispatch } from "@reduxjs/toolkit";

type IOnAuth = {
    user: User | null;
    dispatch: Dispatch;
};

export const onAuth = async ({ user, dispatch }: IOnAuth) => {
    try {
        dispatch(setLoading(true));
        if (user) {
            const userData = (await getDoc(doc(db, "users", user.uid))).data();

            const userProjectId = userData?.userProjectId;

            const userRole = userData?.role;

            dispatch(
                setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.refreshToken,
                    role: userRole,
                    userProjectId: userProjectId,
                    name: user.displayName,
                })
            );
        } else {
            dispatch(removeUser());
        }
    } catch (error) {
        console.log(error);
    } finally {
        dispatch(setLoading(false));
    }
};
