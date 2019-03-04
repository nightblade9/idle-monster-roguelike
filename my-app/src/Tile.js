import React from 'react';

class Tile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {};
        
        if ("isWall" in props) {
            this.state["isWall"] = props.isWall;
        } else {
            this.state["isWall"] = false;
        }
    }

    render() {
        return <div style={{background: "#222", display: "inline"}}>{this.getCharacter()}</div>;
    }

    getCharacter() {
        if (this.state.isWall === true) {
            return '#';
        } else {
            return '.';
        }
    }
}

export default Tile;