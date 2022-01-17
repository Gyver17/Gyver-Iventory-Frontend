import React, { useState } from 'react'
import styles from "./style.module.css"

const TableHeader = (props) => {
    const header = props.header
    const action = props.action
    const onSorting = props.onSorting

    const [sortingField, setSortingField] = useState("");
    const [sortingOrder, setSortingOrder] = useState("asc");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";

        setSortingField(field);
        setSortingOrder(order);
        onSorting(field, order);
    };

    return (
        <thead className={styles.container}>
            <tr>
                <th key="index" className={styles.index}>#</th>
                {
                    header.map(h => (
                        <th
                            key={h.title}
                            className={styles.th}
                            onClick={() =>
                                h.sortable ? onSortingChange(h.field) : null
                            }
                        >
                            {h.title}
                            {sortingField && sortingField === h.field && (
                                <i
                                    className={
                                        sortingOrder === "asc"
                                            ? "icon iconchevron-up"
                                            : "icon iconchevron-down"
                                    }
                                />
                            )}
                        </th>
                    ))
                }
                {
                    action && <th className={styles.th}>Acciones</th>
                }
            </tr>
        </thead>
    )
}

export default TableHeader
