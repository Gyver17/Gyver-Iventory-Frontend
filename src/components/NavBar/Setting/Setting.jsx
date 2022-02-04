import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const Setting = () => {
    return (
        <li className={styles.tooltip}>
            <div className={styles.title_tooltip}>
                <div className="icon iconcog2"></div>
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/setting/company' className={styles.link}>
                        <i className="icon iconoffice"></i>
                        <div>Empresa</div>
                    </NavLink></li>
                <li>
                    <NavLink to='/setting/format' className={styles.link}>
                        <i className="icon iconcalculator1"></i>
                        <div>Empresa</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/setting/money' className={styles.link}>
                        <i className="icon iconcurrency-dollar"></i>
                        <div>Monedas</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/setting/users' className={styles.link}>
                        <i className="icon iconuser-circle"></i>
                        <div>Usuarios</div>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Setting
