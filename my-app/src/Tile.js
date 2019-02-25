import React from 'react';

class Tile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { isWall: ("isWall" in props ? props.isWall : false) };
    }

    render() {
        return <div style={{background: "#222", display: "inline"}}>{this.getCharacter()}</div>;
    }

    getCharacter() {
        if (this.state.isWall) {
            return '#';
        } else {
            return '.';
        }
    }
}

export default Tile;