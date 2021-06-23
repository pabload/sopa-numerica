import React, { useState, useEffect } from 'react';
import Buttonbox from './buttonbox';
import Operation from  './operation';
import { socket } from './socket';
export default function Boardmultiplayer(props) {
    const numbers = props.numbers
    const type = props.type
    const res = props.res;
    const [num1, setnum1] = useState();
    const [num2, setnum2] = useState();;
    const [error, seterror] = useState("");
    useEffect(() => {
        const isCorrect = () => {
          if (num2 != null) {
            var operators = {
              'suma': function (a, b) { return a + b },
              'resta': function (a, b) { return a - b },
              'multi': function (a, b) { return a * b }
            }
            var resuser = operators[type](num1, num2);
            setTimeout(() => {
              if (resuser !== res) {
                seterror(true);
              }
              setnum1(null);
              setnum2(null);
              if (resuser === res) {
                socket.emit("correctanswer",{});
              }
            }, 100)
    
            seterror(null);
          }
        }
        isCorrect();
      }, [num2]);
    const selectnumber = (num) => {
        if (num1 == null) {
          setnum1(num);
        } else {
          setnum2(num);
    
        }
      }
    return (
        <div className="board-container p-5">
             <Operation type={type} num1={num1} num2={num2} setnum1={setnum1} error={error} setnum2={setnum2} res={res} />
            <div className="row no-gutters">
              <Buttonbox numbers={numbers} selectnumber={selectnumber} />
            </div>
        </div>
    )
}
