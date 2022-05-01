import React from "react";
import DateField from "../../../../../components/DateField/DateField";
import styles from "./style.module.css";

function Header({ title, startDate, setStartDate, render, onClick }) {
	return (
		<div className={styles.container}>
			<div>
				{render && (
					<button
						className={styles.button}
						onClick={onClick}
					>
						<i className='iconarrow-left' />
					</button>
				)}
				<span className={styles.title}>{title}</span>
			</div>
			<DateField startDate={startDate} setStartDate={setStartDate} />
		</div>
	);
}

export default Header;
