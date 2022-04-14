import React, { useState, useEffect } from "react";
import styles from "./style.module.css";
import { useController } from "react-hook-form";
import NumberFormat from "react-number-format";

const NumberInvoiceField = ({
	title,
	control,
	icon,
	name,
	quantityDecimal,
	settingFormat,
	width,
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
				onValueChange={(values) => {
					const { floatValue } = values;
					field.onChange(floatValue);
				}}
				onBlur={field.nBlur}
				value={field.value}
				name={field.name}
				inputRef={field.ref}
				{...props}
			/>
		</div>
	);
};

export default NumberInvoiceField;
