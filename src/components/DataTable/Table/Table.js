import React from 'react'
import styles from "./style.module.css"

const Table = (props) => {
    const data = props.data
    const header = props.header
    const action = props.action
    const format = props.formatDecimal
    const symbol = props.moneySymbol

    const formatDecimal = (number) => {
        const config = {
            minimumFractionDigits: 2
        }
        if (format) {
            if (format === "0,000.00") {
                return new Intl.NumberFormat('en-US', config).format(number)
            }
            if (format === "0.000,00") {
                return new Intl.NumberFormat('de-DE', config).format(number)
            }
            else {
                return new Intl.NumberFormat(format, config).format(number)
            }
        } else {
            return new Intl.NumberFormat([], config).format(number)
        }
    }
    console.log(data)
    return (
        <tbody className={styles.container}>
            {data.map((dt, index) => (
                <tr key={index + 1} className={styles.tr}>
                    <th className={styles.index}>{index + 1}</th>
                    {
                        header.map(h => (
                            <td>{
                                h.type === "money" ?
                                    symbol + formatDecimal(dt[h.field]) :
                                    h.type === "numeric" ?
                                        formatDecimal(dt[h.field]) :
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
                                            {/* <div className={styles.tooltip}>
                                                {a.tooltip}
                                            </div> */}
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
