import GameState from "./GameState";
import x_img from "../assets/x.png";
import o_img from "../assets/o.png";

function GameOver({ gameState }) {
    switch (gameState) {
        case GameState.inProgress:
            return (<></>);
        case GameState.playerOWins:
            return (<div className="game-over">
                <img src={o_img}/>
                &nbsp;wins!
                </div>
                );
        case GameState.playerXWins:
            return (<div className="game-over">
                <img src={x_img}/>
                &nbsp;wins!
                </div>
                );
        case GameState.draw:
            return (<div className="game-over">Draw!</div>);
        default:
            return (<></>);
    }
    /*return (
        <div>Game Over</div>
    );*/
}

export default GameOver;