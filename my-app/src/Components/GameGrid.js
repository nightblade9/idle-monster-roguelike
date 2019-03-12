import React from 'react';
import Tile from './Tile';

class GameGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {"gameData": props.gameData};
    }

    createTiles = () => {
        let rows = []
        var data = this.state["gameData"];

        // Outer loop to create parent
        for (let y = 0; y < data.mapHeight; y++) {
            let tiles = []
            //Inner loop to create children
            for (let x = 0; x < data.mapWidth; x++) {
                tiles.push(<Tile x={x} y={y} contents={data.currentMap[y * data.mapWidth + x]} key={"tile" + x + "-" + y} />)
            }
            //Create the parent and add the children
            rows.push(<div className="row" key={"row" + rows.length}>{tiles}</div>)
        }
        return rows
    }

    render() {
        return(
             // https://stackoverflow.com/questions/3149362/capture-key-press-or-keydown-event-on-div-element
            <div id="playerController" onKeyPress={this.handleKeyPress} tabIndex="0">
                <div id="grid" style={{background: "#222", color: "white", fontFamily: 'Roboto Mono, monospace', fontSize: "18px", width: 450}}>
                    {this.createTiles()}
                </div>
            </div>
        )
    }

    handleKeyPress = (event) => {
        var keyPressed = event.key;
        var player = this.state["gameData"].player;
        var newCoordinates = null; // [x, y]

        switch (keyPressed) {
            case "w":
                newCoordinates = [player.x, player.y - 1];
                break;
            case "a":
                newCoordinates = [player.x - 1, player.y];
                break;
            case "s":
                newCoordinates = [player.x, player.y + 1];
                break;
            case "d": 
                newCoordinates = [player.x + 1, player.y];
                break;
            default:
                // do nothing.
        }

        if (newCoordinates != null) {
            this.state["gameData"].movePlayer(newCoordinates[0], newCoordinates[1]);
            this.setState({"gameData": this.state["gameData"]}); // Refresh
        }
    }
}

export default GameGrid;