import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
    if (code === "12275") {
        toast.error("El Empleado No Esta Registrado");
    }
    if (code === "49171") {
        toast.error("El Proveedor No Esta Registrado");
    }
    if (code === "63250") {
        toast.error("El Producto No Esta Registrado");
    }
};

/* ------ Request ------ */
const getPayHistory = async (id, token, dispatch, toast) => {
    try {
        const request = await fetch(url + "pay_purchases_history/" + id, {
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
            return queryData;
        } else {
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

const createPayPurchases = async (token, body, dispatch, toast) => {
    try {
        const request = await fetch(url + "pay_purchases_history", {
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
            toast.success("Pago Registrado Exitosamente");
            return true;
        } else {
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            constraintViolated(code, toast);
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

export { getPayHistory, createPayPurchases };
