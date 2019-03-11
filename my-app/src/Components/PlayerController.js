import React from 'react';
import GameGrid from './GameGrid'

// A player controller (handles keyboard input, moves player). Because of the way keyboard events
// propagate, must necessarily be an outer tag that encloses the GameGrid element.
class PlayerController extends React.Component {

    constructor(props) {
        super(props);
        this.gameData = props.gameData;
    }

    handleKeyPress = (event) => {
        var keyPressed = event.key;
        switch (keyPressed) {
            case "w":
                this.gameData.player.y -= 1;
                break;
            case "a":
                this.gameData.player.x -= 1;
                break;
            case "s":
                this.gameData.player.y += 1;
                break;
            case "d": 
                this.gameData.player.x += 1;
                break;
            default:
                // do nothing.
        }
        console.log("Player is now at " + this.gameData.player.x + ", " + this.gameData.player.y);
        this.setState(this.state);
    }

    render() {
        return(
            // https://stackoverflow.com/questions/3149362/capture-key-press-or-keydown-event-on-div-element
            <div id="playerController" onKeyPress={this.handleKeyPress} tabIndex="0">
                <GameGrid gameData={this.gameData} />
            </div>
        )
    }
}

export default PlayerController;