import React from 'react';

class Tile extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { contents: null };
        
        if ("contents" in props) {
            this.state["contents"] = props.contents;
        }
    }

    render() {
        return <div style={{background: "#222", display: "inline"}}>{this.getCharacter()}</div>;
    }

    getCharacter() {
        // TODO: this code smells. Reeks, even.
        if (this.state.contents == null) {
            return ".";
        } else if (this.state.contents.toLowerCase() === "wall") {
            return "#";
        }
        throw new Error("Not sure how to render tile contents: " + this.contents);
    }
}

export default Tile;