/* ------ Library Import ------ */
import React, { useEffect, useState, useContext } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useQueryClient } from "react-query";
// import NumberFormat from "react-number-format";

/* ------ Components Import ------ */
import Header from "../Header/Header";
import AccountingData from "../AccountingData/AccountingData";
import ProductModal from "../ProductModal/ProductModal";
// import Modal from "../../../../../components/Modal/Modal";
import DataTable from "../../../../../components/DataTable/DataTable";
// import PageLoading from "../../../../../components/PageLoading/PageLoading";
// import SessionExpired from "../../../../../components/SessionExpired/SessionExpired";
import ButtonForm from "../../../../../components/ButtonForm/ButtonForm";
import ToasterMessage, {
toast,
} from "../../../../../components/ToasterMessage/ToasterMessage";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
// import { getProducts } from "../../../../../api/products";
import { createInvoiceReturnPurchases } from "../../../../../api/invoicePurchases"
import { AuthContext } from "../../../../../context/authProvider";
// import { expresions } from "../../../../../const/ExpReg";
import { columnProduct } from "../../const/dataTableProps";
import sendValues from "../../const/values"
import formartNumber from "../../../../../helpers/formatNumber";

/* ------ Component ------ */
function InvoiceById({ renderInvoiceById, setRenderInvoiceById }) {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user, setting } = state;

	const { row } = renderInvoiceById;
	const [startDate, setStartDate] = useState(new Date());
	const [modal, setModal] = useState({ isOpen: false, title: "" });
	const [productsReturn, setProductsReturn] = useState([]);
    const [requestLoading, setRequestLoading] = useState(false);

    const queryClient = useQueryClient();
	const {
		control,
		handleSubmit,
		setValue,
		getValues,
		reset,
		formState: { errors },
	} = useForm({
		// defaultValues: initialValues,
		// resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		const subTotal = productsReturn.reduce(
			(prev, next) => prev + (next["price_total"] || 0),
			0
		);

		setValue("subTotal", subTotal);
		setValue("iva", subTotal * setting.iva);
		setValue("total", subTotal + getValues("iva"));
	}, [productsReturn, setValue, getValues, setting]);

	const deleteProductReturn = (row) => {
		const newProductsReturn = productsReturn.filter(
			(product) => product.id !== row.id
		);
		setProductsReturn(newProductsReturn);
	};

	const button = [
		{
			icon: "icon iconplus",
			render: true,
			onClick: () =>
				setModal({ isOpen: true, title: "Agregar Producto" }),
		},
	];

	const action = [
		{
			icon: "icon icontrash-can3",
			render: true,
			onClick: (row) => deleteProductReturn(row),
		},
	];

	const clear = () => {
        setProductsReturn([]);
        setStartDate(new Date());
    };

    const onSubmit = async (data) => {
    	if(data.subTotal <= 0) {
			return toast.error("Debe Agregar Un Producto A Devolver");
    	}
    	setRequestLoading(true)
        const values = sendValues(data, startDate, row, productsReturn)
        const request = await createInvoiceReturnPurchases(
            user.token,
            values,
            dispatch,
            toast,
            queryClient
        );
        if (request) clear();
        setRequestLoading(false);
    };

	return (
		<>
			<ToasterMessage />
			<div className={styles.container}>
				<Header
					title={"Factura a Devolver #" + row?.number}
					startDate={startDate}
					setStartDate={setStartDate}
					render={true}
					onClick={() =>
						setRenderInvoiceById({ render: false, row: {} })
					}
				/>
				<div className={styles.body}>
					<span className={styles.subTitle}>
						Detalles de la Factura
					</span>
					<div className={styles.details}>
						<span>Proveedor: {row?.name_supplier}</span>
						<span>Empleado: {row?.name_employee}</span>
						<span>Fecha de Facturación: {row?.date}</span>
						<span>
							Monto Total:{" "}
							{setting?.first_symbol +
								" " +
								formartNumber(
									row?.price_total,
									setting?.number_format,
									setting?.qty_decimal
								)}
						</span>
					</div>
					<DataTable
						numberOfEntries={[5, 10, 15, 20]}
						// searchData={searchData}
						headerButtons={button}
						header={columnProduct}
						data={productsReturn}
						aroundCurrentPage={5}
						formatDecimal={setting?.number_format}
						quantityDecimal={setting?.qty_decimal}
						moneySymbol={setting?.first_symbol}
						action={action}
					/>
					<AccountingData
						control={control}
						setValue={setValue}
						errors={errors}
					/>
				</div>
				<div className={styles.buttons}>
					<ButtonForm title='Limpiar' onClick={clear} />
					<ButtonForm
						title={requestLoading ? "...Registrando" : "Registrar"}
						onClick={handleSubmit(onSubmit)}
					/>
				</div>
			</div>
			<ProductModal
				form={modal}
				setForm={setModal}
				productsInvoice={productsReturn}
				setProductsInvoice={setProductsReturn}
				setValue={setValue}
				row={row}
			/>
		</>
	);
}

export default InvoiceById;
