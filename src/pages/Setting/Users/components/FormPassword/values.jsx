import * as yup from "yup";
import { expresions } from "../../../../../const/ExpReg";

const initialValues = {
	user: {
		password: "",
		repeatPassword: "",
	},
};

const validationSchema = yup.object({
	user: yup.object({
		password: yup
			.string()
			.min(4, "La Contraseña debe tener minimo 4 caracteres")
			.max(20, "La Contraseña debe tener maximo 20 caracteres")
			.matches(
				expresions.password,
				"Contraseña invalida, solo se acepta letras, y numeros"
			)
			.required("Debe introducir una Contraseña"),
		repeatPassword: yup
			.string()
			.required("Debe introducir una Contraseña")
			.oneOf(
				[yup.ref("password"), null],
				"Las Contraseñas tienen que coincidir"
			),
	}),
});

export { initialValues, validationSchema };
