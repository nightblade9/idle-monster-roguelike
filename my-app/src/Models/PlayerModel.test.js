import PlayerModel from "./PlayerModel";

it('sets coordinates to the constructor values', () => {
  var player = new PlayerModel(13, -17);
  expect(player.x).toBe(13);
  expect(player.y).toBe(-17);
});