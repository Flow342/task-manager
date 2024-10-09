import styles from "./RegPage.module.sass";
import { FC, FormEvent, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/userApi";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/reducers/userSlice";

const RegPage: FC = () => {
    const [pass, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [regUser] = useRegisterMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dataReset = () => {
        setPass("");
        setEmail("");
    };

    const regHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); //протестировать без preventDefault
        if (pass.length >= 8) {
            try {
                await regUser({
                    email,
                    pass,
                    name,
                }).unwrap();
                dispatch(setUserName(name));
            } catch (err) {
                console.log(error);
            } finally {
                navigate("/feed");
            }
        } else {
            setError("The minimum number of characters in a password - 8");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                <h1>Register</h1>
                {error && <p>{error}</p>}
                <AuthForm
                    pass={pass}
                    setPass={setPass}
                    email={email}
                    setEmail={setEmail}
                    onSubmit={regHandle}
                    setName={setName}
                />
                <div className={styles.toggle_auth_type}>
                    Already have an account?{" "}
                    <Link
                        onClick={dataReset}
                        to={"/login"}
                        className={styles.toggle_auth_type_button}
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegPage;
