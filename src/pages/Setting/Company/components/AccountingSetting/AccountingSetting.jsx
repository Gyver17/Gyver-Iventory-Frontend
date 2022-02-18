import React from 'react'
import SelectAndTextField from "../../../../../components/SelectAndTextField/SelectAndTextField";
import SelectField from "../../../../../components/SelectField/SelectField";


const AccountingSetting = ({control, setSelectValue}) => {
	const docOptions = [
				{ value: "V", label: "V" },
				{ value: "E", label: "E" },
				{ value: "J", label: "J" },
			];

	return (
		<>
			<SelectAndTextField
				name={["rifSelect", "rifText"]}
				// control={control}
				options={docOptions}
				title='Divisa Principal'
				placeholder='Valor'
				width="65px"
			/>
			<SelectAndTextField
				name={["rifSelect", "rifText"]}
				// control={control}
				options={docOptions}
				title='Divisa Secundaria'
				placeholder='Valor'
				width="65px"
			/>
			<SelectField
                name='user.rol'
                options={docOptions}
                control={control}
                setValue={setSelectValue}
                title='Formato Numerico'
	            noOptionsMessage='Rol No Encontrado'
		        placeholder='Seleccione Un Rol'
            />
            <SelectField
                name='user.rol'
                options={docOptions}
                control={control}
                setValue={setSelectValue}
                title='Cantidad De Decimales'
	            noOptionsMessage='Rol No Encontrado'
		        placeholder='Seleccione Un Rol'
            />


		</>
	)
}

export default AccountingSetting