import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    reload,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { TProject, TUser } from "../interfaces/interfaces";

type LoginArgs = {
    email: string;
    pass: string;
};
type RegArgs = {
    email: string;
    pass: string;
    name: string;
};

type AuthResponse = {
    userCredential: UserCredential;
};

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (build) => ({
        login: build.mutation<AuthResponse, LoginArgs>({
            queryFn: async ({
                email,
                pass,
            }): Promise<{ data?: AuthResponse; error?: any }> => {
                try {
                    const userCredential = await signInWithEmailAndPassword(
                        auth,
                        email,
                        pass
                    );
                    return { data: { userCredential } };
                } catch (error) {
                    return { error: { error } };
                }
            },
        }),
        register: build.mutation<AuthResponse, RegArgs>({
            queryFn: async ({
                email,
                pass,
                name,
            }): Promise<{ data?: AuthResponse; error?: any }> => {
                try {
                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        pass
                    );
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        userId: userCredential.user.uid,
                        displayName: name,
                        role: null,
                        userProjectId: null,
                    });

                    await updateProfile(userCredential.user, {
                        displayName: name,
                    });
                    await reload(auth.currentUser as User);
                    return { data: { userCredential } };
                } catch (error) {
                    return { error: { error } };
                }
            },
        }),
        getUserById: build.mutation<TUser, { userId: string }>({
            queryFn: async ({
                userId,
            }): Promise<{ data?: TUser; error?: any }> => {
                try {
                    const user = await getDoc(doc(db, "users", userId));

                    return { data: user.data() as TUser };
                } catch (err) {
                    return { error: { err } };
                }
            },
        }),
        getProjectById: build.mutation<TProject, { userProjectId: string }>({
            queryFn: async ({
                userProjectId,
            }): Promise<{ data?: TProject; error?: any }> => {
                try {
                    const proj = await getDoc(
                        doc(db, "projects", userProjectId as string)
                    );

                    return { data: proj.data() as TProject };
                } catch (err) {
                    return { error: { err } };
                }
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetUserByIdMutation,
    useGetProjectByIdMutation,
} = userApi;
