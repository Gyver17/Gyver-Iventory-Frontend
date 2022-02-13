import React from 'react'
import styles from './style.module.css'

const ButtonForm = ({title, ...props}) => {
	return (
		<>
			<button className={styles.button} {...props}>{title}</button>	
		</>
	)
}

export default ButtonForm