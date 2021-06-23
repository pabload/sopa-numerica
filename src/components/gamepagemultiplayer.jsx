import React, { useState, useEffect } from 'react';
import '../styles/style.gamepagemultiplayer.css'
import Listplayers from './listplayers';
import Timer from './timer';
import Boardmulyiplayer from './boardmultiplayer';
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router"
import { socket } from './socket';
export default function Gamepagemultiplayer() {
    const history = useHistory();
    const location = useLocation();
    let access = location.state;
    //player
    const [player, setPlayer] = useState({});
    //players 
    const [players, setPlayers] = useState([]);
    //timer
    const [minutes, setMinutes] = useState();
    //boardmultiplayer
    const [res, setres] = useState();
    const [type, setType] = useState([]);
    const [numbers, setNumbers] = useState([]);
    useEffect(() => {
        window.onpopstate = e => {
            socket.emit('removeuser', {});
            return history.push("/");
        }
        if (access == null) {
            return history.push("/");
        }
        socket.emit('getinfogame', {}, ({ user, users, match }) => {
            if(user==null){
                return setPlayer(null);
            }
            setPlayer(user);
            setMinutes(parseInt(match.limit));
            setNumbers(match.numbers);
            setType(match.operation);
            setres(match.res);
            setPlayers(users);
        });
        socket.on('changeres', ({ res, users }) => {
            setres(res);
            setPlayers(users);
        });
        return ()=>{

        }
    }, [])
    const removeuser=()=>{
        socket.emit('removeuser', {});
        history.push("/");
    }
    return (
        <div className={player!=null?"main-container-gamepagemultiplayer":"main-container-gamepagemultiplayer-error"}>
            {player==null?
               <div className="row h-100 justify-content-center align-items-center">
               <div className="col-lg-6">
                   <div className="container-error w-100  shadow">
                       <div className="container w-75 p-3">
                           <h2 className="text-center">Error al cargar informacion</h2>
                           <button type="button" className="botoncrearsala w-100 p-2 rounded mt-2" onClick={()=>{removeuser()}}>Regresar</button>
                       </div>
                   </div>
               </div>
             </div>:
              <div className="row h-100 no-gutters">
              <div className="col-lg-9">
                  <Timer minutes={minutes} setMinutes={setMinutes} player={player} />
                  <Boardmulyiplayer numbers={numbers} type={type} res={res} />
              </div>
              <div className="col-lg-3">
                  <Listplayers players={players} />
              </div>
          </div>
            }
        </div>
    )
}
