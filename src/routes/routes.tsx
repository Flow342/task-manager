import LoginPage from "../pages/LoginPage/LoginPage";
import RegPage from "../pages/RegPage/RegPage";
import TaskFeedPage from "../pages/TaskFeedPage/TaskFeedPage";

export const privateRoutes = [{ element: <TaskFeedPage />, path: "/" }];

export const publicRoutes = [
    { element: <RegPage />, path: "/registration" },
    { element: <LoginPage />, path: "/login" },
    { element: <LoginPage />, path: "/" },
];
