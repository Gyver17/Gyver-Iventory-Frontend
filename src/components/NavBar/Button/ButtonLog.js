import { useNavigate } from "react-router-dom";
import styles from './style.module.css'

const ButtonLog = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/login')
    }
    return (
        <div className={styles.container}>
            <div className={styles.button_container}>
                <button onClick={handleClick} className={styles.button}>
                    <i className="icon iconin-alt"></i>
                    <div className={styles.logout}>Logout</div>
                </button>
            </div>
        </div>
    )
}

export default ButtonLog
