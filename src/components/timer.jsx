import React, { useState, useEffect } from 'react';
import { Modal} from 'react-bootstrap';
import {socket} from './socket';
import { useHistory } from "react-router"
export default function Timer(props) {
  const history = useHistory();
  const minutes = props.minutes;
  const setMinutes = props.setMinutes;
  const player = props.player;
  const [seconds, setSeconds] = useState(0);
  const [winner, setWinner] = useState({});
  ///modal hooks//
  const [show, setShow] = useState(false);
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setSeconds(seconds => seconds - 1);
    }, 1000);
    if (seconds === 0) {
      if ((minutes-1) === 0) {
        socket.emit('getgameresults', {},(finalusers)=>{
             if(finalusers==null){
               setWinner("error");
             }else{
              setWinner(finalusers[0]);
             }
             setShow(true);
        });
        return clearInterval(interval);
      }
      setMinutes((oldminutes) => {
        return oldminutes - 1;
      });
      setSeconds(59);
    }
    return () => { clearInterval(interval) }
  }, [seconds])
  const endgame=()=> {
    socket.emit('endgame', {},()=>{});
    history.push("/");
  }
  return (
    <div className="timer-container">
      <h2 className="text-center text-dark ">Tiempo restante :  {minutes-1} : {seconds} </h2>
      <Modal show={show}>
                <Modal.Body>
                    <h1 className="text-center">Tiempo terminado</h1>
                    { 
                      winner==="error"?
                      <h2 className="text-center">Error al cargar informacion</h2>:
                      winner.name===player.name?
                      <h2 className="text-center">Felicidades fuiste el ganador</h2>:
                      <h2 className="text-center">El ganador fue {winner.name} </h2>
                    }
                   
                    <div className="d-flex w-100 justify-content-center">
                      {
                         winner==="error"?
                         <button className="modal-button w-50 p-3" onClick={()=>{ history.push("/")}}>Aceptar</button>:
                         <button className="modal-button w-50 p-3" onClick={()=>{endgame()}}>Aceptar</button>
                      }
                    
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  )
}
