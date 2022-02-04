import React from 'react';
import { Form, Formik } from 'formik'
import Modal from "../../../../../components/Modal/Modal"
import InputUser from './InputUser/InputUser';
import InputPermissions from './InputPermissions/InputPermissions';
import { initialValues } from "./values"
import styles from "./style.module.css"

const FormUser = ({ userForm, setUserForm, update }) => {
    return (
        <>
            <Modal
                isOpen={userForm.isOpen}
                setOpen={setUserForm}
                title={userForm.title}
            >
                <div className={styles.container}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                actions.setSubmitting(false);
                            }, 200);
                        }}
                    >
                        {(props) => (
                            <Form className={styles.form}>
                                <div className={styles.inputs}>
                                    <InputUser
                                        update={update}
                                        handleChange={props.handleChange}
                                    />
                                    <div className={styles.separator}></div>
                                    {/*<InputPermissions />*/}
                                </div>
                                <div className={styles.buttons}>    
                                <button type="submit">{!update ? 'Modificar Usuario' : 'Crear Usuario'}</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Modal>
        </>
    )
};

export default React.memo(FormUser);
