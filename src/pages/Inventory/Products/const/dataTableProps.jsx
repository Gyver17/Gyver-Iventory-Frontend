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
        title: "Categoria",
        field: "category",
        type: "string",
        sortable: true,
    },
    {
        title: "Cantidad",
        field: "quantity",
        type: "string",
        sortable: false,
    },
    {
        title: "Precio de Compra",
        field: "price_buy",
        type: "money",
        sortable: false,
    },
    {
        title: "Precio de Venta",
        field: "price_sell",
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
            expresion.test(data.category)
    );
};

export { column, searchData };
