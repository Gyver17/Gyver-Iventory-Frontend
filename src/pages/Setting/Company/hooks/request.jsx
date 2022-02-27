import { getSetting } from "../../../../api/setting"
import requestRejected from "../../../../helpers/requestRejected";

/* ------ Helpers ------ */
/*const constraintViolated = (code, toast) => {
	if (code === "41585") {
		toast.error("El Nombre De La Moneda Ya Esta Registrado");
	}
};*/

/* ------ Request ------ */
const requestGet = async (token, dispatch, toast) => {
	const {queryData, success} = await getSetting(token);
	if (success) {
            return queryData;
        } else {
            const { code } = queryData;
            requestRejected(code, dispatch, toast)
            return [];
        }
};

export { requestGet }