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
import FormEmployee from "./components/FormEmployee/FormEmployee";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getEmployee, deleteEmployee } from "../../../api/employee";
import { column, searchData } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

const Employee = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user, permissions, setting } = state;

    // Component State
    const [form, setForm] = useState({ isOpen: false, title: "" });
    const [updateForm, setUpdateForm] = useState({
        isUpdate: false,
        row: undefined,
    });

    // Props DataTable
    const { data, isSuccess, isError } = useQuery(
        ["getEmployee", user],
        async () => {
            return await getEmployee(user.token, dispatch, toast);
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
            render: permissions?.employee_create,
            onClick: () => openForm(true, "Crear Nuevo Empleado", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            render: permissions?.employee_update,
            onClick: (row) => openForm(true, "Modificar Empleado", true, row),
        },
        {
            icon: "icon icontrash-can3",
            render: permissions?.employee_delete,
            onClick: async (row) =>
                await deleteEmployee(
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
                        title='Empleados'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        aroundCurrentPage={5}
                        formatDecimal={setting?.number_format}
                        quantityDecimal={setting?.qty_decimal}
                        moneySymbol={setting?.first_symbol}
                        action={
                            permissions?.employee_update ||
                            permissions?.employee_delete
                                ? action
                                : false
                        }
                    />
                ) : (
                    <PageLoading />
                )}
            </div>
            <FormEmployee
                form={form}
                setForm={setForm}
                update={updateForm}
                queryClient={queryClient}
            />
        </>
    );
};

export default Employee;
