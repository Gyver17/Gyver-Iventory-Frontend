/* ------ Library Import ------ */
import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import NumberFormat from "react-number-format";

/* ------ Components Import ------ */
import Modal from "../../../../../components/Modal/Modal";
import DataTable from "../../../../../components/DataTable/DataTable";
import PageLoading from "../../../../../components/PageLoading/PageLoading";
import SessionExpired from "../../../../../components/SessionExpired/SessionExpired";
import ButtonForm from "../../../../../components/ButtonForm/ButtonForm";
import ToasterMessage, {
	toast,
} from "../../../../../components/ToasterMessage/ToasterMessage";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getProducts } from "../../../../../api/products";
import { AuthContext } from "../../../../../context/authProvider";
// import { expresions } from "../../../../../const/ExpReg";
import { columnModal, searchData } from "../../const/dataTableProps";
import formartNumber from "../../../../../helpers/formatNumber";

function ProductModal({ form, setForm, productsInvoice, setProductsInvoice }) {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user, setting } = state;
	const token = user.token;

	const [selectProduct, setSelectProduct] = useState({
		render: false,
		row: {},
	});
	const [productQuantityInvoice, setProductQuantityInvoice] = useState({
		quantity: 0,
	});
	const [separator, setSeparator] = useState({});

	useEffect(() => {
		const numberFormat = () => {
			setSelectProduct({ render: false, row: {} });
			if (setting?.number_format === "0.000,00") {
				setSeparator({
					thousands: ".",
					decimal: ",",
				});
			} else {
				setSeparator({
					thousands: ",",
					decimal: ".",
				});
			}
		};

		numberFormat();
	}, [setting]);

	// Props DataTable
	const { data, isSuccess, isError } = useQuery(
		["getProducts", user],
		async () => {
			const products = await getProducts(token, dispatch, toast);
			return products;
		}
	);

	if (isError) {
		return <SessionExpired serverError={true} />;
	}

	const action = [
		{
			icon: "icon iconplus",
			render: true,
			onClick: (row) => setSelectProduct({ render: true, row }),
		},
	];

	const handleClick = () => {
		const { row } = selectProduct;
		if (productQuantityInvoice.quantity === 0) {
			toast.error("Debe Ingresar Una Cantidad a Facturar");
		} else {
			const product = {
				id: productsInvoice.length,
				code: row.code,
				name: row.name,
				quantity: productQuantityInvoice.quantity,
				price_buy: row.price_buy,
				totalPrice: productQuantityInvoice.quantity * row.price_buy,
			};

			setProductsInvoice([...productsInvoice, product]);
			setForm({ isOpen: false, title: "" });
			setProductQuantityInvoice({ quantity: 0 });
			setSelectProduct({ render: false, row: {} });
		}
	};

	return (
		<>
			<ToasterMessage />
			<Modal isOpen={form.isOpen} setOpen={setForm} title={form.title}>
				{!isSuccess ? (
					<PageLoading />
				) : !selectProduct?.render ? (
					<DataTable
						title='Productos'
						numberOfEntries={[5, 10, 15, 20]}
						searchData={searchData}
						headerButtons={[]}
						header={columnModal}
						data={data}
						aroundCurrentPage={5}
						formatDecimal={setting?.number_format}
						quantityDecimal={setting?.qty_decimal}
						moneySymbol={setting?.first_symbol}
						action={action}
					/>
				) : (
					<div className={styles.container}>
						<div className={styles.property}>
							<span className={styles.propertyName}>
								Codigo del Producto:
							</span>
							<span className={styles.propertyValue}>
								{selectProduct?.row?.code}
							</span>
						</div>
						<div className={styles.property}>
							<span className={styles.propertyName}>
								Nombre del Producto:
							</span>
							<span className={styles.propertyValue}>
								{selectProduct?.row?.name}
							</span>
						</div>
						<div className={styles.property}>
							<span className={styles.propertyName}>
								Precio Unitario:
							</span>
							<span className={styles.propertyValue}>
								{selectProduct?.row?.price_buy &&
									setting?.first_symbol +
										formartNumber(
											selectProduct.row.price_buy,
											setting?.number_format,
											setting?.qty_decimal
										)}
							</span>
						</div>
						<div className={styles.property}>
							<span className={styles.propertyName}>
								Cantidad Disponible:
							</span>
							<span className={styles.propertyValue}>
								{selectProduct?.row?.quantity &&
									formartNumber(
										selectProduct.row.quantity,
										setting?.number_format,
										setting?.qty_decimal
									)}
							</span>
						</div>
						<div className={styles.property}>
							<label className={styles.propertyName}>
								Cantidad a Facturar:
							</label>
							<NumberFormat
								className={styles.numberField}
								thousandSeparator={separator.thousands}
								decimalSeparator={separator.decimal}
								decimalScale={setting?.qty_decimal}
								onValueChange={(values) => {
									const { floatValue } = values;
									if (floatValue === undefined) {
										setProductQuantityInvoice({
											quantity: 0,
										});
									} else {
										setProductQuantityInvoice({
											quantity: floatValue,
										});
									}
								}}
								allowNegative={false}
							/>
						</div>
						<div className={styles.property}>
							<span className={styles.propertyName}>
								Cantidad Total:
							</span>
							<span className={styles.propertyValue}>
								{selectProduct?.row?.quantity &&
									formartNumber(
										selectProduct.row.quantity -
											-productQuantityInvoice?.quantity,
										setting?.number_format,
										setting?.qty_decimal
									)}
							</span>
						</div>
						<div className={styles.buttons}>
							<ButtonForm
								title='Regresar'
								onClick={() =>
									setSelectProduct({ render: false, row: {} })
								}
							/>
							<ButtonForm title='Agregar' onClick={handleClick} />
						</div>
					</div>
				)}
			</Modal>
		</>
	);
}

export default ProductModal;
