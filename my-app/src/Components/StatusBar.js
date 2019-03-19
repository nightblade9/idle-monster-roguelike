import React from 'react';

class StatusBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { "gameData": props.gameData }
    }

    render() {
        return (
            <div id="statusBar">Direction goes here
                <div id="debug">Player is at {this.state["gameData"].player.x}, {this.state["gameData"].player.y}</div>
            </div>
        );
    }
}

export default StatusBar;