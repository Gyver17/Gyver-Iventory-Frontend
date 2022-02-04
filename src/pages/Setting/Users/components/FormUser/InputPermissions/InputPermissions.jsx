import React from "react";
import ToggleButton from "../../../../../../components/ToggleButton/ToggleButton";
import styles from "./style.module.css";

const InputPermissions = () => {
    return (
        <div className={styles.container}>
            <label className={styles.title}>Permisos</label>
            <div className={styles.inputs}>
                <ToggleButton
                    name='permissions.products'
                    type='checkbox'
                    title='Apartado de Productos'
                />
                <ToggleButton
                    name='permissions.products_create'
                    type='checkbox'
                    title='Crear Nuevos Productos'
                />
                <ToggleButton
                    name='permissions.products_update'
                    type='checkbox'
                    title='Modificar Productos'
                />
                <ToggleButton
                    name='permissions.products_delete'
                    type='checkbox'
                    title='Eliminar Productos'
                />
                <ToggleButton
                    name='permissions.category'
                    type='checkbox'
                    title='Apartado de Categoria'
                />
                <ToggleButton
                    name='permissions.category_create'
                    type='checkbox'
                    title='Crear Nuevas Categorias'
                />
                <ToggleButton
                    name='permissions.category_update'
                    type='checkbox'
                    title='Modificar Categorias'
                />
                <ToggleButton
                    name='permissions.category_delete'
                    type='checkbox'
                    title='Eliminar Categorias'
                />
                <ToggleButton
                    name='permissions.services'
                    type='checkbox'
                    title='Apartado de Servicios'
                />
                <ToggleButton
                    name='permissions.services_create'
                    type='checkbox'
                    title='Crear Nuevos Servicios'
                />
                <ToggleButton
                    name='permissions.services_update'
                    type='checkbox'
                    title='Modificar Servicios'
                />
                <ToggleButton
                    name='permissions.services_delete'
                    type='checkbox'
                    title='Eliminar Servicios'
                />
                <ToggleButton
                    name='permissions.client'
                    type='checkbox'
                    title='Apartado de Cliente'
                />
                <ToggleButton
                    name='permissions.client_create'
                    type='checkbox'
                    title='Crear Nuevos Clientes'
                />
                <ToggleButton
                    name='permissions.client_update'
                    type='checkbox'
                    title='Modificar Clientes'
                />
                <ToggleButton
                    name='permissions.client_delete'
                    type='checkbox'
                    title='Eliminar Clientes'
                />
                <ToggleButton
                    name='permissions.supplier'
                    type='checkbox'
                    title='Apartado de Proveedores'
                />
                <ToggleButton
                    name='permissions.supplier_create'
                    type='checkbox'
                    title='Crear Nuevos Proveedores'
                />
                <ToggleButton
                    name='permissions.supplier_update'
                    type='checkbox'
                    title='Modificar Proveedores'
                />
                <ToggleButton
                    name='permissions.supplier_delete'
                    type='checkbox'
                    title='Eliminar Proveedores'
                />
                <ToggleButton
                    name='permissions.employee'
                    type='checkbox'
                    title='Apartado de Empleados'
                />
                <ToggleButton
                    name='permissions.employee_create'
                    type='checkbox'
                    title='Crear Nuevos Empleados'
                />
                <ToggleButton
                    name='permissions.employee_update'
                    type='checkbox'
                    title='Modificar Empleados'
                />
                <ToggleButton
                    name='permissions.employee_delete'
                    type='checkbox'
                    title='Eliminar Empleados'
                />
                <ToggleButton
                    name='permissions.buy'
                    type='checkbox'
                    title='Apartado de Compras'
                />
                <ToggleButton
                    name='permissions.buy_return'
                    type='checkbox'
                    title='Apartado de Devoluciones de Compras'
                />
                <ToggleButton
                    name='permissions.buy_pay'
                    type='checkbox'
                    title='Apartado de Compras por Pagar'
                />
                <ToggleButton
                    name='permissions.sell'
                    type='checkbox'
                    title='Apartado de Ventas'
                />
                <ToggleButton
                    name='permissions.sell_return'
                    type='checkbox'
                    title='Apartado de Devoluciones de Ventas'
                />
                <ToggleButton
                    name='permissions.sell_pay'
                    type='checkbox'
                    title='Apartado de Ventas por Cobrar'
                />
                <ToggleButton
                    name='permissions.consult_product'
                    type='checkbox'
                    title='Apartado de Consultar por Producto'
                />
                <ToggleButton
                    name='permissions.consult_invoice'
                    type='checkbox'
                    title='Apartado de Consultar por Factura'
                />
                <ToggleButton
                    name='permissions.consult_movement'
                    type='checkbox'
                    title='Apartado de Consulta por Movimientos'
                />
                <ToggleButton
                    name='permissions.consult_supplier'
                    type='checkbox'
                    title='Apartado de Consulta por Proveedore'
                />
                <ToggleButton
                    name='permissions.consult_client'
                    type='checkbox'
                    title='Apartado de Consulta por Cliente'
                />
                <ToggleButton
                    name='permissions.setting'
                    type='checkbox'
                    title='Apartado de Configuración'
                />
            </div>
        </div>
    );
};

export default React.memo(InputPermissions);
