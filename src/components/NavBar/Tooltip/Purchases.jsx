import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const Purchases = () => {
    return (
        <li className={styles.tooltip}>
            <input type="checkbox" id={styles.show_purchases} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className="icon iconchevron-right"></i>
                    <div>Compras</div>
                </div>
                <label for={styles.show_purchases}>
                    <i className="icon iconchevron-right"></i>
                    <div>Compras</div>
                </label>
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/purchases/invoice' className={styles.link}>
                        <i className="icon iconcredit-card-alt"></i>
                        <div>Facturar Compra</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/purchases/return' className={styles.link}>
                        <i className="icon iconcart-arrow-down"></i>
                        <div>Devolución de Compras</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/purchases/pay' className={styles.link}>
                        <i className="icon icondollar2"></i>
                        <div>Compras Por Pagar</div>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Purchases
