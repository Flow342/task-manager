export type TUser = {
    userId: string;
    role: "client" | "performer" | "tester" | "owner" | null;
    displayName: string;
    userProjectId: null;
    photoURL: string;
};

export type TComment = {
    createdAt: string;
    description: string;
};

export type TTask = {
    clientId: string;
    performerId: string;
    testerId: string;
    description: string;
    createdAt: string;
    deadline: string;
    comments: TComment[];
    status:
        | "Todo"
        | "in progress"
        | "in review"
        | "testing"
        | "done"
        | "released";
    folder: string;
    id: number;
};

export type TProject = {
    title: string;
    ownerId: string;
    users: TUser[];
    tasks: TTask[];
};

export type IProjects = IProjects[];
