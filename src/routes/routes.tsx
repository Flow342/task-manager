import Redirect from "../components/Redirect/Redirect";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegPage from "../pages/RegPage/RegPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import TaskFeedPage from "../pages/TaskFeedPage/TaskFeedPage";
import TaskPage from "../pages/TaskPage/TaskPage";

export const privateRoutes = [
    { element: <TaskFeedPage />, path: "/feed" },
    {
        element: <TaskPage />,
        path: "/tasks/:id",
    },
    { element: <SettingsPage />, path: "/settings" },
    { element: <Redirect />, path: "*" },
];

export const publicRoutes = [
    { element: <RegPage />, path: "/register" },
    { element: <LoginPage />, path: "/login" },
    { element: <LoginPage />, path: "/" },
    { element: <LoginPage />, path: "*" },
];
