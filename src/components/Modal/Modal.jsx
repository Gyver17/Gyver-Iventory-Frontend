import React from 'react';
import styles from "./style.module.css"

const Modal = ({ isOpen, setOpen, title, children }) => {
    return (
        <>
            {isOpen &&
                <div className={styles.overlay}>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>{title}</h3>
                            <button
                                className="icon iconcancel"
                                id={styles.button}
                                onClick={() => setOpen({ isOpen: false, title: "" })}
                            />
                        </div>
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;
