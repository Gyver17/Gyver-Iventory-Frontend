import { useContext } from 'react'
import { Formik, Form, Field } from "formik"
import { AuthContext } from "../../../../context/authProvider"
import { types } from "../../../../context/authReducer"
import { useNavigate } from 'react-router-dom'
import { initialValues, validationValues } from './values'
import styles from './style.module.css'
import Loader from '../../../../components/Loader/Loader'
import useLogin from './hooks/useLogin'

const FormLogin = () => {
    const navigate = useNavigate()
    const [, dispatch] = useContext(AuthContext)
    const [handleLogin, message, loading] = useLogin(navigate, dispatch, types)

    return (
        <div className={styles.form}>
            <h3>Iniciar Sección</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationValues}
                onSubmit={values => {
                    handleLogin(values)
                }}
            >
                {({ errors }) => (
                    <Form >
                        {(errors.mail || errors.password || message)
                            && <div className={styles.valid}>
                                *{errors.mail || errors.password || message}
                            </div>}

                        <div className={styles.mail}>
                            <Field
                                type="email"
                                placeholder=" "
                                name="mail" />
                            <label>Correo Electrónico:</label>
                            <span></span>
                        </div>

                        <div className={styles.password}>
                            <Field
                                type="password"
                                placeholder=" "
                                name="password" />
                            <label>Contraseña:</label>
                            <span></span>
                        </div>

                        <button
                            className={styles.button}
                            type="submit" >
                            {loading ? <Loader /> : 'Iniciar'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default FormLogin
