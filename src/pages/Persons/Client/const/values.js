import * as yup from "yup";
import { expresions } from "../../../../const/ExpReg";

const initialValues = {
	code: "",
	name: "",
	mail: "",
	docIdSelect: "",
	docIdNumber: "",
	numberPhoneSelect: "",
	numberPhoneNumber: "",
};

const adaptValues = (values) => {
	const { code, name, doc_id, mail, phone } = values;
	const numberPhone = phone.split("-");
	const docId = doc_id.split("-");

	const inputValues = {
		code,
		name,
		mail,
		docIdSelect: docId[0],
		docIdNumber: docId[1],
		numberPhoneSelect: numberPhone[0],
		numberPhoneNumber: numberPhone[1],
	};

	return inputValues;
};

const validationSchema = yup.object({
	code: yup
		.string()
		.matches(expresions.code, "Debe introducir un codigo valido")
		.required("Debe introducir un codigo"),
	name: yup
		.string()
		.matches(expresions.name, "Debe introducir un nombre valido")
		.required("Debe introducir un nombre"),
	mail: yup
		.string()
		.email("Debe introducir un correo electrónico valido")
		.required("Debe introducir un electrónico valido"),
	docIdSelect: yup
		.string()
		.required("Debe seleccionar una letra de identificación fiscal"),
	docIdNumber: yup
		.string()
		.matches(
			expresions.docId,
			"Debe introducir un número de identificación valido, y debe tener de 6 a 12 digitos"
		)
		.required("Debe introducir un número de identificación"),
	numberPhoneSelect: yup
		.string()
		.required("Debe seleccionar un prefijo telefónico"),
	numberPhoneNumber: yup
		.string()
		.matches(
			expresions.numberPhone,
			"Debe introducir un número telefónico valido"
		)
		.required("Debe introducir un Número telefónico"),
});

const sendValues = (values) => {
	return {
		code: values.code,
		name: values.name,
		doc_id: values.docIdSelect + "-" + values.docIdNumber,
		mail: values.mail,
		phone: values.numberPhoneSelect + "-" + values.numberPhoneNumber,
	};
};

export { initialValues, adaptValues, validationSchema, sendValues };
