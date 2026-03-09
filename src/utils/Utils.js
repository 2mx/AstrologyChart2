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
 * Corrigé : Suppression de la récursion pour éviter le crash "Stack Overflow".
 * Utilise une projection de contrainte dure (hard constraint) pour garantir MIN_ANGLE.
 *
 * @param {Array} points - [{name:"a", angle:10}, {name:"b", angle:20}]
 * @param {Number} collisionRadius - point radius (s.r)
 * @param {Number} circleRadius - circle radius (Circle.r)
 * @return {Object} - {"Moon":30, "Sun":60, "Mercury":86,...}
 */
    static calculatePositionWithoutOverlapping(points, collisionRadius, circleRadius) {
        if (!points || points.length === 0) return {};

        const MAX_ITERATIONS = 300;
        const RECALL_STRENGTH = 0.05;
        const CONSTRAINT_PASSES = 5; // Nombre de passes de contrainte par itération
        // Conversion du rayon physique du symbole en écart angulaire minimum
        const MIN_ANGLE = (2 * collisionRadius / circleRadius) * (180 / Math.PI);

        // 1. Trouver un point de départ vide pour "ouvrir" le cercle et gérer le passage 360/0
        const cellWidth = 10;
        const numberOfCells = Utils.DEG_360 / cellWidth;
        const frequency = new Array(numberOfCells).fill(0);
        for (const point of points) {
            const index = Math.floor(point.angle / cellWidth);
            frequency[index] += 1;
        }
        const emptyCellIndex = frequency.findIndex(count => count === 0);
        const START_ANGLE = emptyCellIndex === -1 ? 0 : cellWidth * emptyCellIndex;

        // 2. Préparation des données et hiérarchie de priorité (Poids)
        // On privilégie les planètes rapides qui doivent rester proches de leur longitude réelle
        const fastPlanets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'];

        let data = points.map(p => {
            let angle = p.angle;
            // Normalisation par rapport au point de départ vide pour traiter le cercle linéairement
            if (angle < START_ANGLE) angle += Utils.DEG_360;

            return {
                name: p.name,
                originalAngle: angle,
                currentAngle: angle,
                // Poids : les planètes rapides ont une force de rappel 2x plus forte
                weight: fastPlanets.includes(p.name) ? 2.0 : 1.0,
            };
        });

        // Tri initial et DÉFINITIF par angle original pour éviter le croisement des traits de rappel
        data.sort((a, b) => a.originalAngle - b.originalAngle);

        // 3. Boucle de résolution : Recall + Projection de contrainte dure
        for (let iter = 0; iter < MAX_ITERATIONS; iter++) {
            let maxMovement = 0;

            // A) Force d'attraction vers la longitude astronomique originale (Recall force)
            for (let i = 0; i < data.length; i++) {
                const s = data[i];
                const recall = s.originalAngle - s.currentAngle;
                const movement = recall * RECALL_STRENGTH * s.weight;
                s.currentAngle += movement;
                maxMovement = Math.max(maxMovement, Math.abs(movement));
            }

            // B) Projection de contrainte dure : on force MIN_ANGLE entre voisins
            //    Plusieurs passes pour propager la contrainte dans les stelliums
            for (let pass = 0; pass < CONSTRAINT_PASSES; pass++) {
                // Passe avant (gauche → droite)
                for (let i = 0; i < data.length - 1; i++) {
                    const s1 = data[i];
                    const s2 = data[i + 1];
                    const diff = s2.currentAngle - s1.currentAngle;

                    if (diff < MIN_ANGLE) {
                        const overlap = MIN_ANGLE - diff;
                        const totalWeight = s1.weight + s2.weight;

                        // Répartition inversement proportionnelle au poids
                        s1.currentAngle -= overlap * (s2.weight / totalWeight);
                        s2.currentAngle += overlap * (s1.weight / totalWeight);

                        maxMovement = Math.max(maxMovement, overlap);
                    }
                }

                // Passe arrière (droite → gauche) pour propager uniformément
                for (let i = data.length - 2; i >= 0; i--) {
                    const s1 = data[i];
                    const s2 = data[i + 1];
                    const diff = s2.currentAngle - s1.currentAngle;

                    if (diff < MIN_ANGLE) {
                        const overlap = MIN_ANGLE - diff;
                        const totalWeight = s1.weight + s2.weight;

                        s1.currentAngle -= overlap * (s2.weight / totalWeight);
                        s2.currentAngle += overlap * (s1.weight / totalWeight);

                        maxMovement = Math.max(maxMovement, overlap);
                    }
                }

                // Wrap-around (entre le dernier et le premier)
                if (data.length > 1) {
                    const first = data[0];
                    const last = data[data.length - 1];
                    const diff = (first.currentAngle + Utils.DEG_360) - last.currentAngle;

                    if (diff < MIN_ANGLE) {
                        const overlap = MIN_ANGLE - diff;
                        const totalWeight = first.weight + last.weight;

                        last.currentAngle -= overlap * (first.weight / totalWeight);
                        first.currentAngle += overlap * (last.weight / totalWeight);

                        maxMovement = Math.max(maxMovement, overlap);
                    }
                }
            }

            // Si le système est stable (recall et contraintes satisfaits)
            if (maxMovement < 0.01) break;
        }

        // 4. Denormalisation et formatage du résultat
        return data.reduce((accumulator, p) => {
            // Remise de l'angle dans l'intervalle [0, 360[
            let finalAngle = p.currentAngle % Utils.DEG_360;
            if (finalAngle < 0) finalAngle += Utils.DEG_360;

            accumulator[p.name] = finalAngle;
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
     * Calculates intersection on bounding box of the symbol to prevent line crossing or undershooting
     *
     * @param {Object} startPos - {x:Number, y:Number}
     * @param {Object} endPos - {x:Number, y:Number}
     * @param {Number} fontSize - Symbol font size
     *
     * @return {Object} - {x:Number, y:Number}
     */
    static getAdjustedPointerLineDestination(startPos, endPos, fontSize) {
        const rectWidth = fontSize * 0.8;
        const rectHeight = fontSize * 0.8;
        const cx = endPos.x;
        const cy = endPos.y;

        let dx = startPos.x - cx;
        let dy = startPos.y - cy;
        const len = Math.sqrt(dx * dx + dy * dy);

        if (len > 0) {
            dx /= len;
            dy /= len;

            const halfW = rectWidth / 2;
            const halfH = rectHeight / 2;
            const tx = (dx !== 0) ? halfW / Math.abs(dx) : Infinity;
            const ty = (dy !== 0) ? halfH / Math.abs(dy) : Infinity;
            const t = Math.min(tx, ty);

            return {
                x: cx + dx * t,
                y: cy + dy * t
            };
        }

        return { x: cx, y: cy };
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
        if (!elm) {
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

