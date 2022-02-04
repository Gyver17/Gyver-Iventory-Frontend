import React from "react";
import Select from "react-select";
import customStyles from "./customStyles";
import styles from "./style.module.css";

const SelectField = ({
	field,
	form,
	options,
	title,
	noOptionsMessage,
	placeholder,
}) => {
	return (
		<div className={styles.container}>
			<label className={styles.title}>{title}</label>
			<Select
				options={options}
				name={field.name}
				styles={customStyles}
				placeholder={placeholder}
				noOptionsMessage={() => noOptionsMessage}
				value={
					options
						? options.find((option) => option.value === field.value)
						: ""
				}
				onChange={(option: Option) =>
					form.setFieldValue(field.name, option.value)
				}
				onBlur={field.onBlur}
			/>
		</div>
	);
};

export default SelectField;
