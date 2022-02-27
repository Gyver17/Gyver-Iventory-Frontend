import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const Consult = () => {
    return (
        <li className={styles.tooltip}>
            <input type="checkbox" id={styles.show_consult} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className="icon iconchevron-right"></i>
                    <span>Consultar</span>
                </div>
                <label for={styles.show_consult}>
                    <i className="icon iconchevron-right"></i>
                    <span>Consultar</span>
                </label>
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/consult/category' className={styles.link}>
                        <i className="icon iconcabinet"></i>
                        <span>Por Categorias</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/products' className={styles.link}>
                        <i className="icon iconbox1"></i>
                        <span>Por Productos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/movements' className={styles.link}>
                        <i className="icon iconstats"></i>
                        <span>Por Movimientos</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/invoice' className={styles.link}>
                        <i className="icon icondocument-table1"></i>
                        <span>Por Facturas</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/supplier' className={styles.link}>
                        <i className="icon iconrecent_actors"></i>
                        <span>Por Proveedores</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/client' className={styles.link}>
                        <i className="icon iconaddressbook"></i>
                        <span>Por Clientes</span>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Consult
