import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import DataTable from "../../../components/DataTable/DataTable";
import { getUsers } from "../../../api/users";
import { AuthContext } from "../../../context/authProvider";
import styles from "./style.module.css";
import { types } from "../../../context/authReducer";
import FormUser from "./components/FormUser/FormUser";
import { column, searchData } from "./const/datatableProps";

const UsersSetting = () => {
    const [state, dispatch] = useContext(AuthContext);
    const { user } = state;

    const [userForm, setUserForm] = useState({ isOpen: false, title: "" });
    const [updateForm, setUpdateForm] = useState(false);

    const { data, isSuccess } = useQuery(["getUsers", user.token], async () => {
        const { queryData, success } = await getUsers(user.token);
        if (success) {
            return queryData;
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

    const openForm = (isOpen, title, update) => {
            setUserForm({ isOpen, title });
            setUpdateForm(update);
        }

    const button = [
        {
            icon: "icon iconplus",
            onClick: () => openForm(true, "Crear Nuevo Usuario", true),
        },
    ];

    const action = [
        {
            icon: "icon icondocument-edit1",
            onClick: (row) => console.log(row),
        },
        {
            icon: "icon icontrash-can3",
            onClick: (row) => console.log(row),
        },
    ];

    return (
        <>
            <div className={styles.container}>
                {isSuccess && (
                    <DataTable
                        title='Usuarios'
                        numberOfEntries={[5, 10, 15, 20]}
                        searchData={searchData}
                        headerButtons={button}
                        header={column}
                        data={data}
                        formatDecimal='0,000.00'
                        moneySymbol='$'
                        aroundCurrentPage={5}
                        action={action}
                    />
                )}
            </div>
            <FormUser
                userForm={userForm}
                setUserForm={setUserForm}
                update={updateForm}
            />
        </>
    );
};

export default React.memo(UsersSetting);
