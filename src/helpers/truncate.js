export default function truncate(number, decimal) {
	return Math.floor(number * 10 * decimal) / (10 * decimal);
}
