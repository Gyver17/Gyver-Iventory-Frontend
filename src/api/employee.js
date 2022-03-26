import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
    if (code === "42149") {
        toast.error("El Codigo Del Empleado Ya Esta Registrado");
    }

    if (code === "31535") {
        toast.error(
            "El Documento De Identificación Del Empleado Ya Esta Registrado"
        );
    }
};

/* ------ Request ------ */
const getEmployee = async (token, dispatch, toast) => {
    try {
        const request = await fetch(url + "employee", {
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

const createEmployee = async (token, body, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "employee", {
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
            toast.success("Empleado Creado Exitosamente");
            queryClient.invalidateQueries("getEmployee");
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

const updateEmployee = async (
    id,
    token,
    body,
    dispatch,
    toast,
    queryClient
) => {
    try {
        const request = await fetch(url + "employee/" + id, {
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
            toast.success("Empleado Actualizado Con Exito");
            queryClient.invalidateQueries("getEmployee");
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

const deleteEmployee = async (id, token, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "employee/" + id, {
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
            toast.success("Empleado Eliminado Con Exito");
            queryClient.invalidateQueries("getEmployee");
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

export { getEmployee, createEmployee, updateEmployee, deleteEmployee };
