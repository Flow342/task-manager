import { Dispatch, FC, SetStateAction, useState } from "react";
import FormInput from "../../UI/FormInput/FormInput";
import styles from "./EmailAndPassInputs.module.sass";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

interface IEmailAndPassInputs {
    pass: string;
    setPass: Dispatch<SetStateAction<string>>;
    email: string;
    setEmail: Dispatch<SetStateAction<string>>;
}

const EmailAndPassInputs: FC<IEmailAndPassInputs> = ({
    pass,
    setPass,
    email,
    setEmail,
}) => {
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);

    const togglePassVisible = () => {
        setIsPassVisible(!isPassVisible);
    };

    return (
        <div>
            <div className={styles.email_input}>
                <FormInput
                    placeholder="Email"
                    value={email}
                    setValue={setEmail}
                    type="email"
                    required
                    name="email"
                    autoComplete="email"
                />
            </div>
            <div className={styles.pass_input}>
                <FormInput
                    placeholder="Password"
                    value={pass}
                    setValue={setPass}
                    type={isPassVisible ? undefined : "password"}
                    required
                    name="pass"
                />
                {isPassVisible ? (
                    <AiFillEye
                        onClick={togglePassVisible}
                        className={styles.icon}
                    />
                ) : (
                    <AiFillEyeInvisible
                        onClick={togglePassVisible}
                        className={styles.icon}
                    />
                )}
            </div>
        </div>
    );
};

export default EmailAndPassInputs;
