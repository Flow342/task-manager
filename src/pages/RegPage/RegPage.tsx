import styles from "./RegPage.module.sass";
import { FC, FormEvent, useState } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../../store/userApi";
import { useDispatch } from "react-redux";
import { setUserName } from "../../store/reducers/userSlice";

const RegPage: FC = () => {
    const [pass, setPass] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>("");
    const [regUser] = useRegisterMutation();
    const dispatch = useDispatch();

    const dataReset = () => {
        setPass("");
        setEmail("");
    };

    const regHandle = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (pass.length >= 8) {
            await regUser({
                email,
                pass,
                name,
            })
                .unwrap()
                .catch((error) => setError(error.message))
                .finally(() => dispatch(setUserName(name)));
        } else {
            setError("Password must be at least 8 characters long.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                <h1>Register</h1>
                {!!error && <p className={styles.auth_error}>{error}</p>}
                <AuthForm
                    pass={pass}
                    setPass={setPass}
                    email={email}
                    setEmail={setEmail}
                    onSubmit={regHandle}
                    setName={setName}
                    name={name}
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
