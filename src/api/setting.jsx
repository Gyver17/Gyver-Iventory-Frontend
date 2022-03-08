import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

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
            // return { queryData, success: true };
            return queryData;
        } else {
            // return { queryData, success: false };
            const { code } = queryData;
            requestRejected(code, dispatch, toast);
            return [];
        }
    } catch (error) {
        console.log(error);
    }
};

export { getSetting };
