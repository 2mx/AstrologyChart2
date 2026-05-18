// Aspect definitions (angles only)
const A = {
    Conjunction:  { name: "Conjunction",  angle: 0   },
    Opposition:   { name: "Opposition",   angle: 180 },
    Trine:        { name: "Trine",        angle: 120 },
    Square:       { name: "Square",       angle: 90  },
    Sextile:      { name: "Sextile",      angle: 60  },
    Quincunx:     { name: "Quincunx",     angle: 150 },
    Semisextile:  { name: "Semisextile",  angle: 30  },
    Quintile:     { name: "Quintile",     angle: 72  },
    Trioctile:    { name: "Trioctile",    angle: 135 },
    Semisquare:   { name: "Semisquare",   angle: 45  },
}

// Major aspects - Used by AspectUtils.isMajor()
export const MAJOR_ASPECT_ANGLES = new Set([0, 60, 90, 120, 180])

// Aspect catalogs by context
export const ORBS_ASPECTS_NATAL = [
    { ...A.Conjunction,  orb: 8 },
    { ...A.Opposition,   orb: 8 },
    { ...A.Trine,        orb: 6 },
    { ...A.Square,       orb: 6 },
    { ...A.Sextile,      orb: 4 },
    { ...A.Quincunx,     orb: 2 },
    { ...A.Semisextile,  orb: 1 },
    { ...A.Quintile,     orb: 1 },
    { ...A.Trioctile,    orb: 1 },
    { ...A.Semisquare,   orb: 1 },
]

export const ORBS_ASPECTS_TRANSIT = [
    { ...A.Conjunction,  orb: 4 },
    { ...A.Opposition,   orb: 4 },
    { ...A.Trine,        orb: 3 },
    { ...A.Square,       orb: 3 },
    { ...A.Sextile,      orb: 2 },
    { ...A.Quincunx,     orb: 1 },
    { ...A.Semisextile,  orb: 1 },
    { ...A.Quintile,     orb: 1 },
    { ...A.Trioctile,    orb: 1 },
    { ...A.Semisquare,   orb: 1 },
]

export const ORBS_ASPECTS_SYNASTRY = [
    { ...A.Conjunction,  orb: 6 },
    { ...A.Opposition,   orb: 6 },
    { ...A.Trine,        orb: 5 },
    { ...A.Square,       orb: 5 },
    { ...A.Sextile,      orb: 3 },
    { ...A.Quincunx,     orb: 2 },
    { ...A.Semisextile,  orb: 1 },
    { ...A.Quintile,     orb: 1 },
    { ...A.Trioctile,    orb: 1 },
    { ...A.Semisquare,   orb: 1 },
]

// Display filter: "major" | "minor" | "all" | ["Conjunction", "Trine", ...]
export const ASPECTS_DISPLAY = "major"

// Backward compatibility
export const DEFAULT_ASPECTS = ORBS_ASPECTS_NATAL

export const ASPECTS_ID = "aspects"
export const DRAW_ASPECTS = true
export const ASPECTS_FONT_SIZE = 18
