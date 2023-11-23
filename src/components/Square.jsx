import x_img from "../assets/x.png";
import o_img from "../assets/o.png";


function Square({ value, onClick, playerTurn }) {
    //If a value is in the square
    if (value === "X") {
        return (
            <div className="square" onClick={onClick}>
                <img src={x_img}></img>
            </div>
        );
    }
    else if (value === "O") {
        return (
            <div className="square" onClick={onClick}>
                <img src={o_img}></img>
            </div>
        );
    }

    //If no value is in the square
    //  Handle hovering preview
    if (playerTurn === "X") {
        return (
            <div className="square" onClick={onClick}>
                <img src={x_img} className="hide"/>
            </div>
        );
    }
    else if (playerTurn === "O") {
        return (
            <div className="square" onClick={onClick}>
                <img src={o_img} className="hide"/>
            </div>
        );
    }

    //Default, just in case
    return (
        <div className="square" onClick={onClick}>
            
        </div>
    );
}

export default Square;