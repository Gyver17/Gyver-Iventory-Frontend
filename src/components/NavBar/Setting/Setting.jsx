import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const Setting = () => {
    return (
        <li className={styles.tooltip}>
            <div className={styles.title_tooltip}>
                <i className="icon iconcog2" />
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/setting/company' className={styles.link}>
                        <i className="icon iconoffice"></i>
                        <span>Empresa</span>
                    </NavLink></li>
                <li>
                    <NavLink to='/setting/money' className={styles.link}>
                        <i className="icon iconcurrency-dollar"></i>
                        <span>Monedas</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/setting/users' className={styles.link}>
                        <i className="icon iconuser-circle"></i>
                        <span>Usuarios</span>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Setting
