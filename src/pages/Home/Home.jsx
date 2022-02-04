import { useContext } from 'react'
import { AuthContext } from '../../context/authProvider'
import styles from './style.module.css'

const Home = () => {
    const [state] = useContext(AuthContext)
    const { user } = state

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <h1>Bienvenido</h1>
                <h1>{user.name}</h1>
            </div>
        </div>
    )
}

export default Home
