import React from 'react'
import styles from "./style.module.css"
import { useController } from "react-hook-form"

function TextArea({ title, name, control }) {
	const { field } = useController({
		name,
		control
	})
	return (
		<div className={styles.container}>
			<span>{title}</span>
			<textarea {...field} />
		</div>
	)
}

export default TextArea