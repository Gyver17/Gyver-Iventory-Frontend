import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

const Inventory = () => {

    const [state] = useContext(AuthContext);
    const { permissions } = state;

    return (
        <li className={styles.tooltip}>
            <input type='checkbox' id={styles.show_inventory} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className='icon iconchevron-right'></i>
                    <span>Inventario</span>
                </div>
                <label for={styles.show_inventory}>
                    <i className='icon iconchevron-right'></i>
                    <span>Inventario</span>
                </label>
            </div>
            <ul className={styles.list}>
                {permissions?.category && (
                    <li>
                        <NavLink to='/category' className={styles.link}>
                            <i className='icon icontags'></i>
                            <span>Categorias</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.products && (
                    <li>
                        <NavLink to='/products' className={styles.link}>
                            <i className='icon iconpackage1'></i>
                            <span>Productos</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.services && (
                    <li>
                        <NavLink to='/services' className={styles.link}>
                            <i className='icon icontools'></i>
                            <span>Servicios</span>
                        </NavLink>
                    </li>
                )}
            </ul>
        </li>
    );
};

export default Inventory;
