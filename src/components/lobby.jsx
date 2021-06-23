import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import { Modal } from 'react-bootstrap';
import { useHistory } from "react-router"
import { useLocation } from "react-router-dom";
import "../styles/style.lobby.css"
export default function Lobby() {
    const history = useHistory();
    const location = useLocation();
    let access = location.state;
    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState({});
    const [match, setMatch] = useState([]);
    const [adminleft, setAdminLeft] = useState();
    useEffect(() => {
        window.onpopstate = e => {
            socket.emit('removeuser', {});
        }
        if (access == null) {
            return history.push("/");
        }
        socket.emit('getuser', {}, (user) => {
            setPlayer(user);
        });
        socket.emit('getusersroom', {}, (users) => {
            setPlayers(users);
        });
        socket.on('getusers', ({ users, adminleft }) => {
            setPlayers(users);
            setAdminLeft(adminleft);
        })
        socket.on('gotogame', ({ }) => {
            history.push("/playmulti", { access: true })
        })
        socket.emit('getmatch', {}, (match) => {
            setMatch(match);
        });
        return () => {
           
        }
    }, []);
    const startgame = () => {
        socket.emit('startgame', {}, () => { });
        history.push("/playmulti", { access: true })
    }
    const removeUser = () => {
        socket.emit('removeuser', {});
        history.push("/");
    }
    return (
        <div className="main-container-lobby">
            <div className="container">
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-lg-8">
                        {
                            player == null || players == null || match == null ?
                                <div className="container-players">
                                    <div className="container justify-content-center">
                                        <h3 className="text-center">Error al cargar la informacion</h3>
                                        <button className="buttonplay w-100 rounded p-2" onClick={() => { history.push("/"); }}>Regresar</button>
                                    </div>
                                </div> :
                                <div className="container-players">

                                    <div className="container">
                                        <div className="">
                                            <h1 className="text-center">Nombre de la sala:  <strong>{match.room}</strong></h1>
                                            <h1 className="text-center">Tipo de operacion:  <strong>{match.operation}</strong></h1>
                                            <h1 className="text-center">Tiempo limite:      <strong>{match.limit}</strong></h1>
                                            <h3 className="text-center">Lista de jugadores</h3>
                                        </div>
                                    </div>
                                    <div className="d-flex flex-column justify-content-center">
                                        {
                                            players.map((user, index) => {
                                                return <div key={index} className="alert alert-success" role="alert">
                                                    {user.rol === "admin" ? "Administrador: " : null}{user.name}
                                                </div>
                                            })
                                        }
                                    </div>
                                    {
                                        player.rol === "admin" ?
                                            <div className="container d-flex justify-content-center">
                                                <button className="buttonplay w-100 rounded p-2" onClick={() => { startgame() }}>Comenzar juego</button>
                                            </div> :
                                            <div className="container d-flex justify-content-center">
                                                <h3>Espera a que el administrador inicie el juego</h3>
                                            </div>
                                    }
                                </div>

                        }
                    </div>
                </div>
            </div>
            <Modal show={adminleft}>
                <Modal.Body>
                    <h1 className="text-center">El administrador ha salido de la sala</h1>
                    <div className="d-flex w-100 justify-content-center">
                        <button className="modal-button w-50 p-3" onClick={() => { removeUser() }}>Regresar</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
