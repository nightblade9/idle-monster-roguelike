import React from 'react';
import Tile from './Tile' 

const TILES_WIDE = 50
const TILES_HIGH = 15

class GameGrid extends React.Component {
    
    createTiles = () => {
        let rows = []

        // Outer loop to create parent
        for (let y = 0; y < TILES_HIGH; y++) {
            let tiles = []
            //Inner loop to create children
            for (let x = 0; x < TILES_WIDE; x++) {
                if (x === 0 || y === 0 || x === TILES_WIDE - 1 || y === TILES_HIGH - 1)
                {
                    tiles.push(<Tile isWall="true" />)
                } else {
                    tiles.push(<Tile />);
                }
            }
            //Create the parent and add the children
            rows.push(<div className="row">{tiles}</div>)
        }
        return rows
    }


    render() {
        return(
            <div id="grid" style={{background: "#222", color: "white", fontFamily: 'Roboto Mono', fontSize: "18px", width: 450}}>
                {this.createTiles()}
            </div>
        )
    }
}

export default GameGrid;