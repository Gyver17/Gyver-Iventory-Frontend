/* ------ Library Import ------ */
import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ------ Components Import ------ */
import Modal from "../../../../../components/Modal/Modal";
import TextField from "../../../../../components/TextField/TextField";
import ButtonForm from "../../../../../components/ButtonForm/ButtonForm"
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage"
import ToasterMessage, {toast} from "../../../../../components/ToasterMessage/ToasterMessage"

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { initialValues, validationSchema } from "./values";
import {requestUpdatePassword} from "../../hooks/request";
import { AuthContext } from "../../../../../context/authProvider";


/* ------ Component ------ */
const FormPassword = ({ passwordForm, setPasswordForm, title, queryClient }) => {
	const {id} = passwordForm

	// Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user } = state;
    const token = user.token;

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: initialValues,
		resolver: yupResolver(validationSchema),
	});

	useEffect(() => {
        reset(initialValues);
    }, [reset]);

	const onSubmit = (data) => {
		const body = data.user
		requestUpdatePassword(id, token, body, dispatch, toast, queryClient)
		setPasswordForm(false);
	}

	return (
		<>
			<ToasterMessage />
			<Modal
				isOpen={passwordForm.isOpen}
				setOpen={setPasswordForm}
				title={title}
			>
				<div className={styles.container}>
					<form
						className={styles.form}
						onSubmit={handleSubmit(onSubmit)}
					>
						<div>
							<TextField
								name='user.password'
								type='password'
								control={control}
								title='Contraseña'
								placeholder='Escribir una Contraseña'
								icon='icon iconlock2'
							/>
							{errors.user?.password?.message && (
								<ErrorMessage
									message={errors.user.password.message}
								/>
							)}
							<TextField
								name='user.repeatPassword'
								type='password'
								control={control}
								title='Confirmar Contraseña'
								placeholder='Repetir Contraseña'
								icon='icon iconlock-rounded1'
							/>
							{errors.user?.repeatPassword?.message && (
								<ErrorMessage
									message={errors.user.repeatPassword.message}
								/>
							)}
						</div>
						<div className={styles.buttons}>
							<ButtonForm type='submit' title="Aceptar"/>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default FormPassword;
