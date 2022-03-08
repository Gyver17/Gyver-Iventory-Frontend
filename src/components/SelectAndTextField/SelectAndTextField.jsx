import React from "react";
import Select from "react-select";
import styles from "./style.module.css";
import customStyles from "./customStyles";
import { useController } from "react-hook-form";

const SelectAndTextField = ({
	name,
	title,
	placeholder,
	options,
	width,
	selectPlaceholder,
	type,
	control,
	setValue,
	inputMode,
}) => {
	const useField = (control, name, useController) => {
		const { field } = useController({
			control,
			name,
		});
		return field;
	};

	const firstField = useField(control, name[0], useController);
	const secondField = useField(control, name[1], useController);

	return (
		<div className={styles.container}>
			<span className={styles.title}>{title}</span>
			<div className={styles.inputs}>
				<Select
					options={options}
					styles={customStyles}
					// noOptionsMessage={() => noOptionsMessage}
					placeholder={selectPlaceholder}
					onChange={(option) => setValue(name[0], option.value)}
					value={
						firstField.value
							? options.find(
									(option) =>
										option.value === firstField.value
							  )
							: null
					}
					onBlur={firstField.onBlur}
					name={firstField.name}
					inputRef={firstField.ref}
					width={width}
					menuPosition='fixed'
				/>
				<input
					type={type}
					inputMode={inputMode}
					placeholder={placeholder}
					{...secondField}
				/>
			</div>
		</div>
	);
};

export default SelectAndTextField;
