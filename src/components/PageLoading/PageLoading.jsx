import React from 'react'
import styles from "./style.module.css"

const PageLoading = () => {
	return (
		<>
			<div className={styles.container}>
				<span className={styles.title}>Cargando...</span>
				<div className={styles.lds}></div>
			</div>
		</>
	)
}

export default PageLoading