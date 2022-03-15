import { url } from "../const/url";

const login = async (user) => {
    try {
        const request = await fetch(url + "log", {
            method: "POST",
            mode: "cors",
            credentials: "include",
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
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

const logout = async (token) => {
    try {
        const request = await fetch(url + "log", {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": token,
            },
        });
        const queryData = await request.json();
        return queryData
    } catch (error) {
        console.log(error);
    }
};

export { login, logout };
