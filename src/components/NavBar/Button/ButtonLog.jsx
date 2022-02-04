import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider"
import { types } from "../../../context/authReducer"
import styles from './style.module.css'

const ButtonLog = () => {

    const [, dispatch] = useContext(AuthContext)

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            dispatch({ type: types.authLogout })
            localStorage.removeItem('data')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.button_container}>
                <button onClick={handleSubmit} className={styles.button}>
                    <i className="icon iconin-alt"></i>
                    <div className={styles.logout}>Logout</div>
                </button>
            </div>
        </div>
    )
}

export default ButtonLog
