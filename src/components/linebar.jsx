import React, { useState, useEffect } from 'react';
import { Modal} from 'react-bootstrap';
import { useHistory } from "react-router"
export default function LineBar(props) {
    const history = useHistory();
    const [progress, setProgress] = useState(100);
    const [speed, setspeed] = useState(1000);
    ///modal hooks//
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        if (props.error === false) {
            setProgress(100);
            setspeed((oldSpeed) => {
                return oldSpeed - 50;
            })
        }
    }, [props.error]);
    useEffect(() => {
        const start =
            setInterval(function () {
                setProgress((oldProgress) => {
                    if (oldProgress === 0) {
                        handleShow();
                    }
                    return oldProgress - 20;
                });
            }, speed);
        return () => clearInterval(start);
    }, [speed]);
    return (
        <div className="div">
            <div className="bg-white rounded" style={{ width: `${progress}%`, height: "10px", }} ></div>      
            <Modal show={show}>
                <Modal.Body>
                    <h1 className="text-center">Tiempo terminado</h1>
                    <h2 className="text-center">Puntaje obtendio: {props.hits} </h2>
                    <div className="d-flex w-100 justify-content-center">
                    <button className="modal-button w-50 p-3" onClick={()=>{history.push("/")}}>Aceptar</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}