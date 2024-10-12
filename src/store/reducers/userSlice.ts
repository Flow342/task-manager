import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type IStateData = {
    photoURL: null | string;
    email: null | string;
    token: null | string;
    id: null | string;
    name: null | string;
    userProjectId: null | string;
    loading: boolean;
    role: "client" | "performer" | "tester" | "owner" | null;
};

const initialState: IStateData = {
    photoURL: null,
    email: null,
    token: null,
    id: null,
    name: null,
    userProjectId: null,
    loading: true,
    role: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            return { ...state, ...action.payload };
        },
        setUserName(state, action: PayloadAction<string | null>) {
            state.name = action.payload;
        },
        setUserProjectId(state, action: PayloadAction<string | null>) {
            state.userProjectId = action.payload;
        },
        removeUser(state) {
            state.email = null;
            state.token = null;
            state.id = null;
            state.name = null;
            state.userProjectId = null;
            state.photoURL = null;
            state.role = null;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },
        setUserPhoto(state, action: PayloadAction<string>) {
            state.photoURL = action.payload;
        },
    },
});

export const {
    setUser,
    removeUser,
    setUserName,
    setUserProjectId,
    setLoading,
} = userSlice.actions;

export default userSlice.reducer;
