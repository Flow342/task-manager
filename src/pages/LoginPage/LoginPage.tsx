import styles from "./LoginPage.module.sass";
import { FC, FormEvent, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../../store/userApi";
import { useNavigate } from "react-router-dom";

const LoginPage: FC = () => {
    const [pass, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [loginUser] = useLoginMutation();
    const navigate = useNavigate();

    const dataReset = () => {
        setPass("");
        setEmail("");
    };

    const loginHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await loginUser({ email, pass }).unwrap();
        } catch (err) {
            console.error("Failed to login", err);
        } finally {
            navigate("/feed");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                <h1>Login</h1>
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
