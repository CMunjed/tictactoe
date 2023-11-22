import circle_icon from '../assets/o.png';
import cross_icon from '../assets/x.png';

function Square({ value, onSquareClick }) {

    /*if (value == 'X') {
        this.innerHTML = `<img src='${cross_icon}'>`;
    }
    else if (value == 'O') {
        this.innerHTML = `<img src='${circle_icon}'>`;
    }
    else {
        this.innerHTML = ``;
    }*/

    /*let icon;

    if (value == 'X') {
        icon = `<img src='${cross_icon}'>`;
    }
    else if (value == 'O') {
        icon = `<img src='${circle_icon}'>`;
    }
    else {
        icon = ``;
    }*/

    if (value == 'X') {
        return (
            <div className="box" onClick={onSquareClick}>
                <img src={cross_icon}></img>
            </div>
        )
    }
    else if (value == 'O') {
        return (
            <div className="box" onClick={onSquareClick}>
                <img src={circle_icon}></img>
            </div>
        )
    }
    
    return (
        <div className="box" onClick={onSquareClick}>
            
        </div>
    )
}

export default Square;