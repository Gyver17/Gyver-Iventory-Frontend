import React from 'react'
import styles from "./style.module.css"

const Table = ({data, header, action, formatDecimal, moneySymbol}) => {
 
    const format = (number) => {
        const config = {
            minimumFractionDigits: 2
        }
        if (formatDecimal) {
            if (formatDecimal === "0,000.00") {
                return new Intl.NumberFormat('en-US', config).format(number)
            }
            if (formatDecimal === "0.000,00") {
                return new Intl.NumberFormat('de-DE', config).format(number)
            }
            else {
                return new Intl.NumberFormat(format, config).format(number)
            }
        } else {
            return new Intl.NumberFormat([], config).format(number)
        }
    }

    return (
        <tbody className={styles.container}>
            {data.map((dt, index) => (
                <tr key={index + 1} className={styles.row}>
                    {
                        header.map(h => (
                            <td>{
                                h.type === "money" ?
                                    moneySymbol + format(dt[h.field]) :
                                    h.type === "numeric" ?
                                        format(dt[h.field]) :
                                        dt[h.field]
                            }</td>
                        ))
                    }
                    {
                        action &&
                        <td>
                            <div className={styles.action}>
                                {
                                    action.map(a => (
                                        <div className={styles.containerButton}>
                                            <button className={styles.button} onClick={e => a.onClick(dt)}>
                                                <i className={a.icon} />
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </td>
                    }
                </tr>
            ))}
        </tbody>
    )
}

export default Table
