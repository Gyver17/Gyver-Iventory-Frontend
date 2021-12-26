import logo from './logo.png'
import styles from './style.module.css'

const Logo = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src={logo} alt="logo" className={styles.img_logo}></img>
                <div className={styles.title_logo}>Gyver Inventory</div>
            </div>
        </div>
    )
}

export default Logo
