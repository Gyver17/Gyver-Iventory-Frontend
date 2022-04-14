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

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { initialValues, validationSchema } from "../../const/values";
import { createServices, updateServices } from "../../../../../api/services";
import { AuthContext } from "../../../../../context/authProvider";

/* ------ Component ------ */
const FormServices = ({ form, setForm, update, queryClient }) => {
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
				description: row.description,
				unit_symbol: row.unit_symbol,
				price_unit: parseFloat(row.price_unit),
			});
		} else {
			setValues(initialValues);
		}
	}, [setValues, isUpdate, row]);

	const {
		control,
		handleSubmit,
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
		/*data.price_unit = formatToNumber(
			data.price_unit,
			setting.number_format,
			"currency"
		);*/

		if (isUpdate) {
			const id = row.id;
			const success = await updateServices(
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
			const success = await createServices(
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
								<TextField
									name='description'
									type='area'
									control={control}
									title='Descripcion'
									placeholder='Escribir Una descripcion'
									icon='icon iconcalculator1'
								/>
								{errors.description?.message && (
									<ErrorMessage
										message={errors.description.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<TextField
									name='unit_symbol'
									type='text'
									control={control}
									title='Unidad'
									placeholder='Escribir una unidad'
									icon='icon iconcalculator1'
								/>
								{errors.unit_symbol?.message && (
									<ErrorMessage
										message={errors.unit_symbol.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<NumberField
									name='price_unit'
									control={control}
									quantityDecimal={setting?.qty_decimal}
									settingFormat={setting?.number_format}
									prefix={setting?.first_symbol + " "}
									title='Precio Por Unidad'
									placeholder='Introducir Un Precio'
									allowNegative={false}
									icon='icon icondollar1'
								/>
								{errors.price_unit?.message && (
									<ErrorMessage
										message={errors.price_unit.message}
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
										? "Modificar Servicio"
										: "Crear Servicio"
								}
							/>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default FormServices;
