import React from "react";
import styles from "./style.module.css";
import { useController } from "react-hook-form";

function CheckBox({ title, control, name }) {
	const { field } = useController({
		control,
		name,
	});

	return (
		<div className={styles.container}>
			<input type='checkbox' {...field} />
			<label className={styles.title}>{title}</label>
		</div>
	);
}

export default CheckBox;
