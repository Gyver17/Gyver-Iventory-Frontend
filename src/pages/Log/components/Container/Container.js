import styles from './style.module.css'

const Container = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.line1}>Gyver Inventory</h1>
            <h3 className={styles.line2}>La mejor manera de llevar el inventario de tu negocio.</h3>
            <h3 className={styles.line3}>¡Que espera inicia sección!</h3>
        </div>
    )
}

export default Container
