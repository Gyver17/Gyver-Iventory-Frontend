import * as yup from "yup";
import { expresions } from "../../../../../const/ExpReg";

const initialValues = {
    user: {
        name: "",
        mail: "",
        rol: "",
        isPassword: true,
        password: "",
        repeatPassword: "",
    },
    permissions: {
        products: false,
        products_create: false,
        products_update: false,
        products_delete: false,
        category: false,
        category_create: false,
        category_update: false,
        category_delete: false,
        services: false,
        services_create: false,
        services_update: false,
        services_delete: false,
        client: false,
        client_create: false,
        client_update: false,
        client_delete: false,
        supplier: false,
        supplier_create: false,
        supplier_update: false,
        supplier_delete: false,
        employee: false,
        employee_create: false,
        employee_update: false,
        employee_delete: false,
        buy: false,
        buy_return: false,
        buy_pay: false,
        sell: false,
        sell_return: false,
        sell_pay: false,
        consult_product: false,
        consult_invoice: false,
        consult_movement: false,
        consult_supplier: false,
        consult_client: false,
        setting: false,
    },
};

const validationSchema = yup.object({
    user: yup.object({
        name: yup
            .string()
            .matches(
                expresions.name,
                "Debe introducir un Nombre y Apellido valido"
            )
            .required("Debe introducir un Nombre y Apellido"),
        mail: yup
            .string()
            .email("Debe introducir un Correo Electrónico Valido")
            .required("Debe introducir un Correo Electrónico"),
        rol: yup.string().required("Debe seleccionar un Rol"),
        password: yup.string().when("isPassword", {
            is: true,
            then: yup
                .string()
                .min(4, "La Contraseña debe tener minimo 4 caracteres")
                .max(20, "La Contraseña debe tener maximo 20 caracteres")
                .matches(
                    expresions.password,
                    "Contraseña invalida, solo se acepta letras, y numeros"
                )
                .required("Debe introducir una Contraseña"),
        }),
        repeatPassword: yup
            .string()
            .when("isPassword", {
            is: true,
            then: yup
                .string()
                .required("Debe introducir una Contraseña")
            .oneOf(
                [yup.ref("password"), null],
                "Las Contraseñas tienen que coincidir"
            )
        }),
    }),
});

export { initialValues, validationSchema };
