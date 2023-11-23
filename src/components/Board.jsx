import Square from "./Square";
import Strike from "./Strike";

//import "../App.css";

function Board({ squares, onSquareClick, playerTurn, strikeClass }) {
    return (
        <div className="board">
            <div className="row">
                <Square playerTurn={playerTurn} value={squares[0]} onClick={()=>onSquareClick(0)}/>
                <Square playerTurn={playerTurn} value={squares[1]} onClick={()=>onSquareClick(1)}/>
                <Square playerTurn={playerTurn} value={squares[2]} onClick={()=>onSquareClick(2)}/>
            </div>
            <div className="row">
                <Square playerTurn={playerTurn} value={squares[3]} onClick={()=>onSquareClick(3)}/>
                <Square playerTurn={playerTurn} value={squares[4]} onClick={()=>onSquareClick(4)}/>
                <Square playerTurn={playerTurn} value={squares[5]} onClick={()=>onSquareClick(5)}/>
            </div>
            <div className="row">
                <Square playerTurn={playerTurn} value={squares[6]} onClick={()=>onSquareClick(6)}/>
                <Square playerTurn={playerTurn} value={squares[7]} onClick={()=>onSquareClick(7)}/>
                <Square playerTurn={playerTurn} value={squares[8]} onClick={()=>onSquareClick(8)}/>
            </div>
            <Strike strikeClass={strikeClass}/>
        </div>
    );
}

export default Board;