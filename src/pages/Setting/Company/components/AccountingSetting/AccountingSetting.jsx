import React from "react";
import SelectAndTextField from "../../../../../components/SelectAndTextField/SelectAndTextField";
import SelectField from "../../../../../components/SelectField/SelectField";
import styles from "./style.module.css";
import TextField from "../../../../../components/TextField/TextField";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage"


const AccountingSetting = ({ control, setSelectValue, options, errors }) => {
	const quantityDecimalOptions = [
				{ value: 1, label: "0.0" },
				{ value: 2, label: "0.00" },
				{ value: 3, label: "0.000" },
			];

	const formatOptions = [
		{value: "0.000,00", label: "0.000,00"},
		{value: "0,000.00", label: "0,000.00"},
	]

	return (
		<div className={styles.container}>
			<span className={styles.title}>Configuraciones Contables</span>
			<SelectField
				name='firstCurrency'
				options={options}
				control={control}
				setValue={setSelectValue}
				title='Divisa Principal'
				noOptionsMessage='Divisa No Encontrada'
				placeholder='Seleccione Una Divisa'
				selectPlaceholder='$'
			/>
			{/*{errors.firstCurrency?.message && <ErrorMessage message={errors.firstCurrency.message}/>}*/}
			<SelectField
				name='secondCurrency'
				options={options}
				control={control}
				setValue={setSelectValue}
				title='Divisa Secundaria'
				noOptionsMessage='Divisa No Encontrada'
				placeholder='Seleccione Una Divisa'
				selectPlaceholder='$'
			/>
			{/*{errors.secondCurrency?.message && <ErrorMessage message={errors.secondCurrency.message}/>}*/}
			<SelectField
				name='numberFormat'
				options={formatOptions}
				control={control}
				setValue={setSelectValue}
				title='Formato Numerico'
				noOptionsMessage='Rol No Encontrado'
				placeholder='Seleccione Un Formato'
				selectPlaceholder='X'
			/>
			{/*{errors.numberFormat?.message && <ErrorMessage message={errors.numberFormat.message}/>}*/}
			<SelectField
				name='decimalQuantity'
				options={quantityDecimalOptions}
				control={control}
				setValue={setSelectValue}
				title='Cantidad De Decimales'
				noOptionsMessage='Rol No Encontrado'
				placeholder='Seleccione Una Cantidad'
			/>
			{/*{errors.decimalQuantity?.message && <ErrorMessage message={errors.decimalQuantity.message}/>}*/}
			<TextField
				name='porcentIva'
				type='number'
				control={control}
				title='Porcentaje de IVA'
				placeholder='Introducir Un Numero'
				icon='icon icondollar1'
			/>
			{/*{errors.porcentIva?.message && <ErrorMessage message={errors.porcentIva.message}/>}*/}
		</div>
	);
};

export default AccountingSetting;
