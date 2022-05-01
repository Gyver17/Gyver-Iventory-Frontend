/* ------ Library Import ------ */
import React, { useEffect, useState, useContext } from "react";
import { useQuery } from "react-query";
import { useForm, useWatch } from "react-hook-form";

/* ------ Components Import ------ */
import Modal from "../../../../../components/Modal/Modal";
import DataTable from "../../../../../components/DataTable/DataTable";
import PageLoading from "../../../../../components/PageLoading/PageLoading";
import SessionExpired from "../../../../../components/SessionExpired/SessionExpired";
import ButtonForm from "../../../../../components/ButtonForm/ButtonForm";
import ToasterMessage, {
	toast,
} from "../../../../../components/ToasterMessage/ToasterMessage";
import NumberField from "../../../../../components/NumberField/NumberField";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getPayHistory, createPayPurchases } from "../../../../../api/payPurchasesHistory";
import { AuthContext } from "../../../../../context/authProvider";
// import { expresions } from "../../../../../const/ExpReg";
import { columnModal, searchData } from "../../const/dataTableProps";
import formartNumber from "../../../../../helpers/formatNumber";

/* ------ Component ------ */
function PayModal({ form, setForm }) {
	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user, setting } = state;
	const token = user.token;
	const { row } = form;

	// Props DataTable
	const { data, isSuccess, isError } = useQuery(
		["getPayHistory", user],
		async () => {
			const products = await getPayHistory(row.id, token, dispatch, toast);
			return products;
		}
	);

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

	if (isError) {
		return <SessionExpired serverError={true} />;
	}

	return (
		<>
			<ToasterMessage />
			<Modal isOpen={form.isOpen} setOpen={setForm} title={form.title}>
				{isSuccess ? (
					<>
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
							// action={action}
						/>
						<div>
							<NumberField
								name='amountPay'
								control={control}
								quantityDecimal={setting?.qty_decimal}
								settingFormat={setting?.number_format}
								prefix={setting?.first_symbol + " "}
								title='Monto a Abonar'
								placeholder='Introducir Una Cantidad'
								icon='icon icondollar1'
								allowNegative={false}
								width={100}
								// disabled={!checkbox}
							/>
							<NumberField
								name='amountPay'
								control={control}
								quantityDecimal={setting?.qty_decimal}
								settingFormat={setting?.number_format}
								prefix={setting?.first_symbol + " "}
								title='Monto a Abonar'
								placeholder='Introducir Una Cantidad'
								icon='icon icondollar1'
								allowNegative={false}
								// disabled={!checkbox}
							/>
							<NumberField
								name='amountPay'
								control={control}
								quantityDecimal={setting?.qty_decimal}
								settingFormat={setting?.number_format}
								prefix={setting?.first_symbol + " "}
								title='Monto a Abonar'
								placeholder='Introducir Una Cantidad'
								icon='icon icondollar1'
								allowNegative={false}
								// disabled={!checkbox}
							/>
						</div>
					</>
				) : (
					<PageLoading />
				)}
			</Modal>
		</>
	);
}

export default PayModal;
