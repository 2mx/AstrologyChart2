# Refactor Main Axis Description

## Problématique
En mode transit (32 niveaux), les axes principaux (As, Mc, Ds, Ic) du thème natal ne s'affichaient plus correctement. Ils étaient soit trop courts (s'arrêtant au cercle intérieur), soit redoublés de manière erronée par le `TransitChart`.

## Changements effectués
- **RadixChart.js** : Restauration du comportement d'origine. Les axes cardinaux utilisent désormais toujours le rayon complet (`getRadius()`), qu'il y ait 24 ou 32 niveaux. Cela permet aux axes natals de traverser tout le graphique jusqu'au bord extérieur, servant de repère stable même en vue Transit.
- **TransitChart.js** : Suppression de la méthode `#drawMainAxisDescription`. Cette méthode était redondante car elle tentait de dessiner des axes de transit spécifiques par-dessus les axes natals, avec un positionnement et des alignements de symboles incorrects.

## Résultat attendu
Le graphique affiche désormais les quatre axes cardinaux du thème natal traversant l'intégralité du cercle (Radix + Transit), avec les symboles (As, Mc, etc.) correctement alignés à l'extérieur du cercle des transits, comme dans la version stable précédente.
