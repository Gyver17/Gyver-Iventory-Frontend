/* ------ Library Import ------ */
import React, { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

/* ------ Components Import ------ */
import DataTable from "../../../components/DataTable/DataTable";
import ToasterMessage, {toast} from "../../../components/ToasterMessage/ToasterMessage"
import PageLoading from "../../../components/PageLoading/PageLoading"
import FormUser from "./components/FormUser/FormUser";
import FormPassword from "./components/FormPassword/FormPassword"
import SessionExpired from "../../../components/SessionExpired/SessionExpired";

/* ------ Import to Component ------ */
import { getUsers } from "../../../api/users";
import styles from "./style.module.css";
import { AuthContext } from "../../../context/authProvider";
import { types } from "../../../context/authReducer";
import { column, searchData } from "./const/datatableProps";
import {requestDelete} from "./hooks/nestedRequest"

/* ------ Component ------ */
const UsersSetting = () => {
    // Global State
    const [state, dispatch] = useContext(AuthContext);
    const { user } = state

    // Component State
    const [userForm, setUserForm] = useState({ isOpen: false, title: "" });
    const [updateForm, setUpdateForm] = useState({isUpdate: false, row: undefined});
    const [formPassword, setFormPassword] = useState({isOpen: false, id: ""})

    // Props DataTable
    const { data, isSuccess, isError } = useQuery(["getUsers", user], async () => {
        const { queryData, success } = await getUsers(user.token);
        if (success) {
            const filterData = queryData.filter(data =>{
                if(data.mail === user.mail || data.mail === process.env.REACT_APP_EMAIL){
                    return false
                } else {
                    return true
                }
            })
            return filterData;
        } else {
            const { code } = queryData;
            if (code === "50115" || code === "43292" || code === "43178") {
                dispatch({
                    type: types.sessionClose,
                });
            }
            return [];
        }
    });

    const queryClient = useQueryClient()

    if(isError){
        return (<SessionExpired serverError={true} />)
    }

    const openForm = (isOpen, title, isUpdate, row) => {
            setUserForm({ isOpen, title });
            setUpdateForm({isUpdate, row});
        }

    const button = [
        {
            icon: "icon iconplus",
            render: true,
            onClick: () => openForm(true, "Crear Nuevo Usuario", false),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            render: true,
            onClick: (row) => openForm(true, "Modificar Usuario", true, row),
        },
        {
            icon: "icon iconlock-open3",
            render: true,
            onClick: (row) => setFormPassword({isOpen: true, id: row.id}),
        },
        {
            icon: "icon icontrash-can3",
            render: true,
            onClick: async (row) => await requestDelete(row.id, user.token, dispatch, toast, queryClient),
        },
    ];

    return (
        <>
            <ToasterMessage />
            <div className={styles.container}>
                {isSuccess ? (
                    <DataTable
                        title='Usuarios'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        aroundCurrentPage={5}
                        action={action}
                    />
                ) : <PageLoading />}
            </div>
            <FormUser
                userForm={userForm}
                setUserForm={setUserForm}
                update={updateForm}
                queryClient={queryClient}
            />
            <FormPassword 
                passwordForm={formPassword}
                setPasswordForm={setFormPassword}
                title="Modificar Contraseña"
                queryClient={queryClient}
            />
        </>
    );
};

export default React.memo(UsersSetting);
