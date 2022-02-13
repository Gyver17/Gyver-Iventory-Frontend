/* ------ Imports ------ */
import React from "react";
import TextField from "../../../../../../components/TextField/TextField";
import styles from "./style.module.css";
import SelectField from "../../../../../../components/SelectField/SelectField";
import ErrorMessage from "../../../../../../components/ErrorMessage/ErrorMessage"

/* ------ Component ------ */
const InputUser = ({ update, control, setSelectValue, errors }) => {
    const options = [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuarios" },
    ];
    
    return (
        <div className={styles.container}>
            <span className={styles.title}>Datos del Usuario</span>
            <div className={styles.containerInputs}>
                <SelectField
                    name='user.rol'
                    options={options}
                    control={control}
                    setValue={setSelectValue}
                    title='Rol del Usuario'
                    noOptionsMessage='Rol No Encontrado'
                    placeholder='Seleccione Un Rol'
                />
                {errors.user?.rol?.message && <ErrorMessage message={errors.user.rol.message}/>}
                <TextField
                    name='user.name'
                    type='text'
                    control={control}
                    title='Nombre y Apellido'
                    placeholder='Escribir Nombre y Apellido'
                    icon='icon iconprofile1'
                />
                {errors.user?.name?.message && <ErrorMessage message={errors.user.name.message}/>}
                <TextField
                    name='user.mail'
                    type='text'
                    control={control}
                    title='Correo Electrónico'
                    placeholder='Escribir un Correo Electrónico'
                    icon='icon iconaddressbook1'
                />
                {errors.user?.mail?.message && <ErrorMessage message={errors.user.mail.message}/>}
                {!update && (
                    <div>
                        <TextField
                            name='user.password'
                            type='password'
                            control={control}
                            title='Contraseña'
                            placeholder='Escribir una Contraseña'
                            icon='icon iconlock2'
                        />
                        {errors.user?.password?.message && <ErrorMessage message={errors.user.password.message}/>}
                        <TextField
                            name='user.repeatPassword'
                            type='password'
                            control={control}
                            title='Confirmar Contraseña'
                            placeholder='Repetir Contraseña'
                            icon='icon iconlock-rounded1'
                        />
                        {errors.user?.repeatPassword?.message && <ErrorMessage message={errors.user.repeatPassword.message}/>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(InputUser);
