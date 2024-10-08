import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.sass";
import SideBar from "./UI/SideBar/SideBar";
import { privateRoutes, publicRoutes } from "./routes/routes";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useEffect } from "react";
import Loader from "./UI/Loader/Loader";
import { onAuth } from "./utils/onAuth";
import { onAuthStateChanged } from "firebase/auth";
import TopBar from "./components/TopBar/TopBar";

function App() {
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);
    const isUser = userState.email;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            onAuth({ user, dispatch });
        });
    }, []);

    return (
        <BrowserRouter>
            {userState.loading ? (
                <div className="loading">
                    <Loader />
                </div>
            ) : (
                <div className="wrapper">
                    {isUser && <SideBar />}
                    <div className="main_page">
                        {isUser && <TopBar />}
                        <Routes>
                            {isUser
                                ? privateRoutes.map((route, index) => (
                                      <Route
                                          element={route.element}
                                          path={route.path}
                                          key={index}
                                      />
                                  ))
                                : publicRoutes.map((route, index) => (
                                      <Route
                                          element={route.element}
                                          path={route.path}
                                          key={index}
                                      />
                                  ))}
                        </Routes>
                    </div>
                </div>
            )}
        </BrowserRouter>
    );
}

export default App;
