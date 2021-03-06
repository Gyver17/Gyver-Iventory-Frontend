import { getPermissionsByIdUser } from "../../../../../../api/permissions";
import requestRejected from "../../../../../../helpers/requestRejected"

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
			requestRejected(code, dispatch)
		}
		
	} else {
		setValues(initialValues);
	}

};

export default setInitialValues;
