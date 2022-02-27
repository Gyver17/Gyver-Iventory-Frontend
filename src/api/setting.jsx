import { url } from "../const/url";

const getSetting = async (token) => {
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
            return { queryData, success: true };
        } else {
            return { queryData, success: false };
        }
    } catch (error) {
        console.log(error);
    }
};

const updatePhoto = async (token, body) => {
	try {
		const request = await fetch(url + "setting/photo", {
			method: "PUT",
			mode: "cors",
			credentials: "include",
			headers: {
                "x-access-token": token,
            },
            body: body,
		})
	} catch (error) {
		console.log(error)
	}
}

export { getSetting, updatePhoto }