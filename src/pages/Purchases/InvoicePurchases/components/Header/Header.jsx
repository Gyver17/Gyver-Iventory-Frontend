import React from "react";
import DateField from "../../../../../components/DateField/DateField";
import styles from "./style.module.css";

function Header({ numberInvoice, startDate, setStartDate }) {
	// const [startDate, setStartDate] = useState(new Date());
	return (
		<div className={styles.container}>
			<span className={styles.title}>Factura #{numberInvoice}</span>
			<DateField startDate={startDate} setStartDate={setStartDate} />
		</div>
	);
}

export default Header;
