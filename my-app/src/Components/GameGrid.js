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
        var newX = player.x;
        var newY = player.y;

        switch (keyPressed) {
            case "w":
                newY -= 1;
                break;
            case "a":
                newX -= 1;
                break;
            case "s":
                newY += 1;
                break;
            case "d": 
                newX += 1;
                break;
            default:
                // do nothing.
        }

        if (newX !== player.x || newY !== player.y) {
            var isPlayerMoved = this.state["gameData"].tryMovePlayer(newX, newY);
            if (isPlayerMoved) {
                this.setState({"gameData": this.state["gameData"]}); // Refresh
            }
        }
    }
}

export default GameGrid;