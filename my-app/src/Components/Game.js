import React from 'react';

import Direction from '../Enums/Direction';
import Effect from '../Models/Effect';
import FpsCounter from '../Models/FpsCounter';
import PlayerController from '../Controllers/PlayerController';
import Projectile from '../Models/Projectile';
import ProjectileController from '../Controllers/ProjectileController';
import ProjectileType from '../Enums/ProjectileType';
import StatusBar from './StatusBar';
import Tile from './Tile';
import Palette from '../Enums/Palette';

const KEY_TO_DIRECTION = {
    "w": Direction.UP,
    "a": Direction.LEFT,
    "s": Direction.DOWN,
    "d": Direction.RIGHT
}

const FIRE_KEY = 'f';

const TARGET_FPS = 30;
const EFFECT_STEP_DISPLAY_TIME_MLLISECONDS = 100;

class Game extends React.Component {

    constructor(props) {
        super(props);

        var gameData = props.gameData;
        this.state = {"gameData": gameData};
        this.playerController = new PlayerController(gameData);
        this.projectileController = new ProjectileController(gameData);
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
        for (let y = 0; y < data.currentMap.tilesHigh; y++) {
            let tiles = []
            //Inner loop to create children
            for (let x = 0; x < data.currentMap.tilesWide; x++) {
                tiles.push(<Tile x={x} y={y} contents={data.currentMap.getTile(x, y)} key={"tile" + x + "-" + y} player={data.player} />)
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
            <div id="playerController" onKeyDown={this.onKeyDown} onKeyUp={this.onKeyUp} onKeyPress={this.onKeyPress} tabIndex="0">
                <div id="grid" style={{color: "white", fontFamily: 'Roboto Mono, monospace', fontSize: "18px", width: 450}}>
                    {this.createTiles()}
                </div>

                <StatusBar gameData={this.state["gameData"]} fpsCounter={this.fpsCounter} />
            </div>
        );
    }

    onKeyDown = async (event) => {
        var keyPressed = event.key;

        if (keyPressed in KEY_TO_DIRECTION) {
            var directionPressed = KEY_TO_DIRECTION[keyPressed];        
            var isPlayerMoved = this.playerController.tryMovePlayer(directionPressed);
            if (isPlayerMoved) {
                this.refreshView();
            }
        }
    }
    
    onKeyPress = async (event) => {
        var keyPressed = event.key;

        if (keyPressed === FIRE_KEY) {
            this.state["gameData"].player.chargeShot();
        }
    }

    onKeyUp = async (event) => {
        var keyPressed = event.key;

        if (keyPressed === FIRE_KEY) {
            var player = this.state["gameData"].player;

            var startX = player.x;
            var startY = player.y;

            switch (player.facing) {
                case Direction.UP:
                    startY -= 1;
                    break;
                case Direction.RIGHT:
                    startX += 1;
                    break;
                case Direction.DOWN:
                    startY += 1;
                    break;
                case Direction.LEFT:
                    startX -= 1;
                    break;
                default:
                    throw Error("Not sure how to set projectile position based on a bullet facing " + player.facing);
            }

            var projectile = new Projectile(startX, startY, player.facing);
            var path = this.projectileController.getProjectilePath(projectile);
            var isFacingHorizontal = player.facing === Direction.LEFT || player.facing === Direction.RIGHT;

            var projectileType = player.dischargeShot();
            var projectileCharacter = this.getProjectileCharacter(projectileType, isFacingHorizontal);
            var effect = new Effect(projectileCharacter, Palette.RED);

            player.canMove = false;
            this.projectileController.moveUntilDestroyed(projectile, path, EFFECT_STEP_DISPLAY_TIME_MLLISECONDS, effect, () => player.canMove = true);
        }
    }

    getProjectileCharacter = (projectileType, isHorizontal) => {
        switch (projectileType) {
            case ProjectileType.NORMAL:
                return isHorizontal ? '-' : '|';
            case ProjectileType.CHARGED:
                return isHorizontal ? '=' : '║';
            default:
                throw Error("Not sure how to portray shots of " + projectileType + " when isHorizontal=" + isHorizontal);
        }
    }

    refreshView = () => {
        this.setState({"gameData": Object.assign({}, this.state["gameData"])}); // Refresh
    }
}

export default Game;