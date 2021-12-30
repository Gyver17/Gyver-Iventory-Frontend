import { useState, useContext } from 'react'
import { AuthContext } from "../../../../context/authProvider"
import styles from './style.module.css'
import { types } from "../../../../context/authReducer"
import { url } from '../../../../url'
import { useNavigate } from 'react-router-dom'

const Form = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        mail: "",
        password: "",
    });

    const [, dispatch] = useContext(AuthContext)

    const addSession = (data) =>{
        dispatch({
            type: types.authLogin,
            payload: {data}
        })
        localStorage.setItem('data', JSON.stringify(data))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await fetch(
                url + "login",
                {
                    method: "POST",
                    mode: 'cors',
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(user),
                }
            );
            const { data, message } = await response.json()
            if(data){
                await addSession(data);
                navigate('/')
            }
            console.log(message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.form}>
            <h3>Iniciar Sección</h3>
            <form>
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
                <input type="submit"
                    value="Iniciar"
                    className={styles.button}
                    onClick={handleSubmit}
                />
            </form>
        </div>
    )
}

export default Form
