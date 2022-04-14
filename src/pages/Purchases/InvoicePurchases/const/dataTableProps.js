const columnInvoice = [
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
        title: "Cantidad",
        field: "quantity",
        type: "numeric",
        sortable: false,
    },
    {
        title: "Precio de Compra",
        field: "price_buy",
        type: "money",
        sortable: false,
    },
    {
        title: "Precio Total",
        field: "totalPrice",
        type: "money",
        sortable: false,
    },
];

const columnModal = [
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
        type: "numeric",
        sortable: false,
    },
    {
        title: "Precio de Compra",
        field: "price_buy",
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

export { columnInvoice, columnModal, searchData };
