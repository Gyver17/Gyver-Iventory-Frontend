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
import FormServices from "./components/FormServices/FormServices";

/* ------ Import to Component ------ */
import styles from "./style.module.css";
import { getServices, deleteServices } from "../../../api/services";
import { column, searchData } from "./const/dataTableProps";
import { AuthContext } from "../../../context/authProvider";

/* ------ Component ------ */
const Services = () => {
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
		["getServices", user],
		async () => {
			return await getServices(user.token, dispatch, toast);
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
			render: permissions?.services_create,
			onClick: () => openForm(true, "Crear Nuevo Servicio", false),
		},
	];

	const action = [
		{
			icon: "icon icondocument-edit1",
			render: permissions?.services_update,
			onClick: (row) => openForm(true, "Modificar Servicio", true, row),
		},
		{
			icon: "icon icontrash-can3",
			render: permissions?.services_delete,
			onClick: async (row) =>
				await deleteServices(
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
						title='Servicios'
						numberOfEntries={[5, 10, 15, 20]}
						searchData={searchData}
						headerButtons={button}
						header={column}
						data={data}
						aroundCurrentPage={5}
						formatDecimal={setting.number_format}
						quantityDecimal={setting.qty_decimal}
						moneySymbol={setting.first_symbol}
						action={
							permissions?.services_update ||
							permissions?.services_delete
								? action
								: false
						}
					/>
				) : (
					<PageLoading />
				)}
			</div>
			<FormServices
				form={form}
				setForm={setForm}
				update={updateForm}
				queryClient={queryClient}
			/>
		</>
	);
};

export default Services;
