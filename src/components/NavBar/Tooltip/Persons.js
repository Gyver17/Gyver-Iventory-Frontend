import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const Persons = () => {
    return (
        <li className={styles.tooltip}>
            <input type="checkbox" id={styles.show_person} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className="icon iconchevron-right"></i>
                    <div>Personas</div>
                </div>
                <label for={styles.show_person}>
                    <i className="icon iconchevron-right"></i>
                    <div>Personas</div>
                </label>
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/employee' className={styles.link}>
                        <i className="icon icongroup"></i>
                        <div>Empleados</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/supplier' className={styles.link}>
                        <i className="icon iconuser-tie"></i>
                        <div>Proveedores</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/client' className={styles.link}>
                        <i className="icon icongroup1"></i>
                        <div>Clientes</div>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Persons
