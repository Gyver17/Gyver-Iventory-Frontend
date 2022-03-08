import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
    if (code === "41585") {
        toast.error("El Nombre De La Moneda Ya Esta Registrado");
    }
};

/* ------ Request ------ */
const getMoney = async (token, dispatch, toast) => {
    try {
        const request = await fetch(url + "money", {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        });
        const queryData = await request.json();
        if (request.ok) {
            // return { queryData, success: true };
            return queryData;
        } else {
            // return { queryData, success: false };
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

const createMoney = async (token, body, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "money", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify(body),
        });
        const queryData = await request.json();
        if (request.ok) {
            // return { queryData, success: true };
            toast.success("Moneda Creada Exitosamente");
            queryClient.invalidateQueries("getMoney");
            return true;
        } else {
            // return { queryData, success: false };
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            constraintViolated(code, toast);
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const updateMoney = async (id, token, body, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "money/" + id, {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
            body: JSON.stringify(body),
        });
        const queryData = await request.json();
        if (request.ok) {
            // return { queryData, success: true };
            toast.success("Moneda Actualizada Con Exito");
            queryClient.invalidateQueries("getMoney");
            return true;
        } else {
            // return { queryData, success: false };
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            constraintViolated(code, toast);
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteMoney = async (id, token, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "money/" + id, {
            method: "DELETE",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        });
        const queryData = await request.json();
        if (request.ok) {
            // return { queryData, success: true };
            toast.success("Moneda Eliminada Con Exito");
            queryClient.invalidateQueries("getMoney");
            return true;
        } else {
            // return { queryData, success: false };
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            constraintViolated(code, toast);
        }
    } catch (error) {
        console.log(error);
    }
};

export { getMoney, createMoney, updateMoney, deleteMoney };
