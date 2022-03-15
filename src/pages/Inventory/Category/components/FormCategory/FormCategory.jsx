/* ------ Library Import ------ */
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
import { createCategory, updateCategory } from "../../../../../api/category";
import { AuthContext } from "../../../../../context/authProvider";
import { expresions } from "../../../../../const/ExpReg";

const FormCategory = ({ form, setForm, update, queryClient }) => {
	// Const
	const initialValues = {
		name: "",
	};

	const validationSchema = yup.object({
		name: yup
			.string()
			.matches(expresions.name, "Debe introducir un Nombre valido")
			.required("Debe introducir un Nombre"),
	});

	// Props Parent
	const { isUpdate, row } = update;

	// Global State
	const [state, dispatch] = useContext(AuthContext);
	const { user } = state;
	const token = user.token;

	// Component States
	const [values, setValues] = useState(initialValues);

	useEffect(() => {
		if (isUpdate) {
			setValues(row);
		} else {
			setValues({ name: "" });
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
			const success = await updateCategory(
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
			const success = await createCategory(
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
								icon='icon iconclipboard-list'
							/>
							{errors.name?.message && (
								<ErrorMessage message={errors.name.message} />
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
										? "Modificar Categoria"
										: "Crear Categoria"
								}
							/>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default FormCategory;
