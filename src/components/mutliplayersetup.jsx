import React, { useState} from 'react';
import { useHistory } from "react-router"
import "../styles/styles.multiplayersetup.css"
import {socket} from './socket';
 
export default function Mutliplayersetup() {
    const history = useHistory();
    const [room, setRoom] = useState("");
    const [name, setname] = useState("");
    const [operation, setoperation] = useState("suma");
    const [roomExist, setRoomExist] = useState();
    const [limit, setLimit] = useState("2");
    const [complete, setComplete] = useState();
    const createRoom = async () => {
        if(room===""||name===""){
            return setComplete(false);
        }
        socket.emit('getroom', { id: room }, ({ res }) => {
            if(res===true){
                setRoomExist(true);
            }else{
                socket.emit('createroom', {room,name,operation,limit});
                history.push("/lobby",{access:true});
            }
        });
    }
    return (
        <div className="main-container-multiplayersetup">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-6">
                    <div className="container-game-setup w-100  shadow">
                        <div className="container w-75 p-3">
                            <h2 className="text-center">Elige tu configuracion</h2>
                            {roomExist === true ?
                                <div className="alert alert-warning" role="alert">
                                    Ya existe una sala con ese nombre 
                               </div>:
                               null
                            }
                             {complete===false? 
                                <div className="alert alert-warning" role="alert">
                                    debes llenar todos los campos
                               </div>:
                               null
                            }
                            <input type="text" className="input-setup w-100 text-center" placeholder="Elige el nombre de la sala" onChange={(event) => setRoom(event.target.value)} />
                            <input type="text" className="input-setup w-100 text-center" placeholder="Elige tu nombre de jugador" onChange={(event) => setname(event.target.value)} />
                            <label>Selecciona el tipo de operacion</label>
                            <select className="w-100 text-center input-setup" onChange={(event) => setoperation(event.target.value)}>
                                <option value="suma">suma</option>
                                <option value="resta">resta</option>
                                <option value="multi">multiplicacion</option>
                            </select>
                            <label>Duracion de la partida</label>
                            <select className="w-100 text-center input-setup" onChange={(event) => setLimit(event.target.value)}>
                                <option value="2">2 minutos</option>
                                <option value="5">5 minutos</option>
                                <option value="10">10 minutos</option>
                            </select>
                            <button type="button" className="botoncrearsala w-100 p-2 rounded mt-2" onClick={() => { createRoom() }}>Crear sala</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
