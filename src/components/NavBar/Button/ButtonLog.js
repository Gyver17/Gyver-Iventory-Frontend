import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider"
import { useNavigate } from "react-router-dom";
import { types } from "../../../context/authReducer"
import styles from './style.module.css'
import { url } from '../../../url'

const ButtonLog = () => {
    const navigate = useNavigate()

    const [, dispatch] = useContext(AuthContext)

    const clearSession = () => {
        dispatch({ type: types.authLogout })
        localStorage.removeItem('data')
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(url + "logout", {
                method: "GET",
                mode: 'cors',
                credentials: 'include',
                headers: { "Content-Type": "application/json" },
            });
            const message = await response.json();
            clearSession()
            navigate('/login')
            console.log(message)
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
