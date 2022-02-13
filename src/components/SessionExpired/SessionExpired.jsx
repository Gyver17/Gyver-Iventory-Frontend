import styles from "./style.module.css"
import { useContext } from "react";
import { AuthContext } from "../../context/authProvider";
import { types } from "../../context/authReducer";


const SessionExpired = ({serverError}) => {

    const [, dispatch] = useContext(AuthContext)

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            dispatch({ type: types.clearSession })
            localStorage.removeItem('data')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <h3>{serverError ? "Ha ocurrido un fallo en el servidor" : "La Sección a Expirado, por favor vuelva a iniciar sessión"}</h3>
                </div>
                <button className={styles.button} onClick={handleSubmit}>
                    Aceptar
                </button>
            </div>
        </div>
    );
};

export default SessionExpired;
