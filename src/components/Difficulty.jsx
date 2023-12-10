import DifficultyLevels from "./DifficultyLevels";

function Difficulty({difficulty, onSet}) {
    switch (difficulty) {
        case (DifficultyLevels.EASY):
            return (
                <div className="bottomButton difficulty" onClick={onSet}>
                    <span className="easy">Difficulty: Easy</span>
                </div>
            );
        case (DifficultyLevels.MEDIUM):
            return (
                <div className="bottomButton difficulty" onClick={onSet}>
                    <span className="medium">Difficulty: Medium</span>
                </div>
            );
        case (DifficultyLevels.HARD):
            return (
                <div className="bottomButton difficulty" onClick={onSet}>
                    <span className="hard">Difficulty: Hard</span>
                </div>
            );
        default:
            return (
                <div className="bottomButton difficulty" onClick={onSet}>
                    <span className="hard">Difficulty: Hard</span>
                </div>
            );
    }
    /*return (  
        <div className="bottomButton difficulty">
                Difficulty:&nbsp;
                <span className="easy"></span>
        </div>
    );*/
}

export default Difficulty;