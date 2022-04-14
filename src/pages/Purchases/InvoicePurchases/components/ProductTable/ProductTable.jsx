import React, { useContext } from "react";

/* ------ Components Import ------ */
import DataTable from "../../../../../components/DataTable/DataTable";
/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { AuthContext } from "../../../../../context/authProvider";
import { columnInvoice } from "../../const/dataTableProps";

function ProductTable({ setModal, productsInvoice, setProductsInvoice }) {
	// Global State
	const [state] = useContext(AuthContext);
	const { setting } = state;

	const deleteProductInvoice = (row) => {
		const newProductsInvoice = productsInvoice.filter(
			(product) => product.id !== row.id
		);
		setProductsInvoice(newProductsInvoice);
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
			onClick: (row) => deleteProductInvoice(row),
		},
	];

	return (
		<div className={styles.container}>
			<DataTable
				// title='Productos'
				numberOfEntries={[5, 10, 15, 20]}
				// searchData={searchData}
				headerButtons={button}
				header={columnInvoice}
				data={productsInvoice}
				aroundCurrentPage={5}
				formatDecimal={setting?.number_format}
				quantityDecimal={setting?.qty_decimal}
				// quantityDecimal={1}
				moneySymbol={setting?.first_symbol}
				// action={
				//     permissions?.products_update ||
				//     permissions?.products_delete
				//         ? action
				// : false
				// }
				action={action}
			/>
		</div>
	);
}

export default ProductTable;
