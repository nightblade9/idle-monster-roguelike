import React from 'react';

class Tile extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {"contents": "empty"};

        if ("contents" in props) {
            // "Contents" is an instance of TileModel
            var tileModel = this.props["contents"];
            var type = tileModel.type.toLowerCase();
            if (type in Tile.VALID_STATES_DISPLAY) {
                this.state["data"] = tileModel;
            } else {
                throw new Error("Invalid tile type: " + type);
            }
        }
    }

    render() {
        return <div style={{background: "#222", display: "inline"}}>{this.getCharacter()}</div>;
    }

    getCharacter() {
        return Tile.VALID_STATES_DISPLAY[this.state["data"].type];
    }
}

// Valid contents, and what they display as
Tile.VALID_STATES_DISPLAY = {
    "floor": '.',
    "wall": '#'
}


export default Tile;