import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

const Sales = () => {
    const [state] = useContext(AuthContext);
    const { permissions } = state;

    return (
        <li className={styles.tooltip}>
            <input type='checkbox' id={styles.show_sales} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className='icon iconchevron-right'></i>
                    <span>Ventas</span>
                </div>
                <label for={styles.show_sales}>
                    <i className='icon iconchevron-right'></i>
                    <span>Ventas</span>
                </label>
            </div>
            <ul className={styles.list}>
                {permissions?.sell && (
                    <li>
                        <NavLink to='/sales/invoice' className={styles.link}>
                            <i className='icon iconshopping-cart2'></i>
                            <span>Facturar Venta</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.sell_return && (
                    <li>
                        <NavLink to='/sales/return' className={styles.link}>
                            <i className='icon iconcart-arrow-down'></i>
                            <span>Devolución de Ventas</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.sell_pay && (
                    <li>
                        <NavLink to='/sales/pay' className={styles.link}>
                            <i className='icon iconcoins'></i>
                            <span>Ventas Por Cobrar</span>
                        </NavLink>
                    </li>
                )}
            </ul>
        </li>
    );
};

export default Sales;
