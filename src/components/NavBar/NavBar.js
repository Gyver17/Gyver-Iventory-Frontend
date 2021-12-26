import { NavLink } from 'react-router-dom'

import styles from './style.module.css'

import ButtonLog from './Button/ButtonLog'
import Consult from './Tooltip/Consult'
import Persons from './Tooltip/Persons'
import Inventory from './Tooltip/Inventory'
import Purchases from './Tooltip/Purchases'
import Sales from './Tooltip/Sales'
import Logo from './Logo/Logo'
import Setting from './Setting/Setting'

const NavBar = () => {
    return (
        <div className={styles.header}>
            <input type="checkbox" id={styles.show_menu} />
            <label for={styles.show_menu} className={styles.icon_menu}>
                <i className="icon iconlist"></i>
            </label>
            <Logo />
            <nav className={styles.NavBar}>
                <li className={styles.home}>
                    <NavLink to='/' className={styles.link} >
                        <i className="icon iconhome1"></i>
                        <div>Inicio</div>
                    </NavLink>
                </li>
                <Inventory />
                <Persons />
                <Purchases />
                <Sales />
                <Consult />
            </nav>
            <div className={styles.options}>
                <Setting />
                <ButtonLog />
            </div>
        </div>
    )
}

export default NavBar
