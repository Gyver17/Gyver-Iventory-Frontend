const initialValues = {
    user: {
        name: "",
        mail: "",
        rol: "",
        password: "",
    },
    permissions: {
        products: false,
        products_create: false,
        products_update: false,
        products_delete: false,
        category: false,
        category_create: false,
        category_update: false,
        category_delete: false,
        services: false,
        services_create: false,
        services_update: false,
        services_delete: false,
        client: false,
        client_create: false,
        client_update: false,
        client_delete: false,
        supplier: false,
        supplier_create: false,
        supplier_update: false,
        supplier_delete: false,
        employee: false,
        employee_create: false,
        employee_update: false,
        employee_delete: false,
        buy: false,
        buy_return: false,
        buy_pay: false,
        sell: false,
        sell_return: false,
        sell_pay: false,
        consult_product: false,
        consult_invoice: false,
        consult_movement: false,
        consutl_supplier: false,
        consult_client: false,
        setting: false,
    }
}

export { initialValues }