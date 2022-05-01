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
const getInvoiceReturnPurchases = async (date, token, dispatch, toast) => {
    try {
        const request = await fetch(url + "invoice_buy/date/" + date, {
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

const getInvoicePayPurchases = async (date, token, dispatch, toast) => {
    try {
        const request = await fetch(url + "invoice_buy/pay/" + date, {
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

const createInvoicePurchases = async (
    token,
    body,
    dispatch,
    toast,
    queryClient
) => {
    try {
        const request = await fetch(url + "invoice_buy/buy", {
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
            toast.success("Compra Registrada Exitosamente");
            queryClient.invalidateQueries("getInvoicePurchases");
            queryClient.invalidateQueries("getProductsInvoice");
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

const createInvoiceReturnPurchases = async (
    token,
    body,
    dispatch,
    toast,
    queryClient
) => {
    try {
        const request = await fetch(url + "invoice_buy/return", {
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
            toast.success("Productos Devueltos Exitosamente");
            queryClient.invalidateQueries("getReturnPurchases");
            queryClient.invalidateQueries("getProductBuyByIdInvoice");
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

export {
    getInvoiceReturnPurchases,
    getInvoicePayPurchases,
    createInvoicePurchases,
    createInvoiceReturnPurchases,
};
