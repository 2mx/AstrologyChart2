# TODO: Correction de l'alignement de la règle (ruler)

## Problème
Actuellement, dans `RadixChart.js` et `TransitChart.js`, la fonction `#drawRuler()` commence le dessin des graduations à partir de l'angle de l'Ascendant (`getAscendantShift()`). 

Cela signifie que le premier grand trait de la règle est toujours aligné sur l'Ascendant, ce qui rend impossible la lecture des degrés réels du zodiaque (ex: 0°, 5°, 10° d'un signe) si l'Ascendant n'est pas lui-même à 0° d'un signe.

## Solution
La règle doit être graduée en fonction du 0° du zodiaque (Bélier), tout en conservant le décalage visuel (shift) pour que l'Ascendant reste à la position conventionnelle (gauche/180°).

### Modifications à apporter :
Dans `src/charts/RadixChart.js` et `src/charts/TransitChart.js` :
1.  Modifier la boucle dans `#drawRuler()` pour qu'elle itère sur les degrés du zodiaque (0 à 360 par pas de 5).
2.  Utiliser `Utils.degreeToRadian(angleZodiaque, this.getAscendantShift())` pour calculer la position visuelle de chaque trait.

### Code cible (exemple pour RadixChart) :
```javascript
#drawRuler() {
    const NUMBER_OF_DIVIDERS = 72
    const STEP = 5
    const shift = this.getAscendantShift()

    const wrapper = SVGUtils.SVGGroup()
    wrapper.classList.add('c-radix-ruler')

    for (let i = 0; i < NUMBER_OF_DIVIDERS; i++) {
        let zodiacDegree = i * STEP
        let visualAngle = Utils.degreeToRadian(zodiacDegree, shift)
        
        let startPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, this.getRullerCircleRadius(), visualAngle)
        let endPoint = Utils.positionOnCircle(this.#centerX, this.#centerY, (i % 2) ? this.getInnerCircleRadius() - ((this.getInnerCircleRadius() - this.getRullerCircleRadius()) / 2) : this.getInnerCircleRadius(), visualAngle)
        
        const line = SVGUtils.SVGLine(startPoint.x, startPoint.y, endPoint.x, endPoint.y);
        // ... réglages stroke ...
        wrapper.appendChild(line);
    }
    // ... reste de la fonction ...
}
```

## Fichiers concernés
- `src/charts/RadixChart.js`
- `src/charts/TransitChart.js`
