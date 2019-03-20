import React from 'react';

class StatusBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { "gameData": props.gameData, "fpsStats": props.fpsStats }
    }

    render() {
        return (
            <div id="statusBar" style={{padding: "8px" }}>Facing {this.state["gameData"].player.facing}
                <div id="debug">
                    Player is at {this.state["gameData"].player.x}, {this.state["gameData"].player.y}<br />
                    {this.state["fpsStats"].fps} FPS
                    </div>
            </div>
        );
    }
}

export default StatusBar;