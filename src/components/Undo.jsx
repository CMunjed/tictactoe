import { FaUndoAlt } from "react-icons/fa";

function Undo({ onUndo }) {
    return (
        <div onClick={onUndo} className="bottomButton undo">
        <span><FaUndoAlt/></span>
        &nbsp;Undo
        </div>);
}

export default Undo;