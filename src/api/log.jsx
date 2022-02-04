import { url } from "../const/url";

const login = async (user) => {
    try {
        const request = await fetch(url + "log", {
            method: "POST",
            mode: "cors",
            credentials: "include",
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

export { login };
