import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

const Purchases = () => {
    const [state] = useContext(AuthContext);
    const { permissions } = state;

    return (
        <li className={styles.tooltip}>
            <input type='checkbox' id={styles.show_purchases} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className='icon iconchevron-right'></i>
                    <span>Compras</span>
                </div>
                <label for={styles.show_purchases}>
                    <i className='icon iconchevron-right'></i>
                    <span>Compras</span>
                </label>
            </div>
            <ul className={styles.list}>
                {permissions?.buy && (
                    <li>
                        <NavLink
                            to='/purchases/invoice'
                            className={styles.link}
                        >
                            <i className='icon iconcredit-card-alt'></i>
                            <span>Facturar Compra</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.buy_return && (
                    <li>
                        <NavLink to='/purchases/return' className={styles.link}>
                            <i className='icon iconcart-arrow-down'></i>
                            <span>Devolución de Compras</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.buy_pay && (
                    <li>
                        <NavLink to='/purchases/pay' className={styles.link}>
                            <i className='icon icondollar2'></i>
                            <span>Compras Por Pagar</span>
                        </NavLink>
                    </li>
                )}
            </ul>
        </li>
    );
};

export default Purchases;
