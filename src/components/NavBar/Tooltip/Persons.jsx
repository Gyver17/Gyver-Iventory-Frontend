import { useContext } from "react";
import { AuthContext } from "../../../context/authProvider";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

const Persons = () => {
    const [state] = useContext(AuthContext);
    const { permissions } = state;

    return (
        <li className={styles.tooltip}>
            <input type='checkbox' id={styles.show_person} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className='icon iconchevron-right'></i>
                    <span>Personas</span>
                </div>
                <label for={styles.show_person}>
                    <i className='icon iconchevron-right'></i>
                    <span>Personas</span>
                </label>
            </div>
            <ul className={styles.list}>
                {permissions?.employee && (
                    <li>
                        <NavLink to='/employee' className={styles.link}>
                            <i className='icon icongroup'></i>
                            <span>Empleados</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.supplier && (
                    <li>
                        <NavLink to='/supplier' className={styles.link}>
                            <i className='icon iconuser-tie'></i>
                            <span>Proveedores</span>
                        </NavLink>
                    </li>
                )}
                {permissions?.client && (
                    <li>
                        <NavLink to='/client' className={styles.link}>
                            <i className='icon icongroup1'></i>
                            <span>Clientes</span>
                        </NavLink>
                    </li>
                )}
            </ul>
        </li>
    );
};

export default Persons;
