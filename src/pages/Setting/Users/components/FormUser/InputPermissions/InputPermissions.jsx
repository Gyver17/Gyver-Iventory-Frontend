/* ------ Imports ------ */
import React from "react";
import ToggleButton from "../../../../../../components/ToggleButton/ToggleButton";
import styles from "./style.module.css";

/* ------ Component ------ */
const InputPermissions = ({control}) => {
    return (
        <div className={styles.container}>
            <label className={styles.title}>Permisos</label>
            <div className={styles.inputs}>
                <ToggleButton
                    name='permissions.products'
                    title='Apartado de Productos'
                    control={control}
                />
                <ToggleButton
                    name='permissions.products_create'
                    title='Crear Nuevos Productos'
                    control={control}
                />
                <ToggleButton
                    name='permissions.products_update'
                    title='Modificar Productos'
                    control={control}
                />
                <ToggleButton
                    name='permissions.products_delete'
                    title='Eliminar Productos'
                    control={control}
                />
                <ToggleButton
                    name='permissions.category'
                    title='Apartado de Categoria'
                    control={control}
                />
                <ToggleButton
                    name='permissions.category_create'
                    title='Crear Nuevas Categorias'
                    control={control}
                />
                <ToggleButton
                    name='permissions.category_update'
                    title='Modificar Categorias'
                    control={control}
                />
                <ToggleButton
                    name='permissions.category_delete'
                    title='Eliminar Categorias'
                    control={control}
                />
                <ToggleButton
                    name='permissions.services'
                    title='Apartado de Servicios'
                    control={control}
                />
                <ToggleButton
                    name='permissions.services_create'
                    title='Crear Nuevos Servicios'
                    control={control}
                />
                <ToggleButton
                    name='permissions.services_update'
                    title='Modificar Servicios'
                    control={control}
                />
                <ToggleButton
                    name='permissions.services_delete'
                    title='Eliminar Servicios'
                    control={control}
                />
                <ToggleButton
                    name='permissions.client'
                    title='Apartado de Cliente'
                    control={control}
                />
                <ToggleButton
                    name='permissions.client_create'
                    title='Crear Nuevos Clientes'
                    control={control}
                />
                <ToggleButton
                    name='permissions.client_update'
                    title='Modificar Clientes'
                    control={control}
                />
                <ToggleButton
                    name='permissions.client_delete'
                    title='Eliminar Clientes'
                    control={control}
                />
                <ToggleButton
                    name='permissions.supplier'
                    title='Apartado de Proveedores'
                    control={control}
                />
                <ToggleButton
                    name='permissions.supplier_create'
                    title='Crear Nuevos Proveedores'
                    control={control}
                />
                <ToggleButton
                    name='permissions.supplier_update'
                    title='Modificar Proveedores'
                    control={control}
                />
                <ToggleButton
                    name='permissions.supplier_delete'
                    title='Eliminar Proveedores'
                    control={control}
                />
                <ToggleButton
                    name='permissions.employee'
                    title='Apartado de Empleados'
                    control={control}
                />
                <ToggleButton
                    name='permissions.employee_create'
                    title='Crear Nuevos Empleados'
                    control={control}
                />
                <ToggleButton
                    name='permissions.employee_update'
                    title='Modificar Empleados'
                    control={control}
                />
                <ToggleButton
                    name='permissions.employee_delete'
                    title='Eliminar Empleados'
                    control={control}
                />
                <ToggleButton
                    name='permissions.buy'
                    title='Apartado de Compras'
                    control={control}
                />
                <ToggleButton
                    name='permissions.buy_return'
                    title='Apartado de Devoluciones de Compras'
                    control={control}
                />
                <ToggleButton
                    name='permissions.buy_pay'
                    title='Apartado de Compras por Pagar'
                    control={control}
                />
                <ToggleButton
                    name='permissions.sell'
                    title='Apartado de Ventas'
                    control={control}
                />
                <ToggleButton
                    name='permissions.sell_return'
                    title='Apartado de Devoluciones de Ventas'
                    control={control}
                />
                <ToggleButton
                    name='permissions.sell_pay'
                    title='Apartado de Ventas por Cobrar'
                    control={control}
                />
                <ToggleButton
                    name='permissions.consult_product'
                    title='Apartado de Consultar por Producto'
                    control={control}
                />
                <ToggleButton
                    name='permissions.consult_invoice'
                    title='Apartado de Consultar por Factura'
                    control={control}
                />
                <ToggleButton
                    name='permissions.consult_movement'
                    title='Apartado de Consulta por Movimientos'
                    control={control}
                />
                <ToggleButton
                    name='permissions.consult_supplier'
                    title='Apartado de Consulta por Proveedore'
                    control={control}
                />
                <ToggleButton
                    name='permissions.consult_client'
                    title='Apartado de Consulta por Cliente'
                    control={control}
                />
                <ToggleButton
                    name='permissions.setting'
                    title='Apartado de Configuración'
                    control={control}
                />
            </div>
        </div>
    );
};

export default React.memo(InputPermissions);
