import { Dispatch, FC, SetStateAction } from "react";
import styles from "./AuthForm.module.sass";
import EmailAndPassInputs from "../EmailAndPassInputs/EmailAndPassInputs";
import AuthInput from "../../UI/FormInput/FormInput";
import Button from "../../UI/Button/Button";

interface IAuthForm {
    pass: string;
    setPass: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    setName?: Dispatch<SetStateAction<string>>;
}

const AuthForm: FC<IAuthForm> = ({
    pass,
    setPass,
    email,
    setEmail,
    onSubmit,
    setName,
}) => {
    return (
        <form onSubmit={(e) => onSubmit(e)} className={styles.auth_form}>
            {setName && (
                <AuthInput placeholder="Name" setValue={setName} required />
            )}
            <EmailAndPassInputs
                email={email}
                pass={pass}
                setEmail={setEmail}
                setPass={setPass}
            />
            <div className={styles.auth_form_button}>
                <Button type="submit">Submit</Button>
            </div>
        </form>
    );
};

export default AuthForm;
