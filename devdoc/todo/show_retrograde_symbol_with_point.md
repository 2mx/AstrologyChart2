Je voudrais ajouter la possibilité d'ajouter le symbole rétrograde aux planètes si la constante POINT_RETROGRADE_SHOW = true. Constante qui sera définie dans le fichier src/settings/constants/Point.js

Le symbole rétrograde devra être contenu dans le même élément qui contient la planète avec les données data (data-symbol) afin que l'élément soit traité comme une même unité lors des interactions javascript ou css (par exemple un changement d'opacité).

Le symbole rétrograde devra être plus petit et sera placé au pied du symbole de la planète avec un offset en fonction de celle ci

retrogradeOffset: {
    Mercury: 2,
    Venus: 0,
    Mars: -6,
    Jupiter: -1,
    Saturn: -5,
    Uranus: -2,
    Neptune: -2,
    Pluto: -1,
    Chiron: 0,
    Lilith: 2,
    NNode: 6,
    SNode: 6
  }