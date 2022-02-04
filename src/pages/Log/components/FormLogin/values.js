import * as Yup from "yup"

const initialValues = {
    mail: "",
    password: ""
}

const validationValues = Yup.object({
    mail: Yup.string().email("Debe introducir un Correo Electrónico Valido").required("Debe introducir un Correo Electrónico"),
    password: Yup.string().required("Debe introducir una Contraseña")
})

export { initialValues, validationValues }