export default function formatNumber(number, formatDecimal, quantityDecimal) {
	const config = {
		minimumFractionDigits: quantityDecimal,
	};
	if (formatDecimal) {
		if (formatDecimal === "0,000.00") {
			return Intl.NumberFormat("en-US", config).format(number);
		}
		if (formatDecimal === "0.000,00") {
			return Intl.NumberFormat("de-DE", config).format(number);
		} else {
			return Intl.NumberFormat(formatDecimal, config).format(number);
		}
	} else {
		return Intl.NumberFormat([], config).format(number);
	}
}
