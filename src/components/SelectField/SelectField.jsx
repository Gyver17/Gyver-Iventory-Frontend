import React from "react";
import Select from "react-select";
import customStyles from "./customStyles";
import styles from "./style.module.css";
import { useController } from "react-hook-form";

const SelectField = ({
	options,
	title,
	noOptionsMessage,
	placeholder,
	control,
	name,
	setValue
}) => {
	const { field } = useController({
        control,
        name,
    });

	return (
		<div className={styles.container}>
			<label className={styles.title}>{title}</label>
			<Select
				options={options}
				styles={customStyles}
				placeholder={placeholder}
				noOptionsMessage={() => noOptionsMessage}
				onChange={(option) => setValue(name, option.value)}
				value={(field.value ? options.find(option => option.value === field.value) : null)}
				onBlur={field.onBlur}
				name={field.name}
				inputRef={field.ref}
			/>
		</div>
	);
};

export default SelectField;
