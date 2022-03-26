import React from "react";
import styles from "./style.module.css";

const Table = ({
    data,
    header,
    action,
    formatDecimal,
    quantityDecimal,
    moneySymbol,
}) => {
    const format = (number) => {
        const config = {
            minimumFractionDigits: quantityDecimal,
        };
        if (formatDecimal) {
            if (formatDecimal === "0,000.00") {
                return Intl.NumberFormat("en-US", config).format(number);
            }
            if (formatDecimal === "0.000,00") {
                return Intl.NumberFormat("de-DE", config).format(number);
            } else {
                return Intl.NumberFormat(format, config).format(number);
            }
        } else {
            return Intl.NumberFormat([], config).format(number);
        }
    };

    const types = (column, row) => {
        if (column.type === "money") {
            return moneySymbol + ' ' + format(parseFloat(row[column.field]));
        }
        if (column.type === "porcent") {
            return format(parseFloat(100*row[column.field])) + "%";
        }

        if (column.type === "numeric") {
            return format(parseFloat(row[column.field]));
        }
        if (column.type === "rol") {
            if (row[column.field] === "admin") {
                return "Administrador";
            }
            if (row[column.field] === "user") {
                return "Usuario";
            }
        } else {
            return row[column.field];
        }
    };

    return (
        <tbody className={styles.container}>
            {data.map((dt, index) => (
                <tr key={index + 1} className={styles.row}>
                    {header.map((h) => (
                        <td>{types(h, dt)}</td>
                    ))}
                    {action && (
                        <td>
                            <div className={styles.action}>
                                {action.map(
                                    (a) =>
                                        a.render && (
                                            <button
                                                className={styles.button}
                                                onClick={(e) => a.onClick(dt)}
                                            >
                                                <span className={a.icon} />
                                            </button>
                                        )
                                )}
                            </div>
                        </td>
                    )}
                </tr>
            ))}
        </tbody>
    );
};

export default Table;
