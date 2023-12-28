function GameMode({ onToggle, ai }) {
    switch (ai) {
        case (true):
            return (
                <div className="bottomButton gamemode" onClick={onToggle}>
                    AI
                </div>
            );
        case (false):
            return (
                <div className="bottomButton gamemode" onClick={onToggle}>
                    2-Player
                </div>
            );
    }
    return (<></>);
}

export default GameMode;