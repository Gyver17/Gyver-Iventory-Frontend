import React, { useContext } from "react";

/* ------ Components Import ------ */
import NumberInvoiceField from "../../../../../components/NumberInvoiceField/NumberInvoiceField";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { AuthContext } from "../../../../../context/authProvider";

function AccountingData({ control, setValue, errors }) {
	// Global State
    const [state] = useContext(AuthContext);
    const { setting } = state;

	return (
		<div className={styles.container}>
			<NumberInvoiceField
				name='subTotal'
				control={control}
				quantityDecimal={setting.qty_decimal}
				settingFormat={setting.number_format}
				prefix={setting?.first_symbol + " "}
				title='Sub-Total:'
				placeholder='Introducir Una Cantidad'
				icon='icon icondollar1'
				allowNegative={false}
				disabled
			/>
			{errors.subTotal?.message && (
				<ErrorMessage message={errors.subTotal.message} />
			)}
			<NumberInvoiceField
				name='iva'
				control={control}
				quantityDecimal={setting.qty_decimal}
				settingFormat={setting.number_format}
				prefix={setting?.first_symbol + " "}
				title='IVA:'
				placeholder='Introducir Una Cantidad'
				icon='icon icondollar1'
				allowNegative={false}
				disabled
			/>
			{errors.iva?.message && (
				<ErrorMessage message={errors.iva.message} />
			)}
			<NumberInvoiceField
				name='total'
				control={control}
				quantityDecimal={setting.qty_decimal}
				settingFormat={setting.number_format}
				prefix={setting?.first_symbol + " "}
				title='Monto Total:'
				placeholder='Introducir Una Cantidad'
				icon='icon icondollar1'
				allowNegative={false}
				disabled
			/>
			{errors.total?.message && (
				<ErrorMessage message={errors.total.message} />
			)}
		</div>
	);
}

export default AccountingData;
