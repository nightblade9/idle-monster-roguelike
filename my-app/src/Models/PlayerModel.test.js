import PlayerModel from "./PlayerModel";
import Direction from "../Enums/Direction";

it('constructor sets appropriate values', () => {
  var player = new PlayerModel(13, -17);
  expect(player.x).toBe(13);
  expect(player.y).toBe(-17);
  
  expect(player.facing).toBe(Direction.UP);
});