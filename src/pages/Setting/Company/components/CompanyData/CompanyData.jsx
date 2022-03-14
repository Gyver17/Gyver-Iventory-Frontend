/* ------ Library Import ------ */
import React from "react";

/* ------ Components Import ------ */
import TextField from "../../../../../components/TextField/TextField";
import SelectAndTextField from "../../../../../components/SelectAndTextField/SelectAndTextField";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";

/* ------ Import to Component ------ */
import styles from "./style.module.css";

/* ------ Component ------ */
const CompanyData = ({ control, setSelectValue, errors }) => {
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

	return (
		<div className={styles.container}>
			<span className={styles.title}>Datos de la Compañia</span>
			<div className={styles.inputs}>
				<TextField
					name='companyName'
					type='text'
					control={control}
					title='Nombre De La Compañia'
					placeholder='Escribir El Nombre De La Compañia'
					icon='icon icondollar1'
				/>
				{errors.companyName?.message && (
					<ErrorMessage message={errors.companyName.message} />
				)}
			</div>
			<div className={styles.inputs}>
				<TextField
					name='companyMail'
					type='text'
					control={control}
					title='Correo Electrónico De La Compañia'
					placeholder='Escribir El Correo Electrónico De La Compañia'
					icon='icon icondollar1'
				/>
				{errors.companyMail?.message && (
					<ErrorMessage message={errors.companyMail.message} />
				)}
			</div>
			<div className={styles.inputs}>
				<SelectAndTextField
					name={["rifSelect", "rifNumber"]}
					type='text'
					inputmMode='numeric'
					control={control}
					setValue={setSelectValue}
					options={docOptions}
					title='Rif De La Compañia'
					placeholder='Escribir El Rif De La Compañia'
					selectPlaceholder='X'
					width='65px'
				/>
				{errors.rifSelect?.message && (
					<ErrorMessage message={errors.rifSelect.message} />
				)}
				{errors.rifNumber?.message && (
					<ErrorMessage message={errors.rifNumber.message} />
				)}
			</div>
			<div className={styles.inputs}>
				<SelectAndTextField
					name={["firstPhoneSelect", "firstPhoneNumber"]}
					type='text'
					inputmMode='numeric'
					control={control}
					setValue={setSelectValue}
					options={phoneOptions}
					title='Numero de Telefono'
					placeholder='Escribir El Numero de Telefono'
					selectPlaceholder='04XX'
					width='85px'
				/>
				{errors.firstPhoneSelect?.message && (
					<ErrorMessage message={errors.firstPhoneSelect.message} />
				)}
				{errors.firstPhoneNumber?.message && (
					<ErrorMessage message={errors.firstPhoneNumber.message} />
				)}
			</div>
			<div className={styles.inputs}>
				<SelectAndTextField
					name={["secondPhoneSelect", "secondPhoneNumber"]}
					type='text'
					inputmMode='numeric'
					control={control}
					setValue={setSelectValue}
					options={phoneOptions}
					title='Numero de Telefono'
					placeholder='Escribir El Numero de Telefono'
					selectPlaceholder='04XX'
					width='85px'
				/>
				{errors.secondPhoneSelect?.message && (
					<ErrorMessage message={errors.secondPhoneSelect.message} />
				)}
				{errors.secondPhoneNumber?.message && (
					<ErrorMessage message={errors.secondPhoneNumber.message} />
				)}
			</div>
		</div>
	);
};

export default CompanyData;
