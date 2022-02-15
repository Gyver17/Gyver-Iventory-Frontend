import { types } from "../context/authReducer";

const requestRejected = (code, dispatch, toast) => {
	if (code === "50115" || code === "43292" || code === "43178") {
		dispatch({
			type: types.sessionClose,
		});
	}

	// This Situation Should Not Happen
	if (code === "43097") {
		toast.error("Valores Invalido");
	}
};

export default requestRejected;
