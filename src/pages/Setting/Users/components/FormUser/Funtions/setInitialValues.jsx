import { getPermissionsByIdUser } from "../../../../../../api/permissions";

const setInitialValues = async (isUpdate, row, token, setValues, dispatch, types, initialValues) => {

	if (isUpdate) {

		const { queryData, success } = await getPermissionsByIdUser(
			row.id,
			token
		);

		if (success) {
			delete queryData.id_user;
			delete queryData.id;
			row["isPassword"] = false;
			const updateValues = { user: row, permissions: queryData };
			setValues(updateValues);
		} else {
			const { code } = queryData;
			if (code === "50115" || code === "43292" || code === "43178") {
				dispatch({
					type: types.sessionClose,
				});
			}
		}
		
	} else {
		setValues(initialValues);
	}

};

export default setInitialValues;
