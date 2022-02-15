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
import { requestGet, requestDelete } from "./hooks/request";

/* ------ Component ------ */
const MoneySetting = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user } = state;

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
            return await requestGet(user.token, dispatch, toast);
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
            onClick: () => openForm(true, "Crear Nueva Moneda", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            onClick: (row) => openForm(true, "Modificar Moneda", true, row),
        },
        {
            icon: "icon icontrash-can3",
            onClick: async (row) =>
                await requestDelete(
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
                        title='Monedas'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        formatDecimal='0,000.00'
                        // moneySymbol={data.symbol}
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
