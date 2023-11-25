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
function checkWinner(squares, setStrikeClass, setGameState, gameState, playerTurn, handleClick) {
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

    handleAIMove(squares, gameState, playerTurn, handleClick);
}

async function handleAIMove(squares, gameState, playerTurn, handleClick) {

    if (gameState === GameState.inProgress && playerTurn === PLAYER_O) {
        //console.log("AI move happening");

        let board = "";
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] === null) {
                board += "n";
            }
            else if (squares[i] === PLAYER_X) {
                board += "X";
            }
            else {
                board += "O";
            }
        }

        console.log(board);

        let pred = 0;
        //Fetch prediction
        await fetch('/api/predict/' + board)
            .then(res => res.json()).then(data => {
                //setTest(data.prediction);
                pred = data.prediction;
            });

        //console.log("next...");

        console.log('AI plays ' + pred);

        setTimeout(function() {

            //console.log('AI plays ' + pred);
            handleClick(pred);

        }, 750);
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

    //Var to track whether user is playing against AI
    const [usingAI, setUsingAI] = useState(false);

    /*const [test, setTest] = useState(0);

    useEffect(() => {
        fetch('/api/predict/XOXOOXnnn')
        .then(res => res.json()).then(data => {
            setTest(data.prediction);
        });
        }, []);

    console.log(test);*/

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

        //console.log(playerTurn);
        //handleAIMove();
    }

    /*const squaresIsEmpty = () => {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i] !== null) {
                return false;
            } 
        }

        return true;
    }*/

    /*useEffect(() => {
        handleAIMove();
    }, [squares]);*/

    /*const handleAIMove = () => {
        //console.log("handleAI called");

        if (usingAI && gameState === GameState.inProgress && playerTurn === PLAYER_O) {
        if (gameState === GameState.inProgress && playerTurn === PLAYER_O) {
            //console.log("AI move happening");

            let board = "";
            for (let i = 0; i < squares.length; i++) {
                if (squares[i] === null) {
                    board += "n";
                }
                else if (squares[i] === PLAYER_X) {
                    board += "X";
                }
                else {
                    board += "O";
                }
            }

            console.log(board);

            let pred = 0;
            //Fetch prediction
            fetch('/api/predict/' + board)
                .then(res => res.json()).then(data => {
                    //setTest(data.prediction);
                    pred = data.prediction;
                });

            //console.log("next...");

            console.log('AI plays ' + pred);

            setTimeout(function() {

                //console.log('AI plays ' + pred);
                handleClick(pred);

            }, 750);
        }
    }*/

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
        checkWinner(squares, setStrikeClass, setGameState, gameState, playerTurn, handleClick);
        //handleAIMove is added as a callback at the end of checkWinner.
        //handleAIMove(squares, gameState, playerTurn, handleClick);
        
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