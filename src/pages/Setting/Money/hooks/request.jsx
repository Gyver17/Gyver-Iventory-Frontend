import {getMoney, createMoney, updateMoney, deleteMoney} from "../../../../api/money"
import requestRejected from "../../../../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
	if (code === "41585") {
		toast.error("El Nombre De La Moneda Ya Esta Registrado");
	}
};

/* ------ Request ------ */
const requestGet = async (token, dispatch, toast) => {
	const {queryData, success} = await getMoney(token);
	if (success) {
            return queryData;
        } else {
            const { code } = queryData;
            requestRejected(code, dispatch, toast)
            return [];
        }
};

const requestCreate = async (token, body, dispatch, toast, queryClient) => {
	const {queryData, success} = await createMoney(token, body)
	if(success){
		toast.success("Moneda Creada Exitosamente")
		queryClient.invalidateQueries("getMoney");
		return true
	} else {
		const { code } = queryData;
		requestRejected(code, dispatch, toast);
		constraintViolated(code, toast);
		return false
	}
}

const requestUpdate = async (id, token, body, dispatch, toast, queryClient) =>{
	const {queryData, success} = await updateMoney(id, token, body)
	if(success){
		toast.success("Moneda Actualizada Con Exito")
		queryClient.invalidateQueries("getMoney")
		return true
	} else {
		const {code} = queryData
		requestRejected(code, dispatch, toast)
		constraintViolated(code, toast)
		return false
	}
}

const requestDelete = async (id, token, dispatch, toast, queryClient) =>{
	const {queryData, success} = await deleteMoney(id, token)
	if(success) {
		toast.success("Moneda Eliminada Con Exito")
		queryClient.invalidateQueries("getMoney")
		return true
	} else {
		const {code} = queryData
		requestRejected(code, dispatch, toast)
		constraintViolated(code, toast)
	}
}

export {requestGet, requestCreate, requestUpdate, requestDelete}