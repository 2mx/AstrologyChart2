/**
 * @class
 * @classdesc Utility class
 * @public
 * @static
 * @hideconstructor
 */
class Utils {

    constructor() {
        if (this instanceof Utils) {
            throw Error('This is a static class and cannot be instantiated.');
        }
    }

    static DEG_360 = 360
    static DEG_180 = 180
    static DEG_0 = 0

    /**
     * Generate random ID
     *
     * @static
     * @return {String}
     */
    static generateUniqueId = function () {
        const randomNumber = Math.random() * 1000000;
        const timestamp = Date.now();
        return `id_${randomNumber}_${timestamp}`;
    }

    /**
     * Inverted degree to radian
     * @static
     *
     * @param {Number} angleIndegree
     * @param {Number} shiftInDegree
     * @return {Number}
     */
    static degreeToRadian = function (angleInDegree, shiftInDegree = 0) {
        return (shiftInDegree - angleInDegree) * Math.PI / 180
    }

    /**
     * Converts radian to degree
     * @static
     *
     * @param {Number} radian
     * @return {Number}
     */
    static radianToDegree = function (radian) {
        return (radian * 180 / Math.PI)
    }

    /**
     * Calculates a position of the point on the circle.
     *
     * @param {Number} cx - center x
     * @param {Number} cy - center y
     * @param {Number} radius - circle radius
     * @param {Number} angleInRadians
     *
     * @return {Object} - {x:Number, y:Number}
     */
    static positionOnCircle(cx, cy, radius, angleInRadians) {
        return {
            x: (radius * Math.cos(angleInRadians) + cx),
            y: (radius * Math.sin(angleInRadians) + cy)
        };
    }

    /**
     * Calculates the angle between the line (2 points) and the x-axis.
     *
     * @param {Number} x1
     * @param {Number} y1
     * @param {Number} x2
     * @param {Number} y2
     *
     * @return {Number} - degree
     */
    static positionToAngle(x1, y1, x2, y2) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angleInRadians = Math.atan2(dy, dx);
        return Utils.radianToDegree(angleInRadians)
    }

    /**
     * Calculates new position of points on circle without overlapping each other.
     * Iterative version to avoid "Stack Overflow" and improve distribution.
     *
     * @param {Array} points - [{name:"a", angle:10}, {name:"b", angle:20}]
     * @param {Number} collisionRadius - point radius
     * @param {Number} circleRadius - circle radius
     * @return {Object} - {"Moon":30, "Sun":60, "Mercury":86, ...}
     */
    static calculatePositionWithoutOverlapping(points, collisionRadius, circleRadius) {
        if (!points || points.length === 0) return {};

        const MAX_ITERATIONS = 300;
        const DAMPING = 0.8;
        // Convert physical symbol radius to minimum angular gap
        const MIN_ANGLE = (2 * collisionRadius / circleRadius) * (180 / Math.PI);

        // 1. Find an empty starting point to "open" the circle and handle the 360/0 transition
        const cellWidth = 10;
        const numberOfCells = Utils.DEG_360 / cellWidth;
        const frequency = new Array(numberOfCells).fill(0);
        for (const point of points) {
            const index = Math.floor(point.angle / cellWidth);
            frequency[index] += 1;
        }
        const emptyCellIndex = frequency.findIndex(count => count === 0);
        const START_ANGLE = emptyCellIndex === -1 ? 0 : cellWidth * emptyCellIndex;

        // 2. Data preparation and priority hierarchy
        const fastPlanets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'];

        let data = points.map(p => {
            let angle = p.angle;
            // Normalize relative to the empty starting point to treat the circle linearly
            if (angle < START_ANGLE) angle += Utils.DEG_360;

            return {
                name: p.name,
                originalAngle: angle,
                currentAngle: angle,
                weight: fastPlanets.includes(p.name) ? 2.0 : 1.0,
                velocity: 0
            };
        });

        // Sort linearly
        data.sort((a, b) => a.currentAngle - b.currentAngle);

        // 3. Iterative solver (Force-directed logic)
        for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
            let maxShift = 0;

            for (let i = 0; i < data.length; i++) {
                let force = 0;

                // Collision force with neighbors
                if (i > 0) {
                    let diff = data[i].currentAngle - data[i - 1].currentAngle;
                    if (diff < MIN_ANGLE) {
                        force += (MIN_ANGLE - diff) * 0.5;
                    }
                }
                if (i < data.length - 1) {
                    let diff = data[i + 1].currentAngle - data[i].currentAngle;
                    if (diff < MIN_ANGLE) {
                        force -= (MIN_ANGLE - diff) * 0.5;
                    }
                }

                // Return force to original position (Hooke's Law)
                let springForce = (data[i].originalAngle - data[i].currentAngle) * 0.1 * data[i].weight;
                force += springForce;

                data[i].velocity = (data[i].velocity + force) * DAMPING;
                data[i].currentAngle += data[i].velocity;

                maxShift = Math.max(maxShift, Math.abs(data[i].velocity));
            }

            // Early exit if the system is stable
            if (maxShift < 0.01) break;
        }

        // 4. Return results normalized back to 0-360
        return data.reduce((accumulator, point) => {
            let finalAngle = point.currentAngle;
            if (finalAngle >= Utils.DEG_360) finalAngle -= Utils.DEG_360;
            accumulator[point.name] = finalAngle;
            return accumulator;
        }, {});
    }

    /**
     * Check if the angle collides with the points
     *
     * @param {Number} angle
     * @param {Array} anglesList
     * @param {Number} [collisionRadius]
     *
     * @return {Boolean}
     */
    static isCollision(angle, anglesList, collisionRadius = 10) {

        const pointInCollision = anglesList.find(point => {

            let a = (point - angle) > Utils.DEG_180 ? angle + Utils.DEG_360 : angle
            let p = (angle - point) > Utils.DEG_180 ? point + Utils.DEG_360 : point

            return Math.abs(a - p) <= collisionRadius
        })

        return pointInCollision !== undefined
    }


    /**
     * Removes the content of an element
     *
     * @param {String} elementID
     * @param {Function} [beforeHook]
     *
     * @warning - It removes Event Listeners too.
     * @warning - You will (probably) get memory leak if you delete elements that have attached listeners
     */
    static cleanUp(elementID, beforeHook) {
        let elm = document.getElementById(elementID)
        if (! elm) {
            return
        }

        (typeof beforeHook === 'function') && beforeHook()

        elm.innerHTML = ""
    }


    /**
     * Simple code for config based template strings
     *
     * @param templateString
     * @param templateVars
     * @returns {*}
     */
    static fillTemplate = function (templateString, templateVars) {
        let func = new Function(...Object.keys(templateVars), "return `" + templateString + "`;")
        return func(...Object.values(templateVars));
    }
}


export {
    Utils as
        default
}

