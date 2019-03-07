import React from 'react';
import Tile from './Tile';

class GameGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.gameData = props.gameData;
    }

    createTiles = () => {
        let rows = []
        var data = this.gameData;

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
            <div id="grid" style={{background: "#222", color: "white", fontFamily: 'Roboto Mono, monospace', fontSize: "18px", width: 450}}>
                {this.createTiles()}
            </div>
        )
    }
}

export default GameGrid;