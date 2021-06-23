import React from 'react'

export default function Buttonbox(props) {
    const numbers =props.numbers;
    const selectnumber =props.selectnumber;
    const getButtons = numbers.map((num, index) => {
        return <div key={index} className="col-lg-4 col-4">
          <button type="button" onClick={() => { selectnumber(num) }} className="botonnumeros w-100 p-2 rounded">{num}</button>
        </div>
      });
    return (
        <div className="row no-gutters">
         {getButtons}
        </div>

    )
}
