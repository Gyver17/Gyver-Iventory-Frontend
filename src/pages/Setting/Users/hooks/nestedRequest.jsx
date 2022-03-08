/* ------ Import ------ */
import {
	createUser,
	updateUser,
	updatePassword,
	deleteUser,
} from "../../../../api/users";
import {
	createPermissions,
	updatePermissions,
	deletePermissions,
} from "../../../../api/permissions";
import requestRejected from "../../../../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
	if (code === "22121") {
		toast.error("El Correo Electrónico Ya Esta Registrado");
	}

	// This Situation Should Not Happen
	if (code === "43919") {
		toast.error("EL Usuario Ya Existe");
	}
	if (code === "48681") {
		toast.error("EL Usuario Ya Existe");
	}
};

/* ------ Request ------ */
const requestCreate = async (token, body, dispatch, toast, queryClient) => {
	const { user, permissions } = body;
	const reqUser = await createUser(token, user);

	if (reqUser.success) {
		const { id } = reqUser.queryData;
		permissions["id_user"] = id;
		const reqPermissions = await createPermissions(token, permissions);

		if (reqPermissions.success) {
			toast.success("Usuario Creado Exitosamente");
			queryClient.invalidateQueries("getUsers");
			return true
		} else {
			const { code } = reqPermissions.queryData;
			requestRejected(code, dispatch, toast);
			constraintViolated(code, toast);
			return false
		}
	} else {
		const { code } = reqUser.queryData;
		requestRejected(code, dispatch, toast);
		constraintViolated(code, toast);
		return false
	}
};

const requestUpdate = async (id, token, body, dispatch, toast, queryClient) => {
	const { user, permissions } = body;
	const reqUser = await updateUser(id, token, user);

	if (reqUser.success) {
		const reqPermissions = await updatePermissions(id, token, permissions);

		if (reqPermissions.success) {
			toast.success("Usuario Modificado Exitosamente");
			queryClient.invalidateQueries("getUsers");
			return true
		} else {
			const { code } = reqPermissions.queryData;
			requestRejected(code, dispatch, toast);
			constraintViolated(code, toast);
			return false
		}
	} else {
		const { code } = reqUser.queryData;
		requestRejected(code, dispatch, toast);
		constraintViolated(code, toast);
		return false
	}
};

const requestUpdatePassword = async (id, token, body, dispatch, toast, queryClient) => {
	const reqUser = await updatePassword(id, token, body);

	if (reqUser.success) {
		toast.success("Contraseña Modificada Exitosamente");
		queryClient.invalidateQueries("getUsers");
		return true
	} else {
		const { code } = reqUser.queryData;
		requestRejected(code, dispatch, toast);
		return false
	}
};

const requestDelete = async (id, token, dispatch, toast, queryClient) => {
	const reqPermissions = await deletePermissions(id, token);
	if (reqPermissions.success) {
		const reqUser = await deleteUser(id, token);
		if (reqUser.success) {
			toast.success("Usuario Eliminado Con Exito");
			queryClient.invalidateQueries("getUsers");
			return true
		} else {
			const { code } = reqUser.queryData;
			requestRejected(code, dispatch, toast);

			// This Situation Should Not Happen
			constraintViolated(code, toast);

			return false
		}
	} else {
		const { code } = reqPermissions.queryData;
		requestRejected(code, dispatch, toast);

		// This Situation Should Not Happen
		constraintViolated(code, toast);

		return false
	}
};

export { requestCreate, requestUpdate, requestUpdatePassword, requestDelete };
