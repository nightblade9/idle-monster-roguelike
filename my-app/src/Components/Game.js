import React from 'react';

import Direction from '../Enums/Direction';
import PlayerController from '../Controllers/PlayerController';
import StatusBar from './StatusBar';
import Tile from './Tile';
import FpsCounter from '../Models/FpsCounter';

const KEY_TO_DIRECTION = {
    "w": Direction.UP,
    "a": Direction.LEFT,
    "s": Direction.DOWN,
    "d": Direction.RIGHT
}

const TARGET_FPS = 30;

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {"gameData": props.gameData};
        this.playerController = new PlayerController(props.gameData);
        this.enableConstantRendering = false;
        this.fpsCounter = new FpsCounter();

        if ("enableConstantRendering" in props) {
            this.enableConstantRendering = props["enableConstantRendering"];
        }
    }

    // REGION: render at full speed. All. The. Time.
    // https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
    componentDidMount =  () => {
        if (this.enableConstantRendering) {
            var intervalId = setInterval(this.onUpdate, 1000 / TARGET_FPS);
            // store intervalId in the state so it can be accessed later:
            this.setState({intervalId: intervalId});
        }
     }
     
     componentWillUnmount = () => {
        if (this.enableConstantRendering) {
            // use intervalId from the state to clear the interval
            clearInterval(this.state.intervalId);
        }
     }
     
     onUpdate = () => {
        // setState method is used to force an update
        this.setState(this.state);
        this.fpsCounter.onUpdate();
     }

    // END REGION

    createTiles = () => {
        let rows = []
        var data = this.state["gameData"];

        // Outer loop to create parent
        for (let y = 0; y < data.mapHeight; y++) {
            let tiles = []
            //Inner loop to create children
            for (let x = 0; x < data.mapWidth; x++) {
                tiles.push(<Tile x={x} y={y} contents={data.currentMap[y * data.mapWidth + x]} key={"tile" + x + "-" + y} player={data.player} />)
            }
            //Create the parent and add the children
            rows.push(<div className="row" key={"row" + rows.length}>{tiles}</div>)
        }
        return rows;
    }

    render() {
        this.fpsCounter.onRender();

        return(
             // https://stackoverflow.com/questions/3149362/capture-key-press-or-keydown-event-on-div-element
            <div id="playerController" onKeyPress={this.handleKeyPress} tabIndex="0">
                <div id="grid" style={{color: "white", fontFamily: 'Roboto Mono, monospace', fontSize: "18px", width: 450}}>
                    {this.createTiles()}
                </div>

                <StatusBar gameData={this.state["gameData"]} fpsCounter={this.fpsCounter} />
            </div>
        );
    }

    handleKeyPress = (event) => {
        var keyPressed = event.key;
        if (keyPressed in KEY_TO_DIRECTION) {
            var directionPressed = KEY_TO_DIRECTION[keyPressed];        
            var isPlayerMoved = this.playerController.tryMovePlayer(directionPressed);
            if (isPlayerMoved) {
                //this.setState({"gameData": this.state["gameData"]}); // Refresh
                this.setState({"gameData": Object.assign({}, this.state["gameData"])});
            }
        }
    }
}

export default Game;