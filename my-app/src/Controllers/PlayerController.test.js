import GameData from '../Models/GameData'
import PlayerController from "./PlayerController";
import Directions from '../Enums/Direction';

it('tryMovePlayer throws if direction is invalid', () => {
  var gameData = new GameData();
  var controller = new PlayerController(gameData);
  expect(function() { controller.tryMovePlayer("180 Degrees"); }).toThrow();
});

it('tryMovePlayer returns gameData.tryToMove if direction is legit', () => {
  var gameData = new GameData();
  var player = gameData.player;
  var controller = new PlayerController(gameData);

  var actual = controller.tryMovePlayer(Directions.UP);
  expect(actual).toBe(true);

  // Move up until we bump into a wall
  var n = 10;
  while (n-- > 0) {
    controller.tryMovePlayer(Directions.UP);
  }

  actual = controller.tryMovePlayer(Directions.UP);
  expect(actual).toBe(false);
})