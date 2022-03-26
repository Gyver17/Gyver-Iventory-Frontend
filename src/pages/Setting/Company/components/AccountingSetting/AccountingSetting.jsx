/* ------ Library Import ------ */
import React, { useContext } from "react";

/* ------ Components Import ------ */
import SelectField from "../../../../../components/SelectField/SelectField";
import NumberField from "../../../../../components/NumberField/NumberField";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { AuthContext } from "../../../../../context/authProvider";

/* ------ Component ------ */
const AccountingSetting = ({
	control,
	setSelectValue,
	options,
	errors,
}) => {
	const [state] = useContext(AuthContext);
	const { setting } = state;

	const quantityDecimalOptions = [
		{ value: 1, label: "0.0" },
		{ value: 2, label: "0.00" },
		{ value: 3, label: "0.000" },
	];

	const formatOptions = [
		{ value: "0.000,00", label: "0.000,00" },
		{ value: "0,000.00", label: "0,000.00" },
	];

	return (
		<div className={styles.container}>
			<span className={styles.title}>Configuraciones Contables</span>
			<div className={styles.inputs}>
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
				{errors.firstCurrency?.message && (
					<ErrorMessage message={errors.firstCurrency.message} />
				)}
			</div>
			<div className={styles.inputs}>
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
				{errors.secondCurrency?.message && (
					<ErrorMessage message={errors.secondCurrency.message} />
				)}
			</div>
			<div className={styles.inputs}>
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
				{errors.numberFormat?.message && (
					<ErrorMessage message={errors.numberFormat.message} />
				)}
			</div>
			<div className={styles.inputs}>
				<SelectField
					name='decimalQuantity'
					options={quantityDecimalOptions}
					control={control}
					setValue={setSelectValue}
					title='Cantidad De Decimales'
					noOptionsMessage='Rol No Encontrado'
					placeholder='Seleccione Una Cantidad'
				/>
				{errors.decimalQuantity?.message && (
					<ErrorMessage message={errors.decimalQuantity.message} />
				)}
			</div>
			<div className={styles.inputs}>
				<NumberField
					name='porcentIva'
					// type='number'
					control={control}
					setValue={setSelectValue}
					quantityDecimal={0}
					settingFormat={setting.number_format}
					title='Porcentaje de IVA'
					placeholder='Introducir Un Numero'
					icon='icon icondollar1'
					isAllowed={({ floatValue }) => floatValue <= 100}
				/>
				{errors.porcentIva?.message && (
					<ErrorMessage message={errors.porcentIva.message} />
				)}
			</div>
		</div>
	);
};

export default AccountingSetting;
