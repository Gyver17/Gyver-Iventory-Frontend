/* ------ Library Import ------ */
import React, { useState, useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
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
import MinWidth from "../../../components/MinWidth/MinWidth";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getSupplier } from "../../../api/supplier";
import { getEmployee } from "../../../api/employee";
import { getNumbersInvoice } from "../../../api/numbersInvoice";
import { createInvoicePurchases } from "../../../api/invoicePurchases";
import { initialValues, validationSchema, sendValues } from "./const/values";
import { AuthContext } from "../../../context/authProvider";

const InvoicePurchases = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user, setting } = state;

    // Component State
    const [modal, setModal] = useState({ isOpen: false, title: "" });
    const [productsInvoice, setProductsInvoice] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [numberInvoice, setNumberInvoice] = useState(0);
    const [requestLoading, setRequestLoading] = useState(false);
    const [minWidth, setMinWidth] = useState(false);

    // Props DataTable
    const { data, isSuccess, isError } = useQuery(
        ["getInvoicePurchases", user],
        async () => {
            const employees = await getEmployee(user.token, dispatch, toast);
            const suppliers = await getSupplier(user.token, dispatch, toast);
            const number = await getNumbersInvoice(user.token, dispatch, toast);
            setNumberInvoice(number[0].buy);

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

            const optionsSuppliers = [];
            suppliers.map((supplier) =>
                optionsSuppliers.push({
                    value: supplier.id,
                    label:
                        supplier.code +
                        " - " +
                        supplier.name +
                        " - " +
                        supplier.doc_id,
                })
            );
            return { optionsEmployees, optionsSuppliers };
        }
    );

    const queryClient = useQueryClient();

    const {
        control,
        handleSubmit,
        setValue,
        getValues,
        reset,
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
        setMinWidth(window.innerWidth < 800 && window.innerHeight < 600);
    }, [setMinWidth]);

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

    if (minWidth) {
        return (
            <MinWidth
                content={
                    "Debe Tener Una Resolución De Pantalla Mayor a 800x600px"
                }
            />
        );
    }

    const clear = () => {
        setProductsInvoice([]);
        setStartDate(new Date());
        reset();
    };

    const onSubmit = (data) => {
        const values = sendValues(
            data,
            startDate,
            numberInvoice,
            productsInvoice
        );
        setRequestLoading(true);
        createInvoicePurchases(
            user.token,
            values,
            dispatch,
            toast,
            queryClient
        );
        setRequestLoading(false);
        clear();
        console.log(values);
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
                                    title='Observación'
                                    name='observation'
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
                            <ButtonForm title='Limpiar' onClick={clear} />
                            <ButtonForm
                                title={
                                    requestLoading
                                        ? "...Registrando"
                                        : "Registrar"
                                }
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
