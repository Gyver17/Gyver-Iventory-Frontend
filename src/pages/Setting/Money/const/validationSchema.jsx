import * as yup from "yup";
import { expresions } from "../../../../const/ExpReg";

const initialValues = {
	name: "",
	symbol: "",
	value: 0,
};

const validationSchema = yup.object({
	name: yup
		.string()
		.matches(expresions.name, "Debe introducir un Nombre valido")
		.required("Debe introducir un Nombre"),
	symbol: yup
		.string()
		.min(1, "El symbolo debe tener minimo 1 caracter")
		.max(3, "El symbolo debe tener maximo 3 caracteres")
		.required("Debe introducir un symbolo"),
	value: yup
		.number()
		.positive("El valor debe ser positivo"),
});

export { initialValues, validationSchema };
