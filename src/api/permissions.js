import { url } from "../const/url";

const getPermissionsByIdUser = async (id, token) => {
    try {
        const request = await fetch(url + "permissions/"+id, {
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
            return { queryData, success: true };
        } else {
            return { queryData, success: false };
        }
    } catch (error) {
        console.log(error);
    }
};

const createPermissions = async (token, body) => {
    try {
        const request = await fetch(url + "permissions", {
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
            return { queryData, success: true };
        } else {
            return { queryData, success: false };
        }
    } catch (error) {
        console.log(error);
    }
};

const updatePermissions = async (id, token, body) => {
    try {
        const request = await fetch(url + "permissions/"+id, {
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
            return { queryData, success: true };
        } else {
            return { queryData, success: false };
        }
    } catch (error) {
        console.log(error);
    }
};

const deletePermissions = async (id, token) => {
    try {
        const request = await fetch(url + "permissions/"+id, {
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
            return { queryData, success: true };
        } else {
            return { queryData, success: false };
        }
    } catch (error) {
        console.log(error);
    }
};

export { getPermissionsByIdUser, createPermissions, updatePermissions, deletePermissions };