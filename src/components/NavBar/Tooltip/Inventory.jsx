import { NavLink } from 'react-router-dom'
import styles from './style.module.css'

const Inventory = () => {
    return (
        <li className={styles.tooltip}>
            <input type="checkbox" id={styles.show_inventory} />
            <div className={styles.title_tooltip}>
                <div className={styles.title}>
                    <i className="icon iconchevron-right"></i>
                    <div>Inventario</div>
                </div>
                <label for={styles.show_inventory}>
                    <i className="icon iconchevron-right"></i>
                    <div>Inventario</div>
                </label>
            </div>
            <ul className={styles.list}>
                <li>
                    <NavLink to='/category' className={styles.link}>
                        <i className="icon icontags"></i>
                        <div>Categorias</div>
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/products' className={styles.link}>
                        <i className="icon iconpackage1"></i>
                        <div>Productos</div>
                    </NavLink>
                </li>
            </ul>
        </li>
    )
}

export default Inventory
