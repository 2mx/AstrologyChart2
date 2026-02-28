# Correction et Distribution des Planètes

**Date initiale :** 21 Février 2026

Ce document centralise les modifications et corrections apportées au placement des planètes et à l'affichage de leurs traits de rappel sur les cartes (Radix et Transit).

## 1. Problèmes initiaux constatés
L'affichage des cartes astrologiques présentait des anomalies visuelles importantes concernant les traits de rappel (pointers) qui relient la position exacte d'une planète sur le cadran à son symbole :
- La Lune n'avait plus son trait de rappel.
- Un trait de rappel orphelin très grand traversait la carte sans qu'aucune planète n'y soit attachée.
- Plusieurs autres planètes pouvaient voir leurs traits mal orientés ou ignorés.

## 2. Origine des Bugs (Coordonnées) et Corrections

Après analyse du code source, deux problèmes distincts causant ces bugs ont été corrigés :

### A. Coordonnées Y erronées dans les cartes (Affichage)
Dans les classes `RadixChart` et `TransitChart`, lors de la boucle dessinant les planètes (`#drawPoints`), la position sur le cercle était calculée en utilisant deux fois la coordonnée `X` du centre de la carte, au lieu de combiner `X` et `Y`.

**Fichiers affectés :** 
- `src/charts/RadixChart.js`
- `src/charts/TransitChart.js`

**Correction :** 
Remplacement des appels erronés `Utils.positionOnCircle(this.#centerX, this.#centerX, ...)` par `Utils.positionOnCircle(this.#centerX, this.#centerY, ...)`.

### B. Algorithme de distribution sans valeur de retour (Utils)
La fonction statique `Utils.calculatePositionWithoutOverlapping()` avait été mise à jour vers une version force-directed, mais la toute dernière étape de son algorithme était incomplète. Le `reduce` final n'assignait pas l'angle final au tableau d'accumulation, retournant systématiquement un objet vide `{}`.
En retournant un dictionnaire vide, les classes d'affichage lisaient `undefined` pour la longitude des planètes qui entraient en collision, résultant en des coordonnées `NaN` (Not a Number) qui cassaient silencieusement les éléments SVG (`<line>` et `<text>`).

**Fichier affecté :**
- `src/utils/Utils.js`

**Correction :**
Restauration de la logique de calcul de l'angle final (dénormalisation) telle que décrite dans la spécification `@devdoc/algorithme-distribution-planets.md`.

## 3. Problème d'espacement (chevauchement) et croisement des traits de rappel

### C. Contraintes de collision et ordre des planètes
Suite aux premières corrections, il s'est avéré que l'algorithme ne garantissait pas un espacement suffisant entre les planètes très proches, menant à des chevauchements de symboles (overlapping). De plus, lorsque les forces de répulsion poussaient les planètes, elles pouvaient échanger leurs positions relatives sur le cercle, ce qui provoquait un croisement inesthétique de leurs traits de rappel. L'une se retrouvant projetée à l'opposé de sa vraie place.

**Fichiers affectés :**
- `src/utils/Utils.js`
- `devdoc/algorithme-distribution-planets.md`

**Corrections :**
- L'algorithme a été amélioré avec une résolution stricte de collision entre voisins immédiats (au lieu d'un calcul de répulsion contre l'ensemble du groupe). La distance angulaire entre chaque voisine (après tri initial) est vérifiée contre le seuil `MIN_ANGLE`, et une poussée réparatrice inversement proportionnelle à leur poids (weight) s'applique jusqu'à supprimer l'overlap.
- Un tri définitif basé sur l'angle astronomique original (`originalAngle`) a été mis en place avant la boucle de physique. Puisque les planètes ne résolvent leurs collisions que de proche en proche sans pouvoir se "sauter" par dessus, leur ordre circulaire reste toujours identique à l'ordre naturel. Les planètes sont écartées en bon ordre et les traits ne se croisent donc plus jamais.

## 4. Résultat Global
L'application de l'ensemble de ces correctifs rétablit un placement clair, propre et sans collision dans le DOM SVG. Les chevauchements sont impossibles et tous les traits de rappel relient fidèlement les repères astrologiques aux planètes.
