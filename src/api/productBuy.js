import { url } from "../const/url";
import requestRejected from "../helpers/requestRejected";

/* ------ Request ------ */
const getProductBuyById = async (id, token, dispatch, toast) => {
	try {
		const request = await fetch(url + "product_buy/" + id, {
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

export { getProductBuyById };
