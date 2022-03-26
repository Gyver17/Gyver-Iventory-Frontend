import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
    if (code === "91610") {
        toast.error("El Codigo Del Cliente Ya Esta Registrado");
    }

    if (code === "11916") {
        toast.error(
            "El Documento De Identificación Del Cliente Ya Esta Registrado"
        );
    }
};

/* ------ Request ------ */
const getClient = async (token, dispatch, toast) => {
    try {
        const request = await fetch(url + "client", {
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

const createClient = async (token, body, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "client", {
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
            toast.success("Cliente Creado Exitosamente");
            queryClient.invalidateQueries("getClient");
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

const updateClient = async (
    id,
    token,
    body,
    dispatch,
    toast,
    queryClient
) => {
    try {
        const request = await fetch(url + "client/" + id, {
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
            toast.success("Cliente Actualizado Con Exito");
            queryClient.invalidateQueries("getClient");
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

const deleteClient = async (id, token, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "client/" + id, {
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
            toast.success("Cliente Eliminado Con Exito");
            queryClient.invalidateQueries("getClient");
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

export { getClient, createClient, updateClient, deleteClient };
