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
        title: "Documento de identificación",
        field: "doc_id",
        type: "string",
        sortable: true,
    },
    {
        title: "Correo Electrónico",
        field: "mail",
        type: "string",
        sortable: true,
    },
    {
        title: "Numero de Telefono",
        field: "phone",
        type: "string",
        sortable: true,
    },
    {
        title: "Salario Por Mes",
        field: "salary",
        type: "money",
        sortable: false,
    },
    {
        title: "Comisiones de Ventas",
        field: "com_sell",
        type: "porcent",
        sortable: false,
    },
      {
        title: "Comisiones de Servicios",
        field: "com_service",
        type: "porcent",
        sortable: false,
    },
];

const searchData = (data, value) => {
    let expresion = new RegExp(`${value}.*`, "i");
    return data.filter(
        (data) =>
            expresion.test(data.name) ||
            expresion.test(data.code) ||
            expresion.test(data.mail) ||
            expresion.test(data.doc_id) ||
            expresion.test(data.phone)
    );
};

export { column, searchData };
