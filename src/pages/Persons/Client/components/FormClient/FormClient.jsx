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
import SelectAndTextField from "../../../../../components/SelectAndTextField/SelectAndTextField";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { initialValues, adaptValues, validationSchema, sendValues } from "../../const/values";
import { createClient, updateClient } from "../../../../../api/client";
import { AuthContext } from "../../../../../context/authProvider";

/* ------ Component ------ */
const FormClient = ({ form, setForm, update, queryClient }) => {
	// Props Parent
	const { isUpdate, row } = update;

	// Select Options
	const phoneOptions = [
		{ value: "0412", label: "0412" },
		{ value: "0414", label: "0414" },
		{ value: "0424", label: "0424" },
		{ value: "0416", label: "0416" },
		{ value: "0426", label: "0426" },
	];

	const docOptions = [
		{ value: "V", label: "V" },
		{ value: "E", label: "E" },
		{ value: "J", label: "J" },
	];

	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state;
	const token = user.token;

	// Component States
	const [values, setValues] = useState(initialValues);

	useEffect(() => {
		if (isUpdate) {
			setValues(adaptValues(row));
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
		const body = sendValues(data)
		if (isUpdate) {
			const id = row.id;
			const success = await updateClient(
				id,
				token,
				body,
				dispatch,
				toast,
				queryClient
			);
			if (success) {
				setForm(false);
			}
		} else {
			const success = await createClient(
				token,
				body,
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
									name='mail'
									type='text'
									control={control}
									title='Correo Electrónico'
									placeholder='Escribir Un Correo Electrónico'
									icon='icon iconcalculator1'
								/>
								{errors.mail?.message && (
									<ErrorMessage
										message={errors.mail.message}
									/>
								)}
							</div>
							<div className={styles.input}>
								<SelectAndTextField
									name={["docIdSelect", "docIdNumber"]}
									type='text'
									inputmMode='numeric'
									control={control}
									setValue={setValue}
									options={docOptions}
									title='Documento de Identificación'
									placeholder='Escribir El Documento de Identificación'
									selectPlaceholder='X'
									width='65px'
								/>
								{errors.docIdSelect?.message && (
									<ErrorMessage message={errors.docIdSelect.message} />
								)}
								{errors.docIdNumber?.message && (
									<ErrorMessage message={errors.docIdNumber.message} />
								)}
							</div>
							<div className={styles.input}>
								<SelectAndTextField
									name={["numberPhoneSelect", "numberPhoneNumber"]}
									type='text'
									inputmMode='numeric'
									control={control}
									setValue={setValue}
									options={phoneOptions}
									title='Numero de Telefono'
									placeholder='Escribir un Numero de Telefono'
									selectPlaceholder='X'
									width='85px'
								/>
								{errors.numberPhoneSelect?.message && (
									<ErrorMessage message={errors.numberPhoneSelect.message} />
								)}
								{errors.numberPhoneNumber?.message && (
									<ErrorMessage message={errors.numberPhoneNumber.message} />
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
										? "Modificar Cliente"
										: "Crear Cliente"
								}
							/>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default FormClient;
