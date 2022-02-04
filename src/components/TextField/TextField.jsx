import React from "react"
import styles from "./style.module.css"
import { useField, FastField } from "formik"

const TextField = ({ title, onChange, icon, ...props }) => {
    const [field, meta] = useField(props);
    console.log("text")
    return (
        <div className={styles.container}>
            <label className={styles.title}>
                {title}
            </label>
            <div className={styles.textField}>
                <span className={icon} />
                {/*<input {...field} {...props} />*/}
                <FastField onChange={onChange}{...field}{...props} />
            </div>
            {meta.touched && meta.error ? (
                <div className={styles.error}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default React.memo(TextField);
