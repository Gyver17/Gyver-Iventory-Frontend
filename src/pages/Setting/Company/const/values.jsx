import * as yup from "yup";
import { expresions } from "../../../../const/ExpReg";

const initialValues = (values) => {
	const {
		company_name,
		company_mail,
		company_phone_first,
		company_phone_second,
		company_rif,
		id_money_1,
		id_money_2,
		iva,
		number_format,
		qty_decimal,
	} = values;
	const firstPhone = company_phone_first.split("-");
	const secondPhone = company_phone_second.split("-");
	const rif = company_rif.split("-");

	const inputValues = {
		companyName: company_name,
		companyMail: company_mail,
		rifSelect: rif[0],
		rifNumber: rif[1],
		firstPhoneSelect: firstPhone[0],
		firstPhoneNumber: firstPhone[1],
		secondPhoneSelect: secondPhone[0],
		secondPhoneNumber: secondPhone[1],
		firstCurrency: id_money_1,
		secondCurrency: id_money_2,
		numberFormat: number_format,
		decimalQuantity: qty_decimal,
		porcentIva: iva * 100,
	};

	return inputValues;
};

const currencyList = (currencys, setting) => {
	const list = [];
	let format = "";
	const config = {
		minimumFractionDigits: setting.qty_decimal,
	};

	if (setting.number_format === "0.000,00") {
		format = "en-US";
	} else {
		format = "de-DE";
	}

	currencys.map((currency) =>
		list.push({
			value: currency.id,
			label: `${currency.name}, ${currency.symbol}  ${Intl.NumberFormat(
				format,
				config
			).format(currency.value)}`,
		})
	);
	return list;
};

const validationSchema = yup.object({
	companyName: yup
		.string()
		.matches(expresions.name, "Debe introducir un nombre valido")
		.required("Debe introducir un nombre"),
	companyMail: yup
		.string()
		.email("Debe introducir un correo electrónico valido")
		.required("Debe introducir un electrónico valido"),
	rifSelect: yup
		.string()
		.required("Debe seleccionar una letra de identificación fiscal"),
	rifNumber: yup
		.string()
		.matches(
			expresions.docId,
			"Debe introducir un número de identificación valido, y debe tener de 6 a 12 digitos"
		)
		.required("Debe introducir un número de identificación"),
	firstPhoneSelect: yup
		.string()
		.required("Debe seleccionar un prefijo telefónico"),
	firstPhoneNumber: yup
		.string()
		.matches(
			expresions.numberPhone,
			"Debe introducir un número telefónico valido"
		)
		.required("Debe introducir un Número telefónico"),
	secondPhoneSelect: yup
		.string()
		.required("Debe seleccionar un prefijo telefónico"),
	secondPhoneNumber: yup
		.string()
		.matches(
			expresions.numberPhone,
			"Debe introducir un número telefónico valido"
		)
		.required("Debe introducir un numero telefónico"),
	numberFormat: yup
		.string()
		.required("Debe seleccionar un prefijo telefónico"),
	decimalQuantity: yup
		.string()
		.required("Debe seleccionar un prefijo telefónico"),
	porcentIva: yup
		.string()
		.required("Debe introducir un numero"),
});

const sendValues = (values) => {
	const iva = values.porcentIva.replace(".,", "");
	return {
		company_name: values.companyName,
		company_mail: values.companyMail,
		company_phone_first:
			values.firstPhoneSelect + "-" + values.firstPhoneNumber,
		company_phone_second:
			values.secondPhoneSelect + "-" + values.secondPhoneNumber,
		company_rif: values.rifSelect + "-" + values.rifNumber,
		id_money_1: values.firstCurrency,
		id_money_2: values.secondCurrency,
		iva: iva / 100,
		number_format: values.numberFormat,
		qty_decimal: values.decimalQuantity,
	};
};

export { initialValues, currencyList, validationSchema, sendValues };
