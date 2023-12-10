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
    /*return (
        <div className="bottomButton gamemode" onClick={onToggle}>
            <div className="ai">AI</div>
            <div className="twoplayer">2-Player</div>
        </div>
    );*/
}

export default GameMode;