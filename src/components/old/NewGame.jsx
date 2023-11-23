import React, { useState, useRef } from 'react';
import Board from './Board';
import { FaUndoAlt } from "react-icons/fa";
import circle_icon from '../assets/o.png';
import cross_icon from '../assets/x.png';

function NewGame() {
    //const [history, setHistory] = useState([Array(9).fill(null)]);
    //const [currentMove, setCurrentMove] = useState(0);
    //const xIsNext = currentMove % 2 === 0;
    //const currentSquares = history[currentMove];
    let gameOverMessage = useRef(0);
  
    function handlePlay(nextSquares) {
      //const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      //setHistory(nextHistory);
      //setCurrentMove(nextHistory.length - 1);
      
    }

    function setGameOverMessage(winner) {
        if (winner==="X") {
            gameOverMessage.current.innerHTML = `<img src=${cross_icon}> wins!`;
        }
        else {
            gameOverMessage.current.innerHTML = `<img src=${circle_icon}> wins!`;
        }
    }
  
    //function jumpTo(nextMove) {
    //  setCurrentMove(nextMove);
    //}
  
    /*const moves = history.map((squares, move) => {
      let description;
      if (move > 0) {
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });*/

    //<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} setGameOverMessage={setGameOverMessage} />
  
    return (
        <div className='container'>
            <h1 className='title'>Tic&nbsp;<span>Tac</span>&nbsp;Toe!</h1>
            <Board setGameOverMessage={setGameOverMessage} />
            {/* Perhaps game over message here instead of in board. */}
            <div className="messageSpace">
                <h2 ref={gameOverMessage}></h2>
            </div>
            <button className="bottomButton undo"><span><FaUndoAlt /></span> Undo</button>
            <button className="bottomButton reset" onClick={()=>{}}>Reset</button>
      </div>
    );
  }

  export default NewGame;