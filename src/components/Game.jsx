import { useState, useEffect } from "react";
import Board from "./Board";
import GameOver from "./GameOver";
import GameState from "./GameState";
import Reset from "./Reset";
import Undo from "./Undo";

const PLAYER_X = "X";
const PLAYER_O = "O";

//Var to store winning tictactoe combinations
const winningCombos = [
    //Rows
    {combo:[0,1,2], strikeClass: "strike-row-1"},
    {combo:[3,4,5], strikeClass: "strike-row-2"},
    {combo:[6,7,8], strikeClass: "strike-row-3"},

    //Columns
    {combo:[0,3,6], strikeClass: "strike-column-1"},
    {combo:[1,4,7], strikeClass: "strike-column-2"},
    {combo:[2,5,8], strikeClass: "strike-column-3"},

    //Diagonals
    {combo:[0,4,8], strikeClass: "strike-diagonal-1"},
    {combo:[2,4,6], strikeClass: "strike-diagonal-2"},
];

//Function to check if someone has won
function checkWinner(squares, setStrikeClass, setGameState) {
    for (const {combo, strikeClass} of winningCombos) {
        const squareValue1 = squares[combo[0]];
        const squareValue2 = squares[combo[1]];
        const squareValue3 = squares[combo[2]];

        if (squareValue1 !== null && squareValue1 === squareValue2 && squareValue2 === squareValue3) {
            setStrikeClass(strikeClass);
            if (squareValue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            }
            else {
                setGameState(GameState.playerOWins);
            }
            return;
        }
    }

    //Check for draw
    const allSquaresAreFilled = squares.every((square) => square !== null);
    if (allSquaresAreFilled) {
        setGameState(GameState.draw);
    } 

}

function Game() {
    //Squares array
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    //Var to store player turn === X or O
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);

    //Var to store strike-through class
    const [strikeClass, setStrikeClass] = useState();

    //Var to store game state
    const [gameState, setGameState] = useState(GameState.inProgress);

    //Var to store previous moves
    const [previousMoves, setPreviousMoves] = useState([]);

    //Handle when a square is clicked
    const handleClick = (index) => {
        //If game is not in progress, return
        if (gameState !== GameState.inProgress) {
            return;
        }

        //If the square is already occupied, ignore click
        if (squares[index] !== null) {
            return;
        }

        //Update the squares array
        const newSquares = [...squares];
        newSquares[index] = playerTurn;
        setSquares(newSquares);

        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        }
        else {
            setPlayerTurn(PLAYER_X);
        }

        //Update previous moves list
        const newPrev = [...previousMoves];
        newPrev[previousMoves.length] = index;
        setPreviousMoves(newPrev);
    }

    //Function to handle the reset button
    const handleReset = () => {
        setGameState(GameState.inProgress);
        setSquares(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }

    //Function to handle the undo button
    const handleUndo = () => {
        //If no previous moves, return
        if (previousMoves.length <= 0) {
            //console.log("undo not performed");
            return;
        }

        //If game is already over, undo game over
        if (gameState !== GameState.inProgress) {
            setGameState(GameState.inProgress);
            setStrikeClass(null);
        }

        //Get the index of the last move made
        const prev = previousMoves[previousMoves.length-1];

        //Remove the last move from the squares on the board
        const newSquares = [...squares];
        newSquares[prev] = null;
        setSquares(newSquares);

        //Remove the last previous move from the previous moves array
        setPreviousMoves(previousMoves.slice(0,previousMoves.length-1));
        
        //Change turn
        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);
        }
        else {
            setPlayerTurn(PLAYER_X);
        }

        //console.log("undo performed.");
    }

    //useEffect to check for winner every time squares is updated
    useEffect(() => {
        checkWinner(squares, setStrikeClass, setGameState);
    }, [squares]);

    return (
        <div>
            <h1 className='title'>Tic&nbsp;<span>Tac</span>&nbsp;Toe</h1>
            <Board 
            playerTurn={playerTurn} 
            squares={squares} 
            onSquareClick={handleClick}
            strikeClass={strikeClass}
            />
            <GameOver gameState={gameState}/>
            <div className="buttonSection">
                <Undo onUndo={handleUndo}/>
                <Reset onReset={handleReset}/>
            </div>
        </div>
    );
}

export default Game;