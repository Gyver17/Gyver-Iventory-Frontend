import { useState, useMemo } from 'react'
import { chunk } from 'lodash'

const usePagesData = (data, numberOfEntries, header) => {

    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(numberOfEntries[0])
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const pagesData = useMemo(() => {
        let computedData = data;
        if (search) {
            let expresion = new RegExp(`${search}.*`, "i")
            header.forEach(header => {
                if (header.search && header.type === "string") {
                    computedData = computedData.filter(
                        data => expresion.test(data[header.field])
                    )
                }
            })
        }

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedData = computedData.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        setTotalItems(computedData.length);

        //Current Page slice
        /* return computedData.slice(
            (currentPage - 1) * itemsPerPage,
            (currentPage - 1) * itemsPerPage + itemsPerPage
        ); */
        console.log(computedData)
        console.log(chunk(computedData, itemsPerPage))
        const chunkData = chunk(computedData, itemsPerPage)
        return chunkData[currentPage]
    }, [data, header, search, currentPage, itemsPerPage, sorting]);

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
