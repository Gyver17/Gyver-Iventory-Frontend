/* ------ Library Import ------ */
import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ------ Components Import ------ */
import DataTable from "../../../components/DataTable/DataTable";
import PageLoading from "../../../components/PageLoading/PageLoading";
import ToasterMessage, {
    toast,
} from "../../../components/ToasterMessage/ToasterMessage";
import SessionExpired from "../../../components/SessionExpired/SessionExpired";
import FormSupplier from "./components/FormSupplier/FormSupplier";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getSupplier, deleteSupplier } from "../../../api/supplier";
import { column, searchData } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

const Supplier = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user, permissions } = state;

    // Component State
    const [form, setForm] = useState({ isOpen: false, title: "" });
    const [updateForm, setUpdateForm] = useState({
        isUpdate: false,
        row: undefined,
    });

    // Props DataTable
    const { data, isSuccess, isError } = useQuery(
        ["getSupplier", user],
        async () => {
            return await getSupplier(user.token, dispatch, toast);
        }
    );

    const queryClient = useQueryClient();

    if (isError) {
        return <SessionExpired serverError={true} />;
    }

    const openForm = (isOpen, title, isUpdate, row) => {
        setForm({ isOpen, title });
        setUpdateForm({ isUpdate, row });
    };

    const button = [
        {
            icon: "icon iconplus",
            render: permissions?.supplier_create,
            onClick: () => openForm(true, "Crear Nuevo Proveedor", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            render: permissions?.supplier_update,
            onClick: (row) => openForm(true, "Modificar Proveedor", true, row),
        },
        {
            icon: "icon icontrash-can3",
            render: permissions?.supplier_delete,
            onClick: async (row) =>
                await deleteSupplier(
                    row.id,
                    user.token,
                    dispatch,
                    toast,
                    queryClient
                ),
        },
    ];

    return (
        <>
            <ToasterMessage />
            <div className={styles.container}>
                {isSuccess ? (
                    <DataTable
                        title='proveedores'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        aroundCurrentPage={5}
                        action={
                            permissions?.supplier_update ||
                            permissions?.supplier_delete
                                ? action
                                : false
                        }
                    />
                ) : (
                    <PageLoading />
                )}
            </div>
            <FormSupplier
                form={form}
                setForm={setForm}
                update={updateForm}
                queryClient={queryClient}
            />
        </>
    )
}

export default Supplier

