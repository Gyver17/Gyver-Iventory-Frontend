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
import { getProductBuyById } from "../../../../../api/productBuy";
import { AuthContext } from "../../../../../context/authProvider";
// import { expresions } from "../../../../../const/ExpReg";
import { columnModal, searchData } from "../../const/dataTableProps";
import formartNumber from "../../../../../helpers/formatNumber";

/* ------ Component ------ */
function ProductModal({
	form,
	setForm,
	productsInvoice,
	setProductsInvoice,
	row,
}) {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user, setting } = state;
	const token = user.token;

	const [selectProduct, setSelectProduct] = useState({
		render: false,
		row: {},
	});
	const [productQuantityInvoice, setProductQuantityInvoice] = useState();
	const [separator, setSeparator] = useState({});

	useEffect(() => {
		const numberFormat = () => {
			setProductQuantityInvoice({ quantity: 0 })
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
		["getProductBuyByIdInvoice", user],
		async () => {
			const products = await getProductBuyById(
				row.id,
				token,
				dispatch,
				toast
			);
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

	const handleChange = (value) => {
		if (value === undefined) {
			setProductQuantityInvoice({
				quantity: 0,
			});
		} else {
			const { row } = selectProduct;
			const exists = productsInvoice.find(
				(item) => item.id_product === row.id_product
			);

			if (exists) {
				setProductQuantityInvoice({
					quantity: value + exists.quantity,
				});
			} else {
				setProductQuantityInvoice({
					quantity: value,
				});
			}
		}
	};

	const handleClick = () => {
		const { row } = selectProduct;
		if (productQuantityInvoice.quantity > row.quantity) {
			return toast.error("No Hay Suficiente Cantidad Disponible");
		}
		if (productQuantityInvoice.quantity === 0) {
			return toast.error("Debe Ingresar Una Cantidad a Facturar");
		}
		const exists = productsInvoice.find(
			(item) => item.id_product === row.id_product
		);

		const product = {
			id_product: row.id_product,
			id_invoice: row.id_invoice,
			code: row.code,
			name: row.name,
			quantity: productQuantityInvoice.quantity,
			price_buy: row.price_buy,
			price_total: productQuantityInvoice.quantity * row.price_buy,
		};
		if (exists) {
			const index = productsInvoice.findIndex(
				(item) => item.id_product === exists.id_product
			);
			const newProductsInvoice = productsInvoice.splice(index, 0);
			setProductsInvoice([...newProductsInvoice, product]);
		} else {
			setProductsInvoice([...productsInvoice, product]);
		}
		setForm({ isOpen: false, title: "" });
		setProductQuantityInvoice({ quantity: 0 });
		setSelectProduct({ render: false, row: {} });
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
									handleChange(floatValue);
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
											productQuantityInvoice?.quantity,
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
