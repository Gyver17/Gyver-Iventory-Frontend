const column = [
    {
        title: "Nombre",
        field: "name",
        type: "string",
        sortable: true,
    },
    {
        title: "Symbolo",
        field: "symbol",
        type: "string",
        sortable: true,
    },
    {
        title: "Valor Respecto a Principal",
        field: "value",
        type: "numeric",
        sortable: false,
    },
];

const searchData = (data, value) => {
    let expresion = new RegExp(`${value}.*`, "i");
    return data.filter(
        (data) => expresion.test(data.name)
    );
};

export { column, searchData };
