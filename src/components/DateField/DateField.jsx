import React from "react";
import styles from './style.module.css'
import DatePicker from "react-date-picker"
import "./Calendar.css"
import "./DatePicker.css"

function DateField({ startDate, setStartDate }) {
	return (
		<div className={styles.container} >
			<DatePicker onChange={setStartDate} value={startDate} />
		</div>
	);
}

export default DateField;
