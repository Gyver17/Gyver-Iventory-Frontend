import React from 'react'
import SelectAndTextField from "../../../../../components/SelectAndTextField/SelectAndTextField";
import SelectField from "../../../../../components/SelectField/SelectField";
import styles from "./style.module.css"

const AccountingSetting = ({control, setSelectValue}) => {
	const docOptions = [
				{ value: "V", label: "V" },
				{ value: "E", label: "E" },
				{ value: "J", label: "J" },
			];

	return (
		<div className={styles.container}>
			<span className={styles.title}>Configuraciones Contables</span>
			<SelectAndTextField
				name={["rifSelect", "rifText"]}
				// control={control}
				options={docOptions}
				title='Divisa Principal'
				placeholder='Valor'
				selectPlaceholder = 'X'
				width="65px"
			/>
			<SelectAndTextField
				name={["rifSelect", "rifText"]}
				// control={control}
				options={docOptions}
				title='Divisa Secundaria'
				placeholder='Valor'
				selectPlaceholder = 'X'
				width="65px"
			/>
			<SelectField
                name='user.rol'
                options={docOptions}
                control={control}
                setValue={setSelectValue}
                title='Formato Numerico'
	            noOptionsMessage='Rol No Encontrado'
		        placeholder='Seleccione Un Formato'
				selectPlaceholder = 'X'            />
            <SelectField
                name='user.rol'
                options={docOptions}
                control={control}
                setValue={setSelectValue}
                title='Cantidad De Decimales'
	            noOptionsMessage='Rol No Encontrado'
		        placeholder='Seleccione Una Cantidad'
            />
		</div>
	)
}

export default AccountingSetting