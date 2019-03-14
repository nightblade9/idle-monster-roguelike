import TileModel from "./TileModel";

it('sets type to the constructor value', () => {
  var constructorValue = "wall";
  var tileModel = new TileModel(constructorValue);
  expect(tileModel.type).toBe(constructorValue);
});

it('overrides contents when calling occupy', () => {
  var tileModel = new TileModel("floor");
  tileModel.occupy("a");
  tileModel.occupy("b");
  expect(tileModel.occupant).toBe("b");
});

it('clears contents to null when calling empty', () => {
  var tileModel = new TileModel("lava");
  tileModel.occupy("shiny new item");
  tileModel.empty();
  expect(tileModel.occupant).toBe(null);
});

it('isWalkable is true if state is floor and unoccupied', () => {
  var tileModel = new TileModel("floor");
  tileModel.empty();
  expect(tileModel.isWalkable()).toBe(true);
});

it('isWalkable is false if state is floor and occupied', () => {
  var tileModel = new TileModel("floor");
  tileModel.occupy("Monster 37");
  expect(tileModel.isWalkable()).toBe(false);
});

it('isWalkable is false if state is wall and unoccupied', () => {
  var tileModel = new TileModel("wall");
  tileModel.empty();
  expect(tileModel.isWalkable()).toBe(false);
});