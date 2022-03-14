import React from "react";
import styles from "./style.module.css";

//Import Components
import Pagination from "./Pagination/Pagination";
import Search from "./Search/Search";
import Table from "./Table/Table";
import Header from "./Header/Header";
import TableHeader from "./TableHeader/TableHeader";

//Import Hooks
import usePagesData from "./hooks/usePagesData";

//Component
const DataTable = ({
    data,
    title,
    numberOfEntries,
    searchData,
    headerButtons,
    header,
    action,
    formatDecimal,
    quantityDecimal,
    moneySymbol,
    aroundCurrentPage,
}) => {
    const [
        pagesData,
        totalItems,
        itemsPerPage,
        currentPage,
        setCurrentPage,
        setSearch,
        setItemsPerPage,
        setSorting,
    ] = usePagesData(data, numberOfEntries, searchData);

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.titleAndSearch}>
                    {title && <div className={styles.title}>{title}</div>}
                    <Search
                        onSearch={(value) => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <Header
                    options={numberOfEntries}
                    buttons={headerButtons}
                    selectValue={(e) =>
                        setItemsPerPage(parseInt(e.target.value))
                    }
                />
                <div className={styles.containerTable}>
                    {pagesData && (
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
                                quantityDecimal={quantityDecimal}
                                moneySymbol={moneySymbol}
                                action={action}
                            />
                        </table>
                    )}
                </div>
            </div>

            <Pagination
                total={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                around={aroundCurrentPage}
                onClick={(page) => setCurrentPage(page)}
            />
        </div>
    );
};

export default DataTable;
