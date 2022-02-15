import { getPermissionsByIdUser } from "../../../../../../api/permissions";
import requestRejected from "../../../../../../helpers/requestRejected"

const setInitialValues = async (isUpdate, row, token, setValues, dispatch, types, initialValues) => {

	if (isUpdate) {
			const updateValues = { user: row, permissions: queryData };
			setValues(updateValues);
	} else {
		setValues(initialValues);
	}

};

export default setInitialValues;
