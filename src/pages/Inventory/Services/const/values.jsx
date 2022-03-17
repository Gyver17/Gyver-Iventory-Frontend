import * as yup from "yup";
import { expresions } from "../../../../const/ExpReg";

const initialValues = {
	code: "",
	name: "",
	description: "",
	unit_symbol: "",
	price_unit: "",
};

const validationSchema = yup.object({
	code: yup
		.string()
		.matches(expresions.code, "Debe introducir un Codigo valido")
		.required("Debe introducir un Codigo"),
	name: yup
		.string()
		.matches(expresions.name, "Debe introducir un Nombre valido")
		.required("Debe introducir un Nombre"),
	description: yup
		.string()
		.matches(
			expresions.observation,
			"Debe introducir una Descripcion  valida"
		)
		.required("Debe introducir una Descripcion"),
	unit_symbol: yup
		.string()
		.matches(
			expresions.unitSymbol,
			"Debe introducir un Symbolo  valido, que debe contener de 1 a 4 caracteres"
		)
		.required("Debe introducir un Symbolo"),
	price_unit: yup.string().required("Debe introducir un Precio Por Unidad"),
});

export { initialValues, validationSchema };
