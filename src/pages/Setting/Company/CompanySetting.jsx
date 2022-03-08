/* ------ Library Import ------ */
import React, { useContext, useEffect, useState } from "react";

import AccountingSetting from "./components/AccountingSetting/AccountingSetting";
import CompanyData from "./components/CompanyData/CompanyData";
import {
    initialValues,
    currencyList,
    sendValues,
    validationSchema,
} from "./const/values";
import { yupResolver } from "@hookform/resolvers/yup";
import { getSetting } from "../../../api/setting";
import { getMoney } from "../../../api/money";
import ButtonForm from "../../../components/ButtonForm/ButtonForm";
import { toast } from "../../../components/ToasterMessage/ToasterMessage";
import PageLoading from "../../../components/PageLoading/PageLoading";
import styles from "./style.module.css";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/authProvider";

const CompanySetting = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user } = state;

    const [values, setValues] = useState({});
    const [currencyOptions, setCurrencyOptions] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const query = async () => {
            setLoading(false);
            const data = await getSetting(user.token, dispatch, toast);
            const currency = await getMoney(user.token, dispatch, toast);
            setValues(initialValues(data));
            setCurrencyOptions(currencyList(currency));
            setLoading(true);
        };
        query();
    }, [user, dispatch]);

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: values,
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        reset(values);
    }, [values, reset]);

    const onSubmit = (data) => {
        const values = sendValues(data);
        console.log(values);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            {loading ? (
                <>
                    <div className={styles.body}>
                        <CompanyData
                            control={control}
                            setSelectValue={setValue}
                            errors={errors}
                        />
                        <i className={styles.separator} />
                        <AccountingSetting
                            control={control}
                            setSelectValue={setValue}
                            options={currencyOptions}
                            errors={errors}
                        />
                    </div>

                    <div className={styles.button}>
                        <ButtonForm title='Guardar' type='submit' />
                    </div>
                </>
            ) : (
                <PageLoading />
            )}
        </form>
    );
};

export default CompanySetting;
