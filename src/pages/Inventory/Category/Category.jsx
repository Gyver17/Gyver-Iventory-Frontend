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
import FormCategory from "./components/FormCategory/FormCategory";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getCategory, deleteCategory } from "../../../api/category";
import { column, searchData } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

/* ------ Component ------ */
const Category = () => {
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
        ["getCategory", user],
        async () => {
            return await getCategory(user.token, dispatch, toast);
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
            onClick: () => openForm(true, "Crear Nueva Categoria", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            onClick: (row) => openForm(true, "Modificar Categoria", true, row),
        },
        {
            icon: "icon icontrash-can3",
            onClick: async (row) =>
                await deleteCategory(
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
                        title='Categoria'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        aroundCurrentPage={5}
                        action={action}
                    />
                ) : (
                    <PageLoading />
                )}
            </div>
            <FormCategory
                form={form}
                setForm={setForm}
                update={updateForm}
                queryClient={queryClient}
            />
        </>
    );
};

export default Category;
