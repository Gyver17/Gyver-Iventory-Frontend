import { useState, useMemo } from 'react'

const usePagesData = (data, numberOfEntries, searchData) => {

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(numberOfEntries[0])
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const pagesData = useMemo(() => {
        let computedData = data;
        if (search) {
            computedData = searchData(computedData, search)
        }

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedData = computedData.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        setTotalItems(computedData.length);

        return computedData.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        );
        
    }, [data, search, currentPage, itemsPerPage, sorting, searchData]);

    return [
        pagesData,
        totalItems,
        itemsPerPage,
        currentPage,
        setCurrentPage,
        setSearch,
        setItemsPerPage,
        setSorting
    ]
}

export default usePagesData
