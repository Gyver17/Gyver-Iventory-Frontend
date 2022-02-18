import React from "react";
import styles from "./style.module.css"

const InputFile = ({img, files}) => {
	return (
		<div className={styles.upload}>
			<img src={img} alt='' />
			<div className={styles.round}>
				<input
					type='file'
					name={files}
					onChange={(e) => console.log(e.target.files)}
				/>
				<span className="icon icon iconplus" />
			</div>
		</div>
	);
};

export default InputFile;
