import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useController } from "react-hook-form";
import NumberFormat from "react-number-format";

const NumberField = ({
	title,
	control,
	icon,
	name,
	quantityDecimal,
	settingFormat,
	...props
}) => {
	const { field } = useController({
		control,
		name,
	});

	const [separator, setSeparator] = useState({});

	useEffect(() => {
		const numberFormat = () => {
			if (settingFormat === "0.000,00") {
				setSeparator({
					thousands: ".",
					decimal: ",",
				});
			} else {
				setSeparator({
					thousands: ",",
					decimal: ".",
				});
			}
		};

		numberFormat();
	}, [settingFormat]);

	return (
		<div className={styles.container}>
			<label className={styles.title}>{title}</label>
			<NumberFormat
				className={styles.numberField}
				thousandSeparator={separator.thousands}
				decimalSeparator={separator.decimal}
				decimalScale={quantityDecimal}
				{...field}
				{...props}
			/>
		</div>
	);
};

export default NumberField;
