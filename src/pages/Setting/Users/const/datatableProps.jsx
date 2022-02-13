const column = [
    {
        title: "Nombre",
        field: "name",
        type: "string",
        sortable: true
    },
    {
        title: "Correo Electrónico",
        field: "mail",
        type: "string",
        sortable: true
    },
    {
        title: "Rol",
        field: "rol",
        type: "rol",
        sortable: true,
    }
]

const searchData = (data, value) => {
    let expresion = new RegExp(`${value}.*`, "i")
    return data.filter(
        data => expresion.test(data.name) || expresion.test(data.mail) || expresion.test(data.rol))
}

export { column, searchData }