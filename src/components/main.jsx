import React, { useState} from 'react';
import '../styles/styles.main.css'
import calculadora from '../imgs/calculadora.png'
import { Link } from "react-router-dom";
import { Modal} from 'react-bootstrap';
export default function Main() {
    const [howto, setHowTo] = useState();
    return (
        <div className="main-container m-0">
            <div className="row h-100  justify-content-center align-items-center">
                <div className=" col-lg-6 col-md-9">
                    <div className="main-card rounded shadow animate__animated animate__bounce">
                        <div className="card-body h-100">
                            <h1 className="card-title text-center">Sopa numerica</h1>
                            <div className="d-flex justify-content-center mb-4 h-25 ">
                                <img  src={calculadora} alt="" />
                            </div>
                            <div className="seccion mb-3">
                                <h1 className="titleSeccion">Solo</h1>
                                <div className="container-options">
                                <div className="d-flex justify-content-center mb-2">
                                <Link className="tipo text-center w-75" to="/play/suma">Suma</Link>
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <Link className="tipo text-center w-75" to="/play/resta">Resta</Link>
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <Link className="tipo text-center w-75" to="/play/multi">Multiplicacion</Link>
                            </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mb-2">
                                <Link className="tipo text-center w-100" to="/multiplayersetup">Crear sala multijugador</Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Link className="tipo text-center w-100" to="/preroom">Entrar sala multijugador</Link>
                            </div>
                        </div>
                    </div>
                     <div className="div d-flex justify-content-center mt-2">
                         <button className="comojugar text-center w-50" onClick={()=>{setHowTo(true)}}>¿Como jugar?</button>
                     </div>
                    <p className="text-center mt-5">Creado por pabload</p>
                </div>
            </div>
            <Modal show={howto}>
                <Modal.Body>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center">Solo</h1>
                            <p className="text-center">Selecciona los números correctos para obtener el puntaje deseado entre mas aciertes mas rápido avanzara la barra</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-center">Multijugador</h1>
                            <p className="text-center">Crea una sala y asigna el tiempo y tipo de operación , posteriormente invita a tus amigos e inicia el juego,
                                el ganador del juego es aquel que obtenga la mayor cantidad de puntos en el tiempo establecido  
                            </p>
                        </div>
                    </div>
                   <div className="d-flex justify-content-center">
                   <button className="aceptar text-center w-50" onClick={()=>{setHowTo(false)}}>Aceptar</button>
                   </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
