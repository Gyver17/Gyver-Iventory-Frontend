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
        title: "Credito",
        field: "credit",
        type: "string",
        sortable: false,
    },
      {
        title: "Monto Total",
        field: "price_total",
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

const searchData = (data, value) => {
    let expresion = new RegExp(`${value}.*`, "i");
    return data.filter(
        (data) =>
            expresion.test(data.code) ||
            expresion.test(data.name) 
    );
};

export { columnInvoice, columnProduct, columnModal, searchData };
