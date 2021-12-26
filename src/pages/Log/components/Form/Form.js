import React from 'react'
import styles from './style.module.css'

const Form = () => {
    return (
        <div className={styles.form}>
            <h3>Iniciar Sección</h3>
            <form method="post">
                <div className={styles.mail}>
                    <input type="text" placeholder=" "></input>
                    <label>Correo Electrónico:</label>
                    <span></span>
                </div>
                <div className={styles.password}>
                    <input type="password" placeholder=" "></input>
                    <label>Contraseña:</label>
                    <span></span>
                </div>
                <input type="submit" value="Iniciar" className={styles.button} />
            </form>
        </div>
    )
}

export default Form
