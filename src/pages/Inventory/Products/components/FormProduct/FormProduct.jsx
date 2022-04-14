/* ------ Library Import ------ */
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ------ Components Import ------ */
import Modal from "../../../../../components/Modal/Modal";
import ButtonForm from "../../../../../components/ButtonForm/ButtonForm";
import ToasterMessage, {
	toast,
} from "../../../../../components/ToasterMessage/ToasterMessage";
import TextField from "../../../../../components/TextField/TextField";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";
import NumberField from "../../../../../components/NumberField/NumberField";
import SelectField from "../../../../../components/SelectField/SelectField";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { initialValues, validationSchema } from "../../const/values";
import { createProducts, updateProducts } from "../../../../../api/products";
import { AuthContext } from "../../../../../context/authProvider";

/* ------ Component ------ */
const FormProduct = ({ form, setForm, update, queryClient, options }) => {
	// Props Parent
	const { isUpdate, row } = update;

	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user, setting } = state;
	const token = user.token;

	// Component States
	const [values, setValues] = useState(initialValues);

	useEffect(() => {
		if (isUpdate) {
			setValues({
				code: row.code,
				name: row.name,
				id_category: row.id_category,
				quantity: parseFloat(row.quantity),
				price_buy: parseFloat(row.price_buy),
				price_sell: parseFloat(row.price_sell),
			});
		} else {
			setValues(initialValues);
		}
	}, [setValues, isUpdate, row]);

	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: values,
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
		reset(values);
	}, [values, reset]);

	const onSubmit = async (data) => {
		if (isUpdate) {
			const id = row.id;
			const success = await updateProducts(
				id,
				token,
				data,
				dispatch,
				toast,
				queryClient
			);
			if (success) {
				setForm(false);
			}
		} else {
			const success = await createProducts(
				token,
				data,
				dispatch,
				toast,
				queryClient
			);
			if (success) {
				reset(values);
			}
		}
	};

	return (
		<>
			<ToasterMessage />
			<Modal isOpen={form.isOpen} setOpen={setForm} title={form.title}>
				<div>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={styles.inputs}>
							<div className={styles.input}>
								<TextField
									name='code'
									type='text'
									control={control}
									title='Codigo'
									placeholder='Escribir Codigo'
									icon='icon iconcoins'
								/>
								{errors.code?.message && (
									<ErrorMessage
										message={errors.code.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<TextField
									name='name'
									type='text'
									control={control}
									title='Escribir Nombre'
									placeholder='Escribir Un Nombre'
									icon='icon icondollar1'
								/>
								{errors.name?.message && (
									<ErrorMessage
										message={errors.name.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<SelectField
									name='id_category'
									options={options}
									control={control}
									setValue={setValue}
									title='Categoria'
									noOptionsMessage='Categoria No Encontrada'
									placeholder='Seleccione Una Categoria'
								/>
								{errors.id_category?.message && (
									<ErrorMessage
										message={errors.id_category.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<NumberField
									name='quantity'
									control={control}
									quantityDecimal={setting.qty_decimal}
									settingFormat={setting.number_format}
									title='Cantidad'
									placeholder='Introducir Una Cantidad'
									icon='icon icondollar1'
									allowNegative={false}
								/>
								{errors.quantity?.message && (
									<ErrorMessage
										message={errors.quantity.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<NumberField
									name='price_buy'
									control={control}
									quantityDecimal={setting.qty_decimal}
									settingFormat={setting.number_format}
									prefix={setting.first_symbol + " "}
									title='Precio de Compra'
									placeholder='Introducir Un Precio'
									icon='icon icondollar1'
									allowNegative={false}
								/>
								{errors.price_buy?.message && (
									<ErrorMessage
										message={errors.price_buy.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<NumberField
									name='price_sell'
									control={control}
									quantityDecimal={setting.qty_decimal}
									settingFormat={setting.number_format}
									prefix={setting.first_symbol + " "}
									title='Precio de Venta'
									placeholder='Introducir Un Precio'
									icon='icon icondollar1'
									allowNegative={false}
								/>
								{errors.price_sell?.message && (
									<ErrorMessage
										message={errors.price_sell.message}
									/>
								)}
							</div>
						</div>
						<div className={styles.buttons}>
							<ButtonForm
								title='Limpiar'
								onClick={() => reset(initialValues)}
								type='reset'
							/>
							<ButtonForm
								type='submit'
								title={
									isUpdate
										? "Modificar Producto"
										: "Crear Producto"
								}
							/>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default FormProduct;
