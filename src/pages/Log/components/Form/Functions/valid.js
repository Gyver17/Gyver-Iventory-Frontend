import { expresions } from "../../../../../const/ExpReg"

const valid = (user) => {
    const { mail, password } = user
    if (!expresions.email.test(mail)) {
        return { bool: false, message: 'Introduzca un Correo Electronico Valido' }
    }
    if (password === '') {
        return { bool: false, message: 'Introduzca una Contraseña' }
    }
    return { bool: true }
}

export { valid }