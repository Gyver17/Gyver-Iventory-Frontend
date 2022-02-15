import { url } from "../const/url";

const getMoney = async (token) => {
    try {
        const request = await fetch(url + "money", {
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

const createMoney = async (token, body) => {
    try {
        const request = await fetch(url + "money", {
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

const updateMoney = async (id, token, body) => {
    try {
        const request = await fetch(url + "money/"+id, {
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

const deleteMoney = async (id, token) => {
    try {
        const request = await fetch(url + "money/"+id, {
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

export { getMoney, createMoney, updateMoney, deleteMoney };