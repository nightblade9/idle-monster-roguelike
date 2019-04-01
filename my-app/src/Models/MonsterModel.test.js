import MonsterModel from "./MonsterModel";

it('constructor sets appropriate values', () => {
  var monster = new MonsterModel(1, 2);
  expect(monster.x).toBe(1);
  expect(monster.y).toBe(2);
});