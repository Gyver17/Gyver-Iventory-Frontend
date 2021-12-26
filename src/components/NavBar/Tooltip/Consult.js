import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const Consult = () => {
    return (
        <li className={styles.tooltip}>
            <input type="checkbox" id={styles.show_consult} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className="icon iconchevron-right"></i>
                    <div>Consultar</div>
                </div>
                <label for={styles.show_consult}>
                    <i className="icon iconchevron-right"></i>
                    <div>Consultar</div>
                </label>
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/consult/category' className={styles.link}>
                        <i className="icon iconcabinet"></i>
                        <div>Por Categorias</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/products' className={styles.link}>
                        <i className="icon iconbox1"></i>
                        <div>Por Productos</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/movements' className={styles.link}>
                        <i className="icon iconstats"></i>
                        <div>Por Movimientos</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/invoice' className={styles.link}>
                        <i className="icon icondocument-table1"></i>
                        <div>Por Facturas</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/supplier' className={styles.link}>
                        <i className="icon iconrecent_actors"></i>
                        <div>Por Proveedores</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/consult/client' className={styles.link}>
                        <i className="icon iconaddressbook"></i>
                        <div>Por Clientes</div>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Consult
