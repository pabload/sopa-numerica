import React from 'react'

export default function Listplayers(props) {
    const players = props.players;
    const getplayer = players.map((player, index) => {
        return <div key={index} className="alert alert-warning" role="alert">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                  <h2> {player.name}</h2>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                 <h2>puntos: {player.points}</h2>
                </div>
            </div>
        </div>
    })
    return (
        <div className="listplayers-container">
            <h1 className="text-center">Lista de jugadores</h1>
             {getplayer}
        </div>
    )
}
