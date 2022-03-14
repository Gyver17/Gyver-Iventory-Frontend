import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";
import { types } from "../../../context/authReducer";
import { logout } from "../../../api/log";
import styles from "./style.module.css";

const ButtonLog = () => {
    const [state, dispatch] = useContext(AuthContext);
    const { user } = state;

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await logout(user.token);
            dispatch({ type: types.authLogout });
            localStorage.removeItem("user");
            localStorage.removeItem("permissions");
            localStorage.removeItem("setting");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.button_container}>
                <button onClick={handleSubmit} className={styles.button}>
                    <i className='icon iconin-alt'></i>
                    <div className={styles.logout}>Logout</div>
                </button>
            </div>
        </div>
    );
};

export default ButtonLog;
