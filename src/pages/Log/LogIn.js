import Container from './components/Container/Container'
import Form from './components/Form/Form'
import styles from './style.module.css'

const LogIn = () => {
    return (
        <div className={styles.body}>
            {/* <div className={styles.flex}> */}
                <Container />
                <Form />
            {/*</div>*/}
            {/* <div style={{ height: '150px', overFlow: 'hidden' }} ><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}><path d="M-13.82,6.44 C194.41,212.67 316.31,-101.13 517.21,92.28 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: '#000' }}></path></svg></div> */}
        </div>
    )
}

export default LogIn
