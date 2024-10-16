import styles from "./LoginPage.module.sass";
import { FC, FormEvent, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../store/userApi";
import logo from "../../assets/logo.svg";

const LoginPage: FC = () => {
    const [pass, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>("");
    const [loginUser] = useLoginMutation();

    const dataReset = () => {
        setPass("");
        setEmail("");
    };

    const loginHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        await loginUser({ email, pass })
            .unwrap()
            .catch((error) => setError(error.message));
    };

    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" />
            </div>
            <div className={styles.auth}>
                <h1>Login</h1>
                {!!error && <p className={styles.auth_error}>{error}</p>}
                <AuthForm
                    pass={pass}
                    setPass={setPass}
                    email={email}
                    setEmail={setEmail}
                    onSubmit={loginHandle}
                />
                <div className={styles.toggle_auth_type}>
                    Don't have an account?{" "}
                    <Link
                        onClick={dataReset}
                        to={"/register"}
                        className={styles.toggle_auth_type_button}
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
