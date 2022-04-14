import React, { useEffect, useContext } from "react";
import { useWatch } from "react-hook-form";

/* ------ Components Import ------ */
import NumberInvoiceField from "../../../../../components/NumberInvoiceField/NumberInvoiceField";
import CheckBox from "../../../../../components/CheckBox/CheckBox";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";

/* ------ Import to Component ------ */
import { AuthContext } from "../../../../../context/authProvider";
import styles from "./style.module.css";

function CreditData({ control, setValue, getValues, errors }) {
	// Global State
	const [state] = useContext(AuthContext);
	const { setting } = state;

	const checkbox = useWatch({
		control,
		name: "credit",
	});

	const amountPay = useWatch({
		control,
		name: "amountPay",
	});

	const total = useWatch({
		control,
		name: "total",
	});

	useEffect(() => {
		if (total - amountPay >= 0) {
			setValue("remainingAmount", total - amountPay);
		} else {
			setValue("remainingAmount", 0);
		}

		if (!checkbox === true) {
			setValue("amountPay", 0);
			setValue("remainingAmount", 0);
		}
	}, [checkbox, amountPay, total, setValue]);

	return (
		<div className={styles.container}>
			<CheckBox
				name='credit'
				title='Compra a Credito'
				control={control}
			/>
			<NumberInvoiceField
				name='amountPay'
				control={control}
				quantityDecimal={setting?.qty_decimal}
				settingFormat={setting?.number_format}
				prefix={setting?.first_symbol + " "}
				title='Monto a Abonar'
				placeholder='Introducir Una Cantidad'
				icon='icon icondollar1'
				allowNegative={false}
				disabled={!checkbox}
			/>
			{errors.amountPay?.message && (
				<ErrorMessage message={errors.amountPay.message} />
			)}
			<NumberInvoiceField
				name='remainingAmount'
				control={control}
				quantityDecimal={setting?.qty_decimal}
				settingFormat={setting?.number_format}
				prefix={setting?.first_symbol + " "}
				title='Monto Restante'
				placeholder='Introducir Una Cantidad'
				icon='icon icondollar1'
				allowNegative={false}
				disabled
			/>
			{errors.remainingAmount?.message && (
				<ErrorMessage message={errors.remainingAmount.message} />
			)}
		</div>
	);
}

export default CreditData;
