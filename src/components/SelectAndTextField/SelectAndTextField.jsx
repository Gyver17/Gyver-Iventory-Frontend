import React from "react";
import Select from "react-select";
import styles from "./style.module.css";
import customStyles from "./customStyles";

const SelectAndTextField = ({ name, title, placeholder, options, width }) => {

	return (
		<div className={styles.container}>
			<span className={styles.title}>{title}</span>
			<div className={styles.inputs}>
				<Select
					options={options}
					styles={customStyles}
					// noOptionsMessage={() => noOptionsMessage}
					width={width}
				/>
				<input type='text' placeholder={placeholder} />
			</div>
		</div>
	);
};

export default SelectAndTextField;
