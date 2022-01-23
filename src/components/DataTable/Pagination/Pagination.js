import React, { useEffect, useState, useMemo } from "react";
import styles from "./style.module.css"

const Pagination = ({total, itemsPerPage, currentPage, onClick, around}) => {

    const onPageChange = onClick
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (total > 0 && itemsPerPage > 0) {
            setTotalPages(Math.ceil(total / itemsPerPage))
        }
    }, [total, itemsPerPage, totalPages]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for (let i = currentPage - around; i <= currentPage + around; i++) {
            if (i > 0) {
                if (i <= totalPages) {
                    pages.push(
                        <button
                            key={i}
                            className={i === currentPage ? styles.selected : styles.around}
                            active={i === currentPage}
                            onClick={() => onPageChange(i)}
                        >
                            {i}
                        </button>
                    );
                }
            }
        }

        return pages;
    }, [totalPages, currentPage, onPageChange, around]);

    if (totalPages === 0) return null;
    
    return (
        <div className={styles.container}>

            {
                currentPage > around + 1 &&
                <button
                    className="icon iconangle-double-left"
                    id={styles.changePage}
                    onClick={() => onPageChange(currentPage - (around + 1))} />
            }

            {
                currentPage > 1 &&
                <button
                    className="icon iconchevron-left"
                    id={styles.changePage}
                    onClick={() =>
                        onPageChange(currentPage - 1)} />
            }

            {paginationItems}

            {
                currentPage < totalPages &&
                <button
                    className="icon iconchevron-right"
                    id={styles.changePage}
                    onClick={() => onPageChange(currentPage + 1)} />
            }

            {
                currentPage <= totalPages - (around + 1) &&
                <button
                    className="icon iconangle-double-right"
                    id={styles.changePage}
                    onClick={() => onPageChange(currentPage + (around + 1))} />
            }

        </div>
    )
}

export default Pagination
