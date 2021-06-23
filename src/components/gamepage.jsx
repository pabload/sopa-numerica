import React, { useState, useEffect} from 'react';
import '../styles/styles.gamepage.css'
import LineBar from './linebar';
import Operation from './operation';
import Buttonbox from './buttonbox';
import Stickynote from './stickynote';
export default function Gamepage(props) {
  const type = props.match.params.tipo;
  const [num1, setnum1] = useState();
  const [num2, setnum2] = useState();
  const [res, setres] = useState();
  const [numbers, setnumbers] = useState([]);
  const [error, seterror] = useState("");
  const [hits, sethits] = useState(0);
  const getRandomNumber = () => {
    return parseInt(Math.random() * (10 - 0) + 0);
  }
  const selectnumber = (num) => {
    if (num1 == null) {
      setnum1(num);
    } else {
      setnum2(num);

    }
  }
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
            sethits(hits + 1);
            seterror(false);
            getResult();
          }
        }, 100)

        seterror(null);
      }
    }
    isCorrect();
  }, [num2]);
  useEffect(() => {
    const fillArray = () => {
      var newArray = [];
      for (var i = 0; i < 21; i++) {
        newArray.push(getRandomNumber());
      }
      setnumbers(newArray);

    }
    fillArray()
  }, []);
  const getResult = () => {
    var num1 = numbers[Math.floor(Math.random() * numbers.length)];
    var num2 = numbers[Math.floor(Math.random() * numbers.length)];
    var operators = {
      'suma': function (a, b) { return a + b },
      'resta': function (a, b) { return a < b ? b - a : a - b },
      'multi': function (a, b) { return a * b }
    }
    setres(operators[type](num1, num2));
  }
  useEffect(() => {
    getResult();
  }, [numbers]);
  return (
    <div className="main-container-gamepage">
      <h1 className="text-center">SOPA NUMERICA</h1>
      <div className="row h-75  align-items-center justify-content-center">
        <div className="col-lg-8 col-md-8">
          <div className="container mb-5">
            <LineBar num2={num2} error={error} hits={hits} />
          </div>
          <Operation type={type} num1={num1} num2={num2} setnum1={setnum1} error={error} setnum2={setnum2} res={res} />
          <div className="container">
            <Buttonbox numbers={numbers} selectnumber={selectnumber} />
          </div>
        </div>
        <div className="col-lg-3 col-md-3  h-100">
          <Stickynote hits={hits} />
        </div>
      </div>
    </div>
  );

}
