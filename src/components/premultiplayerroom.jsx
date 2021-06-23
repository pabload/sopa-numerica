import React, { useState} from 'react';
import { useHistory } from "react-router"
import "../styles/style.premultiplayerroom.css"
import {socket} from './socket';
export default function Premultiplayerroom() {
    const history = useHistory();
    const [room, setRoom] = useState();
    const [name, setname] = useState();
    const [roomExist, setRoomExist] = useState();
    const [playerExist, setplayerExist] = useState();
    const [gameStart, setgameStart] = useState();
    const joinRoom= async ()=>{
        setRoomExist();
        setplayerExist();
        setgameStart();
        socket.emit('getroom', { id: room }, ({ res }) => { 
            if(res===true){
                socket.emit('adduser', {room,name},(res)=>{
                  if(res==="usarname is taken"){
                       setplayerExist(true);
                  }else{
                      socket.emit('getmatch',{},(match)=>{
                          if(match.start!==true){
                            history.push("/lobby",{access:true});
                          }else{
                              setgameStart(true);
                          }
                      })
                  }
                });
                
            }else{
                setRoomExist(false);
            }
        });
    }
    return (
        <div className="main-container-premultiplayerroom">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-lg-6">
                    <div className="container-game-setup w-100  shadow">
                        <div className="container w-75 p-3">
                            <h2 className="text-center">Entrar a una sala</h2>
                            {roomExist === false ?
                                <div className="alert alert-warning" role="alert">
                                    No existe esa sala 
                               </div>:
                               null
                            }
                             {playerExist === true ?
                                <div className="alert alert-warning" role="alert">
                                   un usuario ya existe con ese nombre dentro de la sala
                               </div>:
                               null
                            }
                             {gameStart === true ?
                                <div className="alert alert-warning" role="alert">
                                  El juego ya comenzo
                               </div>:
                               null
                            }
                            <input type="text" className="input-setup w-100 text-center" placeholder="coloca el nombre de la sala" onChange={(event) => setRoom(event.target.value)} />
                            <input type="text" className="input-setup w-100 text-center" placeholder="Elige tu nombre de jugador"  onChange={(event) => setname(event.target.value)}/>
                            <button type="button" className="botoncrearsala w-100 p-2 rounded mt-2" onClick={()=>{joinRoom()}}>Unirse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
