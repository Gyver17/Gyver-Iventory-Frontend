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
		first_symbol,
		first_value,
		second_symbol,
		second_value,
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
		// firstCurrency: first_symbol + " - " + first_value,
		// firstCurrencyNumber: first_value,
		secondCurrency: id_money_2,
		// secondCurrency: second_symbol + " - " + second_value,
		// secondCurrencyNumber: second_value,
		numberFormat: number_format,
		decimalQuantity: qty_decimal,
		porcentIva: iva * 100,
	};

	return inputValues;
};

const currencyList = (currencys) => {
	const list = [];
	currencys.map((currency) =>
		list.push({
			value: currency.id,
			label: `${currency.name}, ${currency.symbol}  ${currency.value}`,
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
		.number()
		.min(6, "El número de identificación debe tener mínimo 1 digito")
		.max(12, "El número de identificación debe tener máximo 3 digitos")
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
		.number()
		.positive("El valor debe ser positivo")
		.max(100, "El porcentaje de IVA no debe ser mayor a 100"),
});

const sendValues = (values) => {
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
		iva: values.porcentIva,
		number_format: values.numberFormat,
		qty_decimal: values.decimalQuantity / 100,
	};
};

export { initialValues, currencyList, validationSchema, sendValues };
