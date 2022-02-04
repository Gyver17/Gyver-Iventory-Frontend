import Container from './components/Container/Container'
import FormLogin from './components/FormLogin/FormLogin'
import styles from './style.module.css'

const LogIn = () => {
    return (
        <div className={styles.body}>
                <Container />
                <FormLogin />
        </div>
    )
}

export default LogIn
