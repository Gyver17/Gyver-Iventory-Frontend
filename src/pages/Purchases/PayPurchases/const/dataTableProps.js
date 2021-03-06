const columnInvoice = [
    {
        title: "N° Factura",
        field: "number",
        type: "invoice",
        sortable: true,
    },
    {
        title: "Proveedor",
        field: "name_supplier",
        type: "string",
        sortable: true,
    },
    {
        title: "Empleado",
        field: "name_employee",
        type: "string",
        sortable: true,
    },
    {
        title: "Fecha de Facturación",
        field: "date",
        type: "string",
        sortable: false,
    },
    {
        title: "Monto Total",
        field: "price_total",
        type: "money",
        sortable: false,
    },
    {
        title: "Monto Abonado",
        field: "amount_pay",
        type: "money",
        sortable: false,
    },
    {
        title: "Monto Restante",
        field: "amount_remaining",
        type: "money",
        sortable: false,
    },
];

const columnProduct = [
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
        field: "price_total",
        type: "money",
        sortable: false,
    },
];

const columnModal = [
    {
        title: "Fecha de Pago",
        field: "payment_date",
        type: "string",
        sortable: false,
    },
    {
        title: "Monto Abonado",
        field: "amount",
        type: "money",
        sortable: false,
    },
    {
        title: "Monto Restante",
        field: "remaining",
        type: "money",
        sortable: false,
    },
];

const searchData = (data, value) => {
    let expresion = new RegExp(`${value}.*`, "i");
    return data.filter(
        (data) => expresion.test(data.code) || expresion.test(data.name)
    );
};

export { columnInvoice, columnProduct, columnModal, searchData };
