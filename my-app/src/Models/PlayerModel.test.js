import sinon from 'sinon/lib/sinon';

import Direction from "../Enums/Direction";
import PlayerModel from "./PlayerModel";
import ProjectileType from '../Enums/ProjectileType';


var clock;

beforeEach(function() {
  clock = sinon.useFakeTimers();
});

afterEach(function() {
  clock.restore();
});

it('constructor sets appropriate values', () => {
  var player = new PlayerModel(13, -17);
  expect(player.x).toBe(13);
  expect(player.y).toBe(-17);
  
  expect(player.facing).toBe(Direction.UP);
});

it('chargeShot sets charging start time if null', () => {
  // Just for kicks / non-zero value
  var initialClockTime = 999;
  clock.tick(initialClockTime);

  var player = new PlayerModel(0, 0);
  expect(player.chargingSince).toBe(null);
  
  player.chargeShot();
  // When null, set to current time
  expect(player.chargingSince).toBe(initialClockTime);

  clock.tick(1024);
  player.chargeShot();
  // When set, doesn't change.
  expect(player.chargingSince).toBe(initialClockTime);
})

it("dischargeShot throws if chargeShot wasn't called", () => {
  var player = new PlayerModel(19, 91);
  expect(player.dischargeShot).toThrow();
})

it('dischargeShot returns NORMAL and unsets chargingSince', () => {
  var player = new PlayerModel(0, 0);
  player.chargeShot();
  var actual = player.dischargeShot();
  expect(actual).toBe(ProjectileType.NORMAL);
  
  // Small times? Still normal.
  player.chargeShot();
  clock.tick(100);
  actual = player.dischargeShot();
  expect(actual).toBe(ProjectileType.NORMAL);
})

it('dischargeShot returns CHARGED after 250ms', () => {
  var player = new PlayerModel(0, 0);
  player.chargeShot();
  clock.tick(333);
  var actual = player.dischargeShot();
  expect(actual).toBe(ProjectileType.CHARGED);
})