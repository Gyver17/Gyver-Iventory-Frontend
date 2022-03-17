import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Helpers ------ */
const constraintViolated = (code, toast) => {
    if (code === "43455") {
        toast.error("Inserte una divisa registrada");
    }
};

/* ------ Request ------ */
const getSetting = async (token, dispatch, toast) => {
    try {
        const request = await fetch(url + "setting", {
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

const updateSetting = async (id, token, body, dispatch, toast) => {
    try {
        const request = await fetch(url + "setting/" + id, {
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
            toast.success(
                "Configuraciones actualizada con exito, vuelva a iniciar session para que sean aplicadas"
            );
            return true;
        } else {
            const { code, details } = queryData;
            console.log(code, details);
            requestRejected(code, dispatch, toast);
            constraintViolated(code, toast);
            return false;
        }
    } catch (error) {
        console.log(error);
    }
};

export { getSetting, updateSetting };
