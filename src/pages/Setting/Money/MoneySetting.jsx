/* ------ Library Import ------ */
import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ------ Components Import ------ */
import DataTable from "../../../components/DataTable/DataTable";
import ToasterMessage, {
    toast,
} from "../../../components/ToasterMessage/ToasterMessage";
import PageLoading from "../../../components/PageLoading/PageLoading";
import SessionExpired from "../../../components/SessionExpired/SessionExpired";
import FormMoney from "./components/FormMoney/FormMoney";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { AuthContext } from "../../../context/authProvider";
import { column, searchData } from "./const/datatableProps";
import { getMoney, deleteMoney } from "../../../api/money";

/* ------ Component ------ */
const MoneySetting = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user, setting } = state

    // Component State
    const [form, setForm] = useState({ isOpen: false, title: "" });
    const [updateForm, setUpdateForm] = useState({
        isUpdate: false,
        row: undefined,
    });

    // Props DataTable
    const { data, isSuccess, isError } = useQuery(
        ["getMoney", user],
        async () => {
            return await getMoney(user.token, dispatch, toast);
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
            render: true,
            onClick: () => openForm(true, "Crear Nueva Moneda", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            render: true,
            onClick: (row) => openForm(true, "Modificar Moneda", true, row),
        },
        {
            icon: "icon icontrash-can3",
            render: true,
            onClick: async (row) =>
                await deleteMoney(
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
                        title='Divisas'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        formatDecimal={setting.number_format}
                        quantityDecimal={setting.qty_decimal}
                        aroundCurrentPage={5}
                        action={action}
                    />
                ) : (
                    <PageLoading />
                )}
            </div>
            <FormMoney
                form={form}
                setForm={setForm}
                update={updateForm}
                queryClient={queryClient}
            />
        </>
    );
};

export default MoneySetting;
