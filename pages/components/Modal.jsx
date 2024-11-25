import React, {useEffect, useRef} from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from "./Modal.module.css";

const Modal = (props) => {

const modalRef = useRef();

useEffect(() => {
 if (modalRef.current) {
    modalRef.current.showModal();
 }
}, [])

function handleCancelButton () {
    modalRef.current.close();
    props.toggleChat();
}

function handleOpenButton (){
    const email = "jungtalent@gmail.com";
    window.location.href = `mailto:${email}`;
}

    return (
        <dialog ref={modalRef} className={styles.container}>
            <i className={`fa-regular fa-envelope ${styles.icon}`}></i>
            <h1 className={styles.h1} >Contact Us Via Email</h1>
            <p className={styles.p}>Any question? Send us an email at jungtalent@gmail.com</p>
            <p className={styles.p}>We usually answer within 24 hours.</p>
            <div className={styles.buttonContainer}>
                <button className={styles.buttonCancel} onClick = {handleCancelButton}>Cancel</button>
                <button className={styles.buttonOpen} onClick={handleOpenButton}>Open Email App</button>
            </div>
        </dialog>
    )
}

export default Modal;
