import Utils from '../src/utils/Utils.js'


test('Utils.degreeToRadian', () => {
  // Inverted results
  expect(Number(Utils.degreeToRadian(1).toFixed(4))).toBe(-0.0175);
  expect(Utils.degreeToRadian(60)).toBe(-Math.PI / 3);
  expect(Utils.degreeToRadian(90)).toBe(-Math.PI / 2);
  expect(Utils.degreeToRadian(180)).toBe(-Math.PI);
  expect(Utils.degreeToRadian(360)).toBeLessThanOrEqual(0.000001)// 0
  expect(Utils.degreeToRadian(720)).toBeLessThanOrEqual(0.000001)// 0
});

test('Utils.radianToDegree', () => {
  expect(Number(Utils.radianToDegree(1).toFixed(4))).toBe(57.2958);
  expect(Number(Utils.radianToDegree(2.5).toFixed(4))).toBe(143.2394);
  expect(Number(Utils.radianToDegree(Math.PI / 3).toFixed(0))).toBe(60);
  expect(Number(Utils.radianToDegree(Math.PI / 2).toFixed(0))).toBe(90);
  expect(Number(Utils.radianToDegree(Math.PI).toFixed(0))).toBe(180);
  expect(Number(Utils.radianToDegree(2 * Math.PI).toFixed(0))).toBe(360);
  expect(Number(Utils.radianToDegree(4 * Math.PI).toFixed(0))).toBe(720);
});

test('Utils.positionOnCircle', () => {
  expect(Utils.positionOnCircle(0, 0, 1, 0)).toMatchObject({ x: 1, y: 0 })

  expect(Utils.positionOnCircle(0, 0, 1, Math.PI / 3).x).toBeLessThanOrEqual(0.51)
  expect(Utils.positionOnCircle(0, 0, 1, Math.PI / 3).y).toBeLessThanOrEqual(0.87)

  expect(Utils.positionOnCircle(0, 0, 1, Math.PI / 2).x).toBeLessThanOrEqual(0.000001)// 0
  expect(Utils.positionOnCircle(0, 0, 1, Math.PI / 2).y).toBeLessThanOrEqual(1)

  expect(Utils.positionOnCircle(0, 0, 1, 2 * Math.PI).x).toBeLessThanOrEqual(1)
  expect(Utils.positionOnCircle(0, 0, 1, 2 * Math.PI).y).toBeLessThanOrEqual(0.000001)// 0

  expect(Utils.positionOnCircle(0, 0, 1, 4 * Math.PI).x).toBeLessThanOrEqual(1)
  expect(Utils.positionOnCircle(0, 0, 1, 4 * Math.PI).y).toBeLessThanOrEqual(0.000001)// 0

  expect(Utils.positionOnCircle(0, 0, 1, 6 * Math.PI).x).toBeLessThanOrEqual(1)
  expect(Utils.positionOnCircle(0, 0, 1, 6 * Math.PI).y).toBeLessThanOrEqual(0.000001)// 0
});

test('Utils.isCollision', () => {
  const COLLISION_RADIUS = 10

  expect(Utils.isCollision(50, [60], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(60, [60], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(70, [60], COLLISION_RADIUS)).toBeTruthy()

  expect(Utils.isCollision(170, [180], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(180, [180], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(190, [180], COLLISION_RADIUS)).toBeTruthy()

  expect(Utils.isCollision(350, [0], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(0, [0], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(10, [0], COLLISION_RADIUS)).toBeTruthy()

  expect(Utils.isCollision(340, [350], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(350, [350], COLLISION_RADIUS)).toBeTruthy()
  expect(Utils.isCollision(0, [350], COLLISION_RADIUS)).toBeTruthy()

  expect(Utils.isCollision(349, [0], COLLISION_RADIUS)).toBeFalsy()
  expect(Utils.isCollision(11, [0], COLLISION_RADIUS)).toBeFalsy()

  expect(Utils.isCollision(339, [350], COLLISION_RADIUS)).toBeFalsy()
  expect(Utils.isCollision(1, [350], COLLISION_RADIUS)).toBeFalsy()
});

test('Utils.positionToAngle', () => {
  expect(Utils.positionToAngle(0, 0, 0, 1)).toBe(90)
  expect(Utils.positionToAngle(0, 0, 0, -1)).toBe(-90)
  expect(Utils.positionToAngle(0, 0, 1, 0)).toBe(0)
  expect(Utils.positionToAngle(0, 0, -1, 0)).toBe(180)
});

test('Utils.cleanUp', () => {
  document.body.innerHTML = `
    <div id="paper">
      <div class="wrapper1">
        <div class="wrapper11"></div>
        <div class="wrapper12"></div>
      </div>
      <div class="wrapper2"></div>
    </div>
  `;

  expect(document.getElementById('paper')).toBeDefined()
  expect(document.getElementById('wrapper1')).toBeDefined()
  expect(document.getElementById('wrapper2')).toBeDefined()
  expect(document.getElementById('wrapper11')).toBeDefined()
  expect(document.getElementById('wrapper12')).toBeDefined()

  Utils.cleanUp('wrapper1')
  expect(document.getElementById('paper')).toBeDefined()
  expect(document.getElementById('wrapper1')).toBeDefined()
  expect(document.getElementById('wrapper2')).toBeDefined()
  expect(document.getElementById('wrapper11')).toBeNull()
  expect(document.getElementById('wrapper12')).toBeNull()

  Utils.cleanUp('paper')
  expect(document.getElementById('paper')).toBeDefined()
  expect(document.getElementById('wrapper1')).toBeNull()
  expect(document.getElementById('wrapper2')).toBeNull()
  expect(document.getElementById('wrapper11')).toBeNull()
  expect(document.getElementById('wrapper12')).toBeNull()
})

// =========================================================================
// Tests for calculatePositionWithoutOverlapping
// =========================================================================

// Helper: compute MIN_ANGLE for given parameters
function getMinAngle(collisionRadius, circleRadius) {
  return (2 * collisionRadius / circleRadius) * (180 / Math.PI);
}

// Helper: check all adjacent pairs have at least MIN_ANGLE separation
function verifyNoOverlap(result, collisionRadius, circleRadius) {
  const minAngle = getMinAngle(collisionRadius, circleRadius);
  const angles = Object.values(result).sort((a, b) => a - b);
  for (let i = 0; i < angles.length - 1; i++) {
    const diff = angles[i + 1] - angles[i];
    if (diff < minAngle - 0.1) { // 0.1° tolerance
      return { pass: false, diff, minAngle, i };
    }
  }
  // Wrap-around check
  if (angles.length > 1) {
    const wrapDiff = (angles[0] + 360) - angles[angles.length - 1];
    if (wrapDiff < minAngle - 0.1) {
      return { pass: false, diff: wrapDiff, minAngle, i: 'wrap' };
    }
  }
  return { pass: true };
}

test('calculatePositionWithoutOverlapping - well separated planets stay near original', () => {
  const points = [
    { name: 'Sun', angle: 10 },
    { name: 'Moon', angle: 90 },
    { name: 'Mars', angle: 200 },
  ];
  const collisionRadius = 12;
  const circleRadius = 270;

  const result = Utils.calculatePositionWithoutOverlapping(points, collisionRadius, circleRadius);

  expect(Object.keys(result)).toHaveLength(3);
  // Each planet should remain close to its original angle (< 2°)
  expect(Math.abs(result['Sun'] - 10)).toBeLessThan(2);
  expect(Math.abs(result['Moon'] - 90)).toBeLessThan(2);
  expect(Math.abs(result['Mars'] - 200)).toBeLessThan(2);
});

test('calculatePositionWithoutOverlapping - tight conjunction: no overlap', () => {
  // 3 planets at the exact same angle
  const points = [
    { name: 'Sun', angle: 100 },
    { name: 'Moon', angle: 100 },
    { name: 'Mercury', angle: 100 },
  ];
  const collisionRadius = 12;
  const circleRadius = 270;

  const result = Utils.calculatePositionWithoutOverlapping(points, collisionRadius, circleRadius);

  expect(Object.keys(result)).toHaveLength(3);
  const check = verifyNoOverlap(result, collisionRadius, circleRadius);
  expect(check.pass).toBe(true);
});

test('calculatePositionWithoutOverlapping - wrap-around near 360/0', () => {
  const points = [
    { name: 'Sun', angle: 358 },
    { name: 'Moon', angle: 1 },
  ];
  const collisionRadius = 12;
  const circleRadius = 270;

  const result = Utils.calculatePositionWithoutOverlapping(points, collisionRadius, circleRadius);

  expect(Object.keys(result)).toHaveLength(2);
  const check = verifyNoOverlap(result, collisionRadius, circleRadius);
  expect(check.pass).toBe(true);
});

test('calculatePositionWithoutOverlapping - stellium of 6 planets', () => {
  const points = [
    { name: 'Sun', angle: 50 },
    { name: 'Moon', angle: 51 },
    { name: 'Mercury', angle: 52 },
    { name: 'Venus', angle: 53 },
    { name: 'Mars', angle: 54 },
    { name: 'Jupiter', angle: 55 },
  ];
  const collisionRadius = 12;
  const circleRadius = 270;

  const result = Utils.calculatePositionWithoutOverlapping(points, collisionRadius, circleRadius);

  expect(Object.keys(result)).toHaveLength(6);
  const check = verifyNoOverlap(result, collisionRadius, circleRadius);
  expect(check.pass).toBe(true);
});

test('calculatePositionWithoutOverlapping - empty input', () => {
  const result = Utils.calculatePositionWithoutOverlapping([], 12, 270);
  expect(result).toEqual({});
});

test('calculatePositionWithoutOverlapping - single point', () => {
  const result = Utils.calculatePositionWithoutOverlapping(
    [{ name: 'Sun', angle: 45 }], 12, 270
  );
  expect(Object.keys(result)).toHaveLength(1);
  expect(Math.abs(result['Sun'] - 45)).toBeLessThan(1);
});

