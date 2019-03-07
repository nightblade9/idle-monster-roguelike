import React from 'react';
import Tile from './Tile' 

const TILES_WIDE = 50
const TILES_HIGH = 16

class GameGrid extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {tileContents: Array(TILES_WIDE * TILES_HIGH)};

        for (let y = 0; y < TILES_HIGH; y++) {
            for (let x = 0; x < TILES_WIDE; x++) {
                var index = (y * TILES_WIDE) + x;
                if (x === 0 || y === 0 || x === TILES_WIDE - 1 || y === TILES_HIGH - 1) {
                    this.state.tileContents[index] = "wall";
                } else {
                    this.state.tileContents[index] = "empty";
                }
            }
        }
    }

    createTiles = () => {
        let rows = []

        // Outer loop to create parent
        for (let y = 0; y < TILES_HIGH; y++) {
            let tiles = []
            //Inner loop to create children
            for (let x = 0; x < TILES_WIDE; x++) {
                tiles.push(<Tile contents={this.state.tileContents[y * TILES_WIDE + x]} key={"tile" + x + "-" + y} />)
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