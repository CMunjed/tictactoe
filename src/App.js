/*import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';


function App() {

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);

  function Square({value, onSquareClick}) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  
  function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    function handleClick(i) {
      const nextSquares = squares.slice();
      nextSquares[i] = 'X';
      setSquares(nextSquares);
    }
    
    return (
      <>
        <div className="board">
          <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
            <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
            <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
          </div>
          <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
            <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
            <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
          </div>
          <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
            <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
            <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
          </div>
        </div>
      </>
    );
  }  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>The current time is {currentTime}.</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p></p>
        <Board />
      </header>
    </div>
  );
}

export default App;
*/


//import './App.css';
import React, { useState, useEffect } from 'react';
import Game from './components/Game.jsx';

function App() {
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    fetch('/api/time').then(res => res.json()).then(data => {
      setCurrentTime(data.time);
    });
  }, []);


  return (
    <div>
      <p style={{color: 'white', textAlign: 'center'}}>The current time is {currentTime}.</p>
      <Game />
    </div>
  );

}

export default App;