import { useState } from "react";

const useActionDataTable = (requestDelete, user, dispatch, toast) => {
	const [userForm, setUserForm] = useState({ isOpen: false, title: "" });
	const [updateForm, setUpdateForm] = useState({
		isUpdate: false,
		row: undefined,
	});
	const [formPassword, setFormPassword] = useState({ isOpen: false, id: "" });

	const openForm = (isOpen, title, isUpdate, row) => {
		setUserForm({ isOpen, title });
		setUpdateForm({ isUpdate, row });
	};

	const button = [
		{
			icon: "icon iconplus",
			onClick: () => openForm(true, "Crear Nuevo Usuario", false),
		},
	];

	const action = [
		{
			icon: "icon icondocument-edit1",
			onClick: (row) => openForm(true, "Modificar Usuario", true, row),
		},
		{
			icon: "icon iconlock-open3",
			onClick: (row) => setFormPassword({ isOpen: true, id: row.id }),
		},
		{
			icon: "icon icontrash-can3",
			onClick: (row) => requestDelete(user.id, user.token, dispatch, toast),
		},
	];


	return [
		userForm,
		setUserForm,
		updateForm,
		formPassword,
		setFormPassword,
		button,
		action,
	];
};

export default useActionDataTable;
