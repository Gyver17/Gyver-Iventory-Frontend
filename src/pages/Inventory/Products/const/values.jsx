import * as yup from "yup";
import { expresions } from "../../../../const/ExpReg";

const initialValues = {
	code: "",
	name: "",
	id_category: "",
	quantity: 0,
	price_buy: 0,
	price_sell: 0,
};

const validationSchema = yup.object({
	code: yup
		.string()
		.matches(expresions.code, "Debe introducir un Codigo valido")
		.required("Debe introducir un Codigo"),
	name: yup
		.string()
		.matches(expresions.productName, "Debe introducir un Nombre valido")
		.required("Debe introducir un Nombre"),
	id_category: yup.string().required("Debe seleccionar una Categoria"),
	quantity: yup.number().required("Debe introducir una Cantidad"),
	price_buy: yup
		.number()
		.required("Debe introducir un Precio de Compra")
		.test(
			"precio-buy",
			"El Precio de Compra es mayor al de Venta",
			(price_buy, value) => {
				const { price_sell } = value.parent;
				if (price_buy >= price_sell) {
					return false;
				} else {
					return true;
				}
			}
		),
	price_sell: yup
		.number()
		.required("Debe introducir un Precio de Venta")
		.test(
			"precio-sell",
			"El Precio de Compra es mayor al de Venta",
			(price_sell, value) => {
				const { price_buy } = value.parent;
				if (price_buy >= price_sell) {
					return false;
				} else {
					return true;
				}
			}
		),
});

export { initialValues, validationSchema };
