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
import { doc, setDoc } from "firebase/firestore";

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
                        id: userCredential.user.uid,
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
    }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
