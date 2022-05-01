export default function truncate(number, decimal) {
	return Math.floor(number * Math.pow(10, decimal)) / Math.pow(10, decimal);
}
