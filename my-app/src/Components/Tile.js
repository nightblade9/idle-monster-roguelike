import React from 'react';

class Tile extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {"contents": "empty"};

        if ("contents" in props) {
            var contents = this.props["contents"].toLowerCase();
            if (contents in Tile.VALID_CONTENTS_DISPLAY) {
                var value = Tile.VALID_CONTENTS_DISPLAY;
                if (value !== null) {
                    this.state["contents"] = contents;
                }
            } else {
                throw new Error("Invalid tile contents: " + contents);
            }
        }
    }

    render() {
        return <div style={{background: "#222", display: "inline"}}>{this.getCharacter()}</div>;
    }

    getCharacter() {
        return Tile.VALID_CONTENTS_DISPLAY[this.state.contents];
    }
}

// Valid contents, and what they display as
Tile.VALID_CONTENTS_DISPLAY = {
    "empty": '.',
    "wall": '#'
}


export default Tile;