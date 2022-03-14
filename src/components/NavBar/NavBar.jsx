import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import styles from "./style.module.css";

import ButtonLog from "./Button/ButtonLog";
import Consult from "./Tooltip/Consult";
import Persons from "./Tooltip/Persons";
import Inventory from "./Tooltip/Inventory";
import Purchases from "./Tooltip/Purchases";
import Sales from "./Tooltip/Sales";
import Logo from "./Logo/Logo";
import Setting from "./Setting/Setting";
import { AuthContext } from "../../context/authProvider";
import { renderValues } from "./renderValues";

const NavBar = () => {
    const [state] = useContext(AuthContext);
    const { user, permissions } = state;
    const [tooltip, setTooltip] = useState({});

    useEffect(() => {
        setTooltip(renderValues(permissions));
    }, [setTooltip, permissions]);

    return (
        <div className={styles.header}>
            <input type='checkbox' id={styles.show_menu} />
            {user && (
                <label for={styles.show_menu} className={styles.icon_menu}>
                    <i className='icon iconlist'></i>
                </label>
            )}
            <Logo />
            {user && (
                <nav className={styles.NavBar}>
                    <li className={styles.home}>
                        <NavLink to='/' className={styles.link}>
                            <i className='icon iconhome1'></i>
                            <div>Inicio</div>
                        </NavLink>
                    </li>
                    {tooltip.inventory && <Inventory permissions={permissions}/>}
                    {tooltip.persons && <Persons permissions={permissions}/>}
                    {tooltip.purchases && <Purchases permissions={permissions}/>}
                    {tooltip.sales && <Sales permissions={permissions}/>}
                    {tooltip.consult && <Consult permissions={permissions}/>}
                </nav>
            )}

            {user && (
                <div className={styles.options}>
                    {permissions?.setting && (<Setting />)}
                    <ButtonLog />
                </div>
            )}
        </div>
    );
};

export default NavBar;
