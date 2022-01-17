import { useState, useContext } from 'react'
import { AuthContext } from "../../../../context/authProvider"
import styles from './style.module.css'
import { types } from "../../../../context/authReducer"
import { useNavigate } from 'react-router-dom'
import { login } from './Functions/auth'
import { valid } from './Functions/valid'
import Loader from '../../../../components/Loader/Loader'

const Form = () => {
    const navigate = useNavigate()

    const [user, setUser] = useState({
        mail: "",
        password: "",
    });
    const [val, setVal] = useState({ message: '', valid: false })
    const [loading, setLoading] = useState(false)

    const [, dispatch] = useContext(AuthContext)

    const addSession = (data) => {
        dispatch({
            type: types.authLogin,
            payload: data
        })
        localStorage.setItem('data', JSON.stringify(data))
    }

    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            const validation = valid(user)
            if (validation.bool) {
                const auth = await login(user)
                if (auth.data) {
                    addSession(auth.data);
                    navigate('/')
                } else {
                    setLoading(false)
                    setVal({ message: auth.message, valid: true })
                };
            } else {
                setLoading(false)
                setVal({ message: validation.message, valid: true })
            }
        } catch (error) {
            window.location.reload(true);
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.form}>
            <h3>Iniciar Sección</h3>
            <form>
                {val.valid && <div className={styles.valid}>*{val.message}</div>}
                <div className={styles.mail}>
                    <input
                        type="email"
                        placeholder=" "
                        name="mail"
                        onChange={handleChange} />
                    <label>Correo Electrónico:</label>
                    <span></span>
                </div>
                <div className={styles.password}>
                    <input
                        type="password"
                        placeholder=" "
                        name="password"
                        onChange={handleChange} />
                    <label>Contraseña:</label>
                    <span></span>
                </div>
                <button
                    className={styles.button}
                    onClick={handleSubmit} >
                    {loading ? <Loader /> : 'Iniciar'}
                </button>
            </form>
        </div>
    )
}

export default Form
