import React from "react";
import SelectField from "../../../../../components/SelectField/SelectField";
import ErrorMessage from "../../../../../components/ErrorMessage/ErrorMessage";
import styles from "./style.module.css";

function PersonData({ control, setValue, options, errors }) {
	return (
		<div className={styles.container}>
			<SelectField
				name='id_employee'
				options={options?.optionsEmployees}
				control={control}
				setValue={setValue}
				title='Seleccionar Un Empleado'
				noOptionsMessage='Empleado No Encontrado'
				placeholder='Seleccione Un Empleado'
			/>
			{errors.id_employee?.message && (
				<ErrorMessage message={errors.id_employee.message} />
			)}
			<SelectField
				name='id_supplier'
				options={options?.optionsSuppliers}
				control={control}
				setValue={setValue}
				title='Seleccionar Un Proveedor'
				noOptionsMessage='Proveedor No Encontrad0'
				placeholder='Seleccione Un Proveedor'
			/>
			{errors.id_supplier?.message && (
				<ErrorMessage message={errors.id_supplier.message} />
			)}
		</div>
	);
}

export default PersonData;
