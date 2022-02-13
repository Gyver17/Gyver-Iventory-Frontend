/* ------ Library Import ------ */
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

/* ------ Components Import ------ */
import Modal from "../../../../../components/Modal/Modal";
import ButtonForm from "../../../../../components/ButtonForm/ButtonForm"
import ToasterMessage, {toast} from "../../../../../components/ToasterMessage/ToasterMessage"
import InputUser from "./InputUser/InputUser";
import InputPermissions from "./InputPermissions/InputPermissions";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { initialValues, validationSchema as schema } from "./values";
import setInitialValues from "./Funtions/setInitialValues";
import {
    requestCreate,
    requestUpdate,
} from "../../hooks/request";
import { AuthContext } from "../../../../../context/authProvider";
import { types } from "../../../../../context/authReducer";

/* ------ Component ------ */
const FormUser = ({ userForm, setUserForm, update, queryClient }) => {
    // Props Parent
    const { isUpdate, row } = update;

    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user } = state;
    const token = user.token;

    // Component States
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setInitialValues(
            isUpdate,
            row,
            token,
            setValues,
            dispatch,
            types,
            initialValues
        );
    }, [isUpdate, row, token, dispatch]);

    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: values,
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        reset(values);
    }, [values, reset]);

    const onSubmit = async (data) => {
        delete data.user.isPassword;
        if (isUpdate) {
            const id = row.id;
            data.permissions["id_user"] = id;
            delete data.user.id;
            const success = await requestUpdate(id, token, data, dispatch, toast, queryClient);
            if(success){
                setUserForm(false);
            }
        } else {
            delete data.user.repeatPassword;
            const success = await requestCreate(token, data, dispatch, toast, queryClient);
            if(success){
                reset(values);
            }
        }
    };

    return (
        <>
            <ToasterMessage />
            <Modal
                isOpen={userForm.isOpen}
                setOpen={setUserForm}
                title={userForm.title}
            >
                <div className={styles.container}>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className={styles.inputs}>
                            <InputUser
                                update={isUpdate}
                                control={control}
                                setSelectValue={setValue}
                                errors={errors}
                            />
                            <div className={styles.separator}></div>
                            <InputPermissions control={control} />
                        </div>
                        <div className={styles.buttons}>
                            <ButtonForm title="Limpiar" onClick={()=>reset(initialValues)} type="reset"/>
                            <ButtonForm type='submit'
                                title={isUpdate
                                    ? "Modificar Usuario"
                                    : "Crear Usuario"}
                            />
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default React.memo(FormUser);
