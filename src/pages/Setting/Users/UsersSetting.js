import React, { useEffect, useState } from "react";
import DataTable from "../../../components/DataTable/DataTable"
import styles from "./style.module.css"

const UsersSetting = () => {
    const [reqData, setReqData] = useState([])

    const column = [
        {
            title: "Id",
            field: "id",
            type: "numeric",
        },
        {
            title: "Publicacion",
            field: "postId",
            type: "money"
        },
        {
            title: "Nombre",
            field: "name",
            type: "string",
            sortable: true
        },
        {
            title: "Correo Electronico",
            field: "email",
            type: "string",
            sortable: true
        },
        {
            title: "Cuerpo",
            field: "body",
            type: "string",
            sortable: true,
            search: true
        }
    ]

    const button = [
        {
            icon: 'icon iconplus',
            onClick: () => console.log('Hola')
        }
    ]

    const searchData = (data, value) => {
        let expresion = new RegExp(`${value}.*`, "i")
        return data.filter(
            data => expresion.test(data.name) || expresion.test(data.email) || expresion.test(data.body))
    }

    useEffect(() => {
        const getData = async () => {

            const data = await fetch("https://jsonplaceholder.typicode.com/comments")
            const req = await data.json()
            setReqData(req)
        };

        getData();
    }, []);

    return (
        <div className={styles.container}>
            <DataTable
                title="DataTable"
                numberOfEntries={[5, 10, 15, 20]}
                searchData={searchData}
                headerButtons={button}
                header={column}
                data={reqData}
                formatDecimal="0,000.00"
                moneySymbol="$"
                aroundCurrentPage={5}
                action={[
                    {
                        icon: 'icon icondocument-edit1',
                        onClick: (row) => console.log(row)
                    },
                    {
                        icon: 'icon icontrash-can3',
                        onClick: (row) => console.log(row)
                    }
                ]}
            />
        </div>
    )
}

export default UsersSetting
