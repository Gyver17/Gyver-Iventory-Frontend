import React from 'react'
import styles from "./style.module.css"

const Header = (props) => {
    const options = props.options
    const buttons = props.buttons
    const selectValue = props.selectValue

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                {
                    options &&
                    <div className={styles.selectContainer}>
                        <div className={styles.selectTitle}>Cantidad de filas: </div>
                        <select className={styles.select} onChange={(e) => selectValue(e)}>
                            {
                                options.map(option => (
                                    <option value={option}>{option}</option>
                                ))
                            }
                        </select>
                    </div>
                }

                {
                    buttons &&
                    <div className={styles.buttons}>
                        {
                            buttons.map(button => (
                                <div>
                                    <button className={styles.button} onClick={button.onClick}>
                                        <i className={button.icon} />
                                    </button>
                                    {/* <div className={styles.tooltip}>{button.tooltip}</div> */}
                                </div>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Header