/* ------ Library Import ------ */
import React, { useContext, useEffect, useState } from "react";

import AccountingSetting from "./components/AccountingSetting/AccountingSetting";
import CompanyData from "./components/CompanyData/CompanyData";
import { requestGet } from "./hooks/request";
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

    const [initialValues, setInitialValue] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const query = async () => {
            setLoading(false);
            const data = await requestGet(user.token, dispatch, toast);
            setInitialValue(data);
            setLoading(true);
        };
        query();
    }, [user, dispatch]);
    console.log(initialValues);
    const {
        control,
        // handleSubmit,
        // reset,
        setValue,
        // formState: { errors },
    } = useForm({
        // defaultValues: values,
        // resolver: yupResolver(validationSchema),
    });
    return (
        <div className={styles.container}>
            {loading ? (
                <>
                    <div className={styles.body}>
                        <CompanyData control={control} />
                        <i className={styles.separator} />
                        <AccountingSetting
                            control={control}
                            setSelectValue={setValue}
                        />
                    </div>

                    <div className={styles.button}>
                        <ButtonForm title='Guardar' />
                    </div>
                </>
            ) : (
                <PageLoading />
            )}
        </div>
    );
};

export default CompanySetting;
