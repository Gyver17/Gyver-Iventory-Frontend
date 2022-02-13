import React from "react";
import styles from "./style.module.css";
import { useController } from "react-hook-form";

const TextField = ({ title, control, icon, name, ...props }) => {
    const { field } = useController({
        control,
        name,
    });

    return (
        <div className={styles.container}>
            <label className={styles.title}>{title}</label>
            <div className={styles.textField}>
                <span className={icon} />
                <input {...field} {...props} />
            </div>
        </div>
    );
};

export default TextField;
