import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Request ------ */
const getNumbersInvoice = async (token, dispatch, toast) => {
	try {
		const request = await fetch(url + "numbers_invoice", {
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

export { getNumbersInvoice };
