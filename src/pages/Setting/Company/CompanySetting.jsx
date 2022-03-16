/* ------ Library Import ------ */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ------ Components Import ------ */
import AccountingSetting from "./components/AccountingSetting/AccountingSetting";
import CompanyData from "./components/CompanyData/CompanyData";
import ButtonForm from "../../../components/ButtonForm/ButtonForm";
import ToasterMessage, { toast } from "../../../components/ToasterMessage/ToasterMessage";
import PageLoading from "../../../components/PageLoading/PageLoading";

/* ------ Import to Component ------ */
import {
    initialValues,
    currencyList,
    sendValues,
    validationSchema,
} from "./const/values";
import { getSetting, updateSetting } from "../../../api/setting";
import { getMoney } from "../../../api/money";
import styles from "./style.module.css";
import { AuthContext } from "../../../context/authProvider";

/* ------ Component ------ */
const CompanySetting = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user, setting } = state

    const [values, setValues] = useState({});
    const [id, setId] = useState()
    const [currencyOptions, setCurrencyOptions] = useState({});
    const [loading, setLoading] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false)

    useEffect(() => {
        const query = async () => {
            setLoading(false);
            const data = await getSetting(user.token, dispatch, toast);
            setId(data.id)
            const currency = await getMoney(user.token, dispatch, toast);
            setValues(initialValues(data));
            setCurrencyOptions(currencyList(currency, setting));
            setLoading(true);
        };
        query();
    }, [user, dispatch, setting]);

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


    const onSubmit = async (data) => {
        const body = sendValues(data);
        setRequestLoading(true)
        const request = await updateSetting(id, user.token, body, dispatch, toast)
        if(request) {
            reset(initialValues(body))
        }
        setRequestLoading(false)
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
            {loading ? (
                <>
                    <ToasterMessage />
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
                        <ButtonForm title={requestLoading ? 'Guardando...' : 'Guardar'} type='submit' />
                    </div>
                </>
            ) : (
                <PageLoading />
            )}
        </form>
    );
};

export default CompanySetting;
