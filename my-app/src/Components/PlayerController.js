import React from 'react';
import GameGrid from './GameGrid'

// A player controller (handles keyboard input, moves player). Because of the way keyboard events
// propagate, must necessarily be an outer tag that encloses the GameGrid element.
class PlayerController extends React.Component {

    constructor(props) {
        super(props);
        this.gameData = props.gameData;
        console.log("PC: gd=" + this.gameData);
    }

    handleKeyPress = (event) => {
        console.log("Key pressed: " + event.key);
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