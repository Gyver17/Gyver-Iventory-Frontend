const renderValues = (permissions) => {
	let inventory = false;
	let persons = false;
	let purchases = false;
	let sales = false;
	let consult = false;

	if (
		permissions?.category === true ||
		permissions?.products === true ||
		permissions?.services === true
	) {
		inventory = true;
	}

	if (
		permissions?.client === true ||
		permissions?.supplier === true ||
		permissions?.employee === true
	) {
		persons = true;
	}

	if (
		permissions?.buy === true ||
		permissions?.buy_pay === true ||
		permissions?.buy_return === true
	) {
		purchases = true;
	}

	if (
		permissions?.sell === true ||
		permissions?.sell_pay === true ||
		permissions?.sell_return === true
	) {
		sales = true;
	}

	if (
		permissions?.consult_client === true ||
		permissions?.consult_invoice === true ||
		permissions?.consult_product === true ||
		permissions?.consult_movement === true ||
		permissions?.consult_supplier === true
	) {
		consult = true;
	}
	return { inventory, persons, purchases, sales, consult };
};

export { renderValues };
