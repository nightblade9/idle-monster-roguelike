import React, { Component } from 'react';
import Tile from './Tile' 

const TILES_WIDE = 50
const TILES_HIGH = 15

class GameGrid extends React.Component {
    
    createTiles = () => {
        let rows = []

        // Outer loop to create parent
        for (let j = 0; j < TILES_HIGH; j++) {
            let tiles = []
            //Inner loop to create children
            for (let i = 0; i < TILES_WIDE; i++) {
                tiles.push(<Tile />);
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