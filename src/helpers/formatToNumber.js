export default function formatToNumber(value, format, type) {
	if (type === "porcent") {
		if (!value.includes("%")) {
			return value;
		}
		return formatNumber(value.replace("%", ""), format);
	}

	if (type === "currency") {
		const number = value.split(" ");
		if (!number[1]) {
			return value;
		}
		return formatNumber(number[1], format);
	}

	if (type === "numeric") {
		return formatNumber(value, format);
	}
}

function formatNumber(value, format) {
	if (format === "0,000.00") {
		return parseFloat(value.replace(",", ""));
	} else {
		return parseFloat(value.replace(".", "").replace(",", "."));
	}
}
