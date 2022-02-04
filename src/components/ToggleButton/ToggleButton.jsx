import React from "react"
import styles from "./style.module.css"
import { useField, FastField } from "formik"

const ToggleButton = ({title, ...props}) => {
    const [field] = useField(props);
    return (
        <div className={styles.container}>
            <label className={styles.title}>
                {title}
            </label>
            <div class={styles.toggleButton}>
                <FastField {...field} {...props} />
                <span></span>
            </div>
        </div>
    )
};

export default React.memo(ToggleButton);
