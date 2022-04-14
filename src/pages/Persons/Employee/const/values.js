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
	salary: 0,
	comSales: 0,
	comServices: 0,
};

const adaptValues = (values) => {
	const { code, name, doc_id, mail, phone, salary, com_sell, com_service } =
		values;
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
		salary: parseFloat(salary),
		comSales: 100 * parseFloat(com_sell),
		comServices: 100 * parseFloat(com_service),
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
	salary: yup.number().required("Debe introducir un salario"),
	comSales: yup.number().required("Debe introducir un numero"),
	comServices: yup.number().required("Debe introducir un numero"),
});

const sendValues = (values, format) => {
	return {
		code: values.code,
		name: values.name,
		doc_id: values.docIdSelect + "-" + values.docIdNumber,
		mail: values.mail,
		phone: values.numberPhoneSelect + "-" + values.numberPhoneNumber,
		salary: values.salary,
		com_sell: values.comSales / 100,
		com_service: values.comServices / 100,
	};
};

export { initialValues, adaptValues, validationSchema, sendValues };
