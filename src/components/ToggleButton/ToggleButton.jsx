import React from "react"
import styles from "./style.module.css"
import { useController } from "react-hook-form";

const ToggleButton = ({title, control, name, ...props}) => {
    const { field } = useController({
        control,
        name,
    });
    return (
        <div className={styles.container}>
            <label className={styles.title}>
                {title}
            </label>
            <div class={styles.toggleButton}>
                <input checked={field.value} type='checkbox' {...field} {...props} />
                <span></span>
            </div>
        </div>
    )
};

export default ToggleButton;
