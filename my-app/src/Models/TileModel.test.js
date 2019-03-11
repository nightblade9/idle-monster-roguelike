import TileModel from "./TileModel";

it('sets type to the constructor value', () => {
  var constructorValue = "wall";
  var tileModel = new TileModel(constructorValue);
  expect(tileModel.type).toBe(constructorValue);
});

it('overrides contents when calling setValue', () => {
  var tileModel = new TileModel("floor");
  tileModel.setContents("a");
  tileModel.setContents("b");
  expect(tileModel.contents).toBe("b");
});

it('clears contents to null when calling clearContents', () => {
  var tileModel = new TileModel("lava");
  tileModel.setContents("shiny new item");
  tileModel.clearContents();
  expect(tileModel.contents).toBe(null);
});