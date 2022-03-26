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
import FormClient from "./components/FormClient/FormClient";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getClient, deleteClient } from "../../../api/client";
import { column, searchData } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

const Client = () => {
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
        ["getClient", user],
        async () => {
            return await getClient(user.token, dispatch, toast);
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
            render: permissions?.client_create,
            onClick: () => openForm(true, "Crear Nuevo Cliente", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            render: permissions?.client_update,
            onClick: (row) => openForm(true, "Modificar Cliente", true, row),
        },
        {
            icon: "icon icontrash-can3",
            render: permissions?.client_delete,
            onClick: async (row) =>
                await deleteClient(
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
                        title='Clientes'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        aroundCurrentPage={5}
                        action={
                            permissions?.client_update ||
                            permissions?.client_delete
                                ? action
                                : false
                        }
                    />
                ) : (
                    <PageLoading />
                )}
            </div>
            <FormClient
                form={form}
                setForm={setForm}
                update={updateForm}
                queryClient={queryClient}
            />
        </>
    )
}

export default Client
