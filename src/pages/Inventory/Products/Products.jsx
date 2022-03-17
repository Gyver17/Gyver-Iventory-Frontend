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
import FormProduct from "./components/FormProduct/FormProduct";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getProducts, deleteProducts } from "../../../api/products";
import { getCategory } from "../../../api/category";
import { column, searchData } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

/* ------ Component ------ */
const Products = () => {
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
        ["getProducts", user],
        async () => {
            const products = await getProducts(user.token, dispatch, toast);
            const categorys = await getCategory(user.token, dispatch, toast);
            const optionsCategory = [];
            categorys.map((category) =>
                optionsCategory.push({
                    value: category.id,
                    label: category.name,
                })
            );
            return { products, optionsCategory };
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
            render: permissions?.products_create,
            onClick: () => openForm(true, "Crear Nuevo Producto", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            render: permissions?.products_update,
            onClick: (row) => openForm(true, "Modificar Producto", true, row),
        },
        {
            icon: "icon icontrash-can3",
            render: permissions?.products_delete,
            onClick: async (row) =>
                await deleteProducts(
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
                        title='Productos'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data?.products}
                        aroundCurrentPage={5}
                        formatDecimal={setting?.number_format}
                        quantityDecimal={setting?.qty_decimal}
                        moneySymbol={setting?.first_symbol}
                        action={
                            permissions?.products_update ||
                            permissions?.products_delete
                                ? action
                                : false
                        }
                    />
                ) : (
                    <PageLoading />
                )}
            </div>
            <FormProduct
                form={form}
                setForm={setForm}
                update={updateForm}
                queryClient={queryClient}
                options={data?.optionsCategory}
            />
        </>
    );
};

export default Products;
