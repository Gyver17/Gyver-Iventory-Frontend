import * as yup from "yup";
import truncate from "../../../../helpers/truncate";

const initialValues = {
	id_employee: "",
	id_supplier: "",
	subTotal: 0,
	iva: 0,
	discount: 0,
	total: 0,
	credit: false,
	amountPay: 0,
	remainingAmount: 0,
	observation: "",
};

const validationSchema = yup.object({
	id_employee: yup.string().required("Debe seleccionar un Empleado"),
	id_supplier: yup.string().required("Debe seleccionar un Proveedor"),
	subTotal: yup
		.number()
		.required("Debe introducir un numero")
		.positive("Debe agregar un producto a la factura"),
	iva: yup
		.number()
		.required("Debe introducir un numero")
		.positive("Debe agregar un producto a la factura"),
	discount: yup
		.number()
		.required("Debe introducir un numero")
		.positive("Debe agregar un producto a la factura")
		.min(0, "Debe introducir un numero mayor o igual a 0")
		.max(100, "Debe introducir un numero menor o igual a 100"),
	total: yup
		.number()
		.required("Debe introducir un numero")
		.min(0, "Debe agregar un producto a la factura"),
	credit: yup.boolean(),
	amountPay: yup.number().when("credit", {
		is: true,
		then: yup
			.number()
			.test(
				"amount-pay",
				"El monto a abonar es mayor o igual al monto total de la factura",
				(amountPay, value) => {
					const { total } = value.parent;
					if (amountPay >= total) {
						return false;
					} else {
						return true;
					}
				}
			)
			.required("Debe introducir un numero"),
	}),
	remainingAmount: yup.number().when("credit", {
		is: true,
		then: yup
			.number()
			.required("Debe introducir un numero")
			.test(
				"remaining-amount",
				"El monto a abonar es mayor o igual al monto total de la factura",
				(remainingAmount) => {
					if (remainingAmount <= 0) {
						return false;
					} else {
						return true;
					}
				}
			),
	}),
	observation: yup.string(),
});

const sendValues = (data, date, numberInvoice, productsInvoice) => {
	const products = productsInvoice.map((product) => {
		return {
			id_product: product.id,
			quantity: product.quantity,
			price_total: product.totalPrice,
		};
	});
	const values = {
		number: numberInvoice,
		id_supplier: data.id_supplier,
		id_employee: data.id_employee,
		products: products,
		price_sub: truncate(data.subTotal, 2),
		price_porcent: truncate(
			(data.subTotal + data.iva) * (data.discount / 100),
			2
		),
		price_iva: truncate(data.iva, 2),
		price_total: truncate(data.total, 2),
		date:
			date.getDate() +
			"-" +
			(date.getMonth() + 1) +
			"-" +
			date.getFullYear(),
		credit: data.credit,
		amount_pay: truncate(data.amountPay, 2),
		amount_remaining: truncate(data.remainingAmount, 2),
		observation: data.observation || "",
	};
	return values;
};

export { initialValues, validationSchema, sendValues };
