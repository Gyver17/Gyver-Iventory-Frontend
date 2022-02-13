import React from "react";
import styles from "./style.module.css"

const ErrorMessage = ({ message, ...props }) => {
	return (
		<div className={styles.container} {...props}>
			<span>{message}</span>
		</div>
	);
};
export default ErrorMessage;
