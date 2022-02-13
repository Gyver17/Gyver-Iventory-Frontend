/* ------ Library Import ------ */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";

/* ------ Components Import ------ */
import Loader from "../../../../components/Loader/Loader";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { AuthContext } from "../../../../context/authProvider";
import { types } from "../../../../context/authReducer";
import { initialValues, validationValues } from "./values";
import useLogin from "./hooks/useLogin";

/* ------ Component ------ */
const FormLogin = () => {
    const navigate = useNavigate();
    const [, dispatch] = useContext(AuthContext);
    const [handleLogin, message, loading] = useLogin(navigate, dispatch, types);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationValues),
    });

    const onSubmit = (data) => {
        handleLogin(data);
    };

    return (
        <div className={styles.form}>
            <h3>Iniciar Sección</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                {message && (
                    <ErrorMessage message={message} style={{ width: "100%" }} />
                )}

                <div className={styles.mail}>
                    <input type='text' placeholder=' ' {...register("mail")} />
                    <label>Correo Electrónico:</label>
                    <span></span>
                </div>
                {errors.mail?.message && (
                    <ErrorMessage
                        message={errors.mail.message}
                        style={{ width: "100%" }}
                    />
                )}

                <div className={styles.password}>
                    <input
                        type='password'
                        placeholder=' '
                        {...register("password")}
                    />
                    <label>Contraseña:</label>
                    <span></span>
                </div>
                {errors.password?.message && (
                    <ErrorMessage
                        message={errors.password.message}
                        style={{ width: "100%" }}
                    />
                )}

                <button className={styles.button} type='submit'>
                    {loading ? <Loader /> : "Iniciar"}
                </button>
            </form>
        </div>
    );
};

export default FormLogin;
