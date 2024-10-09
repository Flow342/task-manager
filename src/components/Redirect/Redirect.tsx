import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Перенаправление на другую страницу
        navigate("/feed");
    }, [navigate]);

    return null; // Компонент не отображает ничего
};

export default Redirect;
