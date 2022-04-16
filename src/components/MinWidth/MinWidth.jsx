import React from "react";
import styles from "./style.module.css";

function MinWidth({ content }) {
	return (
		<div className={styles.container}>
			<span>{content}</span>
		</div>
	);
}

export default MinWidth;
