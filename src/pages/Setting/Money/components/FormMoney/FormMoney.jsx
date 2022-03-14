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

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { initialValues, validationSchema } from "../../const/validationSchema";
import { createMoney, updateMoney } from "../../../../../api/money";
import { AuthContext } from "../../../../../context/authProvider";

const FormMoney = ({ form, setForm, update, queryClient }) => {
	// Props Parent
	const { isUpdate, row } = update;

	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state
	const token = user.token;

	// Component States
	const [values, setValues] = useState(initialValues);

	useEffect(() => {
		if (isUpdate) {
			setValues(row);
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
		if (isUpdate) {
			const id = row.id;
			const success = await updateMoney(
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
			const success = await createMoney(
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
							<TextField
								name='name'
								type='text'
								control={control}
								title='Nombre'
								placeholder='Escribir Nombre'
								icon='icon iconcoins'
							/>
							{errors.name?.message && (
								<ErrorMessage message={errors.name.message} />
							)}
							<TextField
								name='symbol'
								type='text'
								control={control}
								title='Symbolo'
								placeholder='Escribir Un Symbolo'
								icon='icon icondollar1'
							/>
							{errors.symbol?.message && (
								<ErrorMessage message={errors.symbol.message} />
							)}
							<TextField
								name='value'
								type='number'
								control={control}
								title='Valor'
								placeholder='Escribir Un Valor'
								icon='icon iconcalculator1'
							/>
							{errors.value?.message && (
								<ErrorMessage message={errors.value.message} />
							)}
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
										? "Modificar Moneda"
										: "Crear Moneda"
								}
							/>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default FormMoney;
