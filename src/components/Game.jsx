import React, { useState, useRef } from 'react';
import './Game.css';
import circle_icon from '../assets/o.png';
import cross_icon from '../assets/x.png';

let data = ["", "", "", "", "", "", "", "", ""];

const Game = () => {

    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let gameOverMessage = useRef(0);

    const toggle = (e, num) => {
        if (lock) {
            return 0;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}'>`;
            data[num]="x";
            setCount(++count);
        }
        else {
            e.target.innerHTML = `<img src='${circle_icon}'>`;
            data[num]="o";
            setCount(++count);
        }
        checkWin();
    }

    const checkWin = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[0]);
        }
        else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[3]);
        }
        else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[6]);
        }
        else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[0]);
        }
        else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[1]);
        }
        else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[2]);
        }
        else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            won(data[0]);
        }
        else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[2]);
        }
    }

    const won = (winner) => {
        setLock(true);
        if (winner==="x") {
            gameOverMessage.current.innerHTML = `<img src=${cross_icon}> wins!`;
        }
        else {
            gameOverMessage.current.innerHTML = `<img src=${circle_icon}> wins!`;
        }
    }

    return (
        <div className='container'>
            <h1 className='title'>Tic Tac Toe!</h1>
            <div className="board">
                <div className="row1">
                    <div className="box" onClick={(e)=>{toggle(e,0)}}></div>
                    <div className="box" onClick={(e)=>{toggle(e,1)}}></div>
                    <div className="box" onClick={(e)=>{toggle(e,2)}}></div>
                </div>
                <div className="row1">
                    <div className="box" onClick={(e)=>{toggle(e,3)}}></div>
                    <div className="box" onClick={(e)=>{toggle(e,4)}}></div>
                    <div className="box" onClick={(e)=>{toggle(e,5)}}></div>
                </div>
                <div className="row1">
                    <div className="box" onClick={(e)=>{toggle(e,6)}}></div>
                    <div className="box" onClick={(e)=>{toggle(e,7)}}></div>
                    <div className="box" onClick={(e)=>{toggle(e,8)}}></div>
                </div>
            </div>
            <div className="messageSpace">
                <h2 ref={gameOverMessage}></h2>
            </div>
            <button className="reset">Reset</button>
        </div>
    );
}

export default Game;