import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
    if (code === "30385") {
        toast.error("El Nombre De La Categoria Ya Esta Registrado");
    }

    if (code === "80857") {
        toast.error(
            "La Categoria No Se Puede ELiminar, Debido a Que Tienes Productos Registrado"
        );
    }
};

/* ------ Request ------ */
const getCategory = async (token, dispatch, toast) => {
    try {
        const request = await fetch(url + "category", {
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

const createCategory = async (token, body, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "category", {
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
            toast.success("Categoria Creada Exitosamente");
            queryClient.invalidateQueries("getCategory");
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

const updateCategory = async (
    id,
    token,
    body,
    dispatch,
    toast,
    queryClient
) => {
    try {
        const request = await fetch(url + "category/" + id, {
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
            toast.success("Categoria Actualizada Con Exito");
            queryClient.invalidateQueries("getCategory");
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

const deleteCategory = async (id, token, dispatch, toast, queryClient) => {
    try {
        const request = await fetch(url + "category/" + id, {
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
            toast.success("Categoria Eliminada Con Exito");
            queryClient.invalidateQueries("getCategory");
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

export { getCategory, createCategory, updateCategory, deleteCategory };
