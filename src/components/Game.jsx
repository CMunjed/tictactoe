import { useState, useEffect } from "react";
import Board from "./Board";

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
function checkWinner(squares, setStrikeClass) {
    for (const {combo, strikeClass} of winningCombos) {
        const squareValue1 = squares[combo[0]];
        const squareValue2 = squares[combo[1]];
        const squareValue3 = squares[combo[2]];

        if (squareValue1 !== null && squareValue1 === squareValue2 && squareValue2 === squareValue3) {
            setStrikeClass(strikeClass);
        }
    }
}

function Game() {
    //Squares array
    const [squares, setSquares] = useState(Array(9).fill(null));
    
    //Var to store player turn === X or O
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);

    //Var to store strike-through class
    const [strikeClass, setStrikeClass] = useState();

    //Handle when a square is clicked
    const handleClick = (index) => {
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
    }

    //
    useEffect(() => {
        checkWinner(squares, setStrikeClass);
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
        </div>
    );
}

export default Game;