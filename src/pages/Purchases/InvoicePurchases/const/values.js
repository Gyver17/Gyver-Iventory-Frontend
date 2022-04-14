import * as yup from "yup";

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
	description: "",
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
});

export { initialValues, validationSchema };
