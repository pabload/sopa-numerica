import React from 'react'

export default function Stickynote(props) {
    return (
        <div className="row h-100 align-items-center justify-content-center">
            <div className='post-it m-0'>
              <h1>Puntajes</h1>
              <h2>Aciertos: {props.hits} </h2>
            </div>
          </div>
    )
}
