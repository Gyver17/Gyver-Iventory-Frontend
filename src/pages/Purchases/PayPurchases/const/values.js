import formatDate from "../../../../helpers/formatDate"
import truncate from "../../../../helpers/truncate"

export default function sendValues(data, date, invoice, productsReturn) {
	const products = productsReturn.map((product) => {
		return {
			id_product: product.id_product,
			id_invoice: product.id_invoice,
			quantity: product.quantity,
			price_total: product.price_total,
		};
	});
	const values = {
		number: invoice.number,
		id_supplier: invoice.id_supplier,
		id_employee: invoice.id_employee,
		products: products,
		price_sub: truncate(data.subTotal, 2),
		price_iva: truncate(data.iva, 2),
		price_total: truncate(data.total, 2),
		date: formatDate(date),
	};
	return values;
}
