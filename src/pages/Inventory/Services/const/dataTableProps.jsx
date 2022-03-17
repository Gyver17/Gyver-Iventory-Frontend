const column = [
    {
        title: "Codigo",
        field: "code",
        type: "string",
        sortable: true,
    },
    {
        title: "Nombre",
        field: "name",
        type: "string",
        sortable: true,
    },
    {
        title: "Descripcion",
        field: "description",
        type: "string",
        sortable: false,
    },
    {
        title: "Unidad",
        field: "unit_symbol",
        type: "string",
        sortable: true,
    },
    {
        title: "Precio Por Unidad",
        field: "price_unit",
        type: "money",
        sortable: false,
    },
];

const searchData = (data, value) => {
    let expresion = new RegExp(`${value}.*`, "i");
    return data.filter(
        (data) =>
            expresion.test(data.code) ||
            expresion.test(data.name) ||
            expresion.test(data.description) ||
            expresion.test(data.unit_symbol)
    );
};

export { column, searchData };
