import React, {useCallback} from "react";
import TextField from "../../../../../../components/TextField/TextField";
import styles from "./style.module.css";
import { Field } from "formik";
import SelectField from "../../../../../../components/SelectField/SelectField.jsx";

const InputUser = ({ update, handleChange }) => {
    const options = [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuarios" },
    ];
    const change = useCallback(
        () => {
            handleChange()
        },
        [handleChange],
    )
    return (
        <div className={styles.container}>
            <span className={styles.title}>Datos del Usuario</span>
            <div className={styles.containerInputs}>
                <Field
                    name='user.rol'
                    component={SelectField}
                    options={options}
                    title='Rol del Usuario'
                    noOptionsMessage='Rol No Encontrado'
                    placeholder='Seleccione Un Rol'
                />
                <TextField
                    name='user.name'
                    type='text'
                    onChange={change}
                    title='Nombre y Apellido'
                    placeholder='Escribir Nombre y Apellido'
                    icon='icon iconprofile1'
                />
                <TextField
                    name='user.mail'
                    type='email'
                    onChange={change}
                    title='Correo Electrónico'
                    placeholder='Escribir un Correo Electrónico'
                    icon='icon iconaddressbook1'
                />
                {update && (
                    <div>
                        <TextField
                            name='user.password'
                            type='password'
                            onChange={change}
                            title='Contraseña'
                            placeholder='Escribir una Contraseña'
                            icon='icon iconlock2'
                        />
                        <TextField
                            name='user.repeatPassword'
                            type='password'
                            onChange={change}
                            title='Repetir Contraseña'
                            placeholder='Repetir Contraseña'
                            icon='icon iconlock-rounded1'
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(InputUser);
