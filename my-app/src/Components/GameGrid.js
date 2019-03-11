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
                tiles.push(<Tile contents={data.currentMap[y * data.mapWidth + x]} key={"tile" + x + "-" + y} />)
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
        var moved = false;

        switch (keyPressed) {
            case "w":
                player.y -= 1;
                moved = true;
                break;
            case "a":
                player.x -= 1;
                moved = true;
                break;
            case "s":
                player.y += 1;
                moved = true;
                break;
            case "d": 
                player.x += 1;
                moved = true;
                break;
            default:
                // do nothing.
        }

        if (moved) {
            console.log("Player is now at " + player.x + ", " + player.y);
            this.setState({"gameData": this.state["gameData"]});
        }
    }
}

export default GameGrid;