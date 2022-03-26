import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
    if (code === "72533") {
        toast.error("El Codigo Del Proveedor Ya Esta Registrado");
    }

    if (code === "17259") {
        toast.error(
            "El Documento De Identificación Del Proveedor Ya Esta Registrado"
        );
    }
};

/* ------ Request ------ */
const getSupplier = async (token, dispatch, toast) => {
    try {
        const request = await fetch(url + "supplier", {
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

const createSupplier = async (token, body, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "supplier", {
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
            toast.success("Proveedor Creado Exitosamente");
            queryClient.invalidateQueries("getSupplier");
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

const updateSupplier = async (
    id,
    token,
    body,
    dispatch,
    toast,
    queryClient
) => {
    try {
        const request = await fetch(url + "supplier/" + id, {
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
            toast.success("Proveedor Actualizado Con Exito");
            queryClient.invalidateQueries("getSupplier");
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

const deleteSupplier = async (id, token, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "supplier/" + id, {
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
            toast.success("Proveedor Eliminado Con Exito");
            queryClient.invalidateQueries("getSupplier");
            return true;
        } else {
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            constraintViolated(code, toast);
        }
    } catch (error) {
        console.log(error);
    }
};

export { getSupplier, createSupplier, updateSupplier, deleteSupplier };
