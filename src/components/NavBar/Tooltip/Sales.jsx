import { NavLink } from "react-router-dom";
import styles from './style.module.css'

const Sales = () => {
    return (
        <li className={styles.tooltip}>
            <input type="checkbox" id={styles.show_sales} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className="icon iconchevron-right"></i>
                    <div>Ventas</div>
                </div>
                <label for={styles.show_sales}>
                    <i className="icon iconchevron-right"></i>
                    <div>Ventas</div>
                </label>
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/sales/invoice' className={styles.link}>
                        <i className="icon iconshopping-cart2"></i>
                        <div>Facturar Venta</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sales/return' className={styles.link}>
                        <i className="icon iconcart-arrow-down"></i>
                        <div>Devolución de Ventas</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/sales/pay' className={styles.link}>
                        <i className="icon iconcoins"></i>
                        <div>Ventas Por Cobrar</div>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Sales
