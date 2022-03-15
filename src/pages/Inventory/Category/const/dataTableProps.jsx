const column = [
    {
        title: "Nombre",
        field: "name",
        type: "string",
        sortable: true,
    },
    {
        title: "Cantidad de Productos",
        field: "quantity",
        type: "string",
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
