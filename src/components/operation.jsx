import React from 'react';
export default function Operation(props) {
    const type= props.type;
    const res= props.res;
    const num1= props.num1;
    const num2= props.num2;
    const errorAnimation= props.error===true?"animate__animated animate__headShake":"";
    return (
        <div className="row justify-content-center mb-3">
            <div className="col-3 ">
                <div className={"nums container w-100  h-100 " + errorAnimation }>
                    <h1 className="text-center"> {num1} </h1>
                </div>
            </div>
            <div className="col-1">
                <h1>{type === "suma" ? "+" : type === "resta" ? "-" : "x"}</h1>
            </div>
            <div className="col-3">
                <div className={"nums container w-100  h-100 " + errorAnimation}>
                    <h1 className="text-center"> {num2} </h1>
                </div>
            </div>
            <div className="col-1">
                <h1>=</h1>
            </div>
            <div className="col-2">
                <h1> {res} </h1>
            </div>
        </div>
    )
}
