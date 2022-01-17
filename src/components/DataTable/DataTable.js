import React from "react";
import styles from "./style.module.css"

//Import Components
import Pagination from "./Pagination/Pagination";
import Search from "./Search/Search";
import Table from "./Table/Table";
import Header from "./Header/Header"
import TableHeader from "./TableHeader/TableHeader";

//Import Hooks
import usePagesData from "./hooks/usePagesData"

//Component
const DataTable = (props) => {
    const data = props.data
    const title = props.titleTable
    const numberOfEntries = props.numberOfEntries
    const headerButtons = props.headerButtons
    const header = props.header
    const action = props.action
    const formatDecimal = props.formatDecimal
    const moneySymbol = props.moneySymbol
    const aroundCurrentPage = props.aroundCurrentPage

    const [pagesData,
        totalItems,
        itemsPerPage,
        currentPage,
        setCurrentPage,
        setSearch,
        setItemsPerPage,
        setSorting] = usePagesData(data, numberOfEntries, header)

    return (
        <div className={styles.container}>
            <div className={styles.titleAndSearch}>
                {
                    title && <div className={styles.title}>{title}</div>
                }
                <Search
                    onSearch={value => {
                        setSearch(value);
                        setCurrentPage(1);
                    }}
                />
            </div>

            <Header
                options={numberOfEntries}
                buttons={headerButtons}
                selectValue={(e) => setItemsPerPage(parseInt(e.target.value))}
            />

            <table className={styles.table}>
                <TableHeader
                    header={header}
                    action={action}
                    onSorting={(field, order) =>
                        setSorting({ field, order })
                    }
                />

                <Table
                    data={pagesData}
                    header={header}
                    formatDecimal={formatDecimal}
                    moneySymbol={moneySymbol}
                    action={action}
                />
            </table>

            <Pagination
                total={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                around={aroundCurrentPage}
                onClick={(page) => setCurrentPage(page)}
            />
        </div>
    )
}

export default DataTable
