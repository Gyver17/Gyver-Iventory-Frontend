/* ------ Library Import ------ */
import React, { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ------ Components Import ------ */
import Header from "./components/Header/Header";
import ProductTable from "./components/ProductTable/ProductTable";
import PersonData from "./components/PersonData/PersonData";
import AccountingData from "./components/AccountingData/AccountingData";
import CreditData from "./components/CreditData/CreditData";
import ButtonForm from "../../../components/ButtonForm/ButtonForm";
import TextArea from "../../../components/TextArea/TextArea";
import ProductModal from "./components/ProductModal/ProductModal";
import SessionExpired from "../../../components/SessionExpired/SessionExpired";
import ToasterMessage, {
    toast,
} from "../../../components/ToasterMessage/ToasterMessage";
import PageLoading from "../../../components/PageLoading/PageLoading";
import ErrorMessage from "../../../components/ErrorMessage/ErrorMessage";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getClient } from "../../../api/client";
import { getEmployee } from "../../../api/employee";
import { getNumbersInvoice } from "../../../api/numbersInvoice";
// import { column, searchData } from "./const/dataTableProps";
import { initialValues, validationSchema } from "./const/values";
import { AuthContext } from "../../../context/authProvider";

const InvoicePurchases = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user, setting } = state;

    // Component State
    const [modal, setModal] = useState({ isOpen: false, title: "" });
    const [productsInvoice, setProductsInvoice] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [numberInvoice, setNumberInvoice] = useState(0)

    // Props DataTable
    const { data, isSuccess, isError } = useQuery(
        ["getOptions", user],
        async () => {
            const employees = await getEmployee(user.token, dispatch, toast);
            const clients = await getClient(user.token, dispatch, toast);
            const number = await getNumbersInvoice(user.token, dispatch, toast);
            setNumberInvoice(number[0].buy)

            const optionsEmployees = [];
            employees.map((employee) =>
                optionsEmployees.push({
                    value: employee.id,
                    label:
                        employee.code +
                        " - " +
                        employee.name +
                        " - " +
                        employee.doc_id,
                })
            );

            const optionsClients = [];
            clients.map((client) =>
                optionsClients.push({
                    value: client.id,
                    label:
                        client.code +
                        " - " +
                        client.name +
                        " - " +
                        client.doc_id,
                })
            );
            return { optionsEmployees, optionsClients };
        }
    );

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        // reset,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(validationSchema),
    });

    const discount = useWatch({
        control,
        name: "discount",
    });

    useEffect(() => {
        const subTotal = productsInvoice.reduce(
            (prev, next) => prev + (next["totalPrice"] || 0),
            0
        );

        setValue("subTotal", subTotal);
        setValue("iva", subTotal * setting.iva);
        setValue(
            "total",
            subTotal +
                getValues("iva") -
                ((subTotal + getValues("iva")) * discount) / 100
        );
    }, [productsInvoice, discount, setValue, getValues, setting]);

    if (isError) {
        return <SessionExpired serverError={true} />;
    }

    const onSubmit = (data) => {
        console.log(data, startDate, numberInvoice);
    };

    return (
        <>
            {isSuccess ? (
                <>
                    <ToasterMessage />
                    <div className={styles.container}>
                        <span className={styles.title}>Registrar Compra</span>
                        <div className={styles.body}>
                            <Header
                                numberInvoice={numberInvoice}
                                startDate={startDate}
                                setStartDate={setStartDate}
                            />
                            <div className={styles.bodyInvoice}>
                                <ProductTable
                                    setModal={setModal}
                                    productsInvoice={productsInvoice}
                                    setProductsInvoice={setProductsInvoice}
                                />
                                <PersonData
                                    control={control}
                                    options={data}
                                    setValue={setValue}
                                    errors={errors}
                                />
                            </div>
                            <span className={styles.subTitle}>
                                Detalles de la Compra
                            </span>
                            <div className={styles.foosterInvoice}>
                                <AccountingData
                                    control={control}
                                    setValue={setValue}
                                    errors={errors}
                                />
                                <CreditData
                                    control={control}
                                    setValue={setValue}
                                    getValues={getValues}
                                    errors={errors}
                                />
                                <TextArea
                                    title='Descripción'
                                    name='description'
                                    control={control}
                                />
                                {errors.description?.message && (
                                    <ErrorMessage
                                        message={errors.description.message}
                                    />
                                )}
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <ButtonForm title='Limpiar' />
                            <ButtonForm
                                title='Registrar'
                                onClick={handleSubmit(onSubmit)}
                            />
                        </div>
                    </div>
                    <ProductModal
                        form={modal}
                        setForm={setModal}
                        productsInvoice={productsInvoice}
                        setProductsInvoice={setProductsInvoice}
                        setValue={setValue}
                    />
                </>
            ) : (
                <PageLoading />
            )}
        </>
    );
};

export default InvoicePurchases;
