// ══════════════════════════════════════════════════════════════════════
//  TARIFS DOMAINE ROSALINA — FICHIER UNIQUE
// ══════════════════════════════════════════════════════════════════════
//
//  Toutes les pages lisent ce fichier :
//    dashboard.html · devis_rapide.html · devis_perso.html · devis_rosalina.html
//  → Changer un prix ICI le change partout (calendrier, grilles, devis, emails).
//
//  COMMENT MODIFIER
//  ─────────────────
//  1. Prix par nuit .......... bloc TARIFS (basse / haute saison)
//  2. Prix exceptionnels ..... bloc PRIX_SPECIAUX
//                              une ligne = 'AAAA-MM-JJ': prix
//                              (vaut pour cette date précise uniquement, cette année-là)
//  3. Ménage ................. bloc MENAGE (forfait fin de séjour)
//  4. Taxe de séjour ......... TAXE_SEJOUR (€ par adulte et par nuit)
//  5. Caution ................ bloc CAUTION
//  6. Dates des saisons ...... fonction getSaison (en bas)
//
//  Règles d'écriture : nombres sans espace ni € (1400, pas "1 400 €"),
//  décimales avec un point (1.65), une virgule à la fin de chaque ligne.
//
//  ⚠️ Après modification : pousser sur GitHub, puis changer le numéro ?v=
//     dans les 4 pages (sinon les navigateurs gardent l'ancien fichier en cache).
//     Si c'est Claude qui modifie, il s'en charge.
// ══════════════════════════════════════════════════════════════════════


// 1. PRIX PAR NUIT
const TARIFS = {
  ROSALINA: { basse: 1100, haute: 1200 },
  ROSA:     { basse: 900,  haute: 1000 },
  LINA:     { basse: 400,  haute: 500  },
};

// 2. PRIX EXCEPTIONNELS (prioritaires sur la saison)
const PRIX_SPECIAUX = {
  ROSALINA: {
    '2026-12-30': 1400,
    '2026-12-31': 1400,
  },
  ROSA: {
    '2026-12-30': 1200,
    '2026-12-31': 1200,
  },
  LINA: {
    '2026-12-30': 600,
    '2026-12-31': 600,
  },
};

// 3. MÉNAGE (forfait par séjour)
const MENAGE = {
  ROSALINA: 300,
  ROSA:     250,
  LINA:     150,
};

// 4. TAXE DE SÉJOUR (€ par adulte et par nuit)
const TAXE_SEJOUR = 1.65;

// 5. CAUTION
const CAUTION = {
  ROSALINA: 1500,
  ROSA:     1000,
  LINA:     600,
};

// 6. SAISONS
// Haute : 1er avril → 31 août, et 22 décembre → 4 janvier. Le reste : basse.
function getSaison(date) {
  const m = date.getMonth() + 1, d = date.getDate();
  if (m >= 4 && m <= 8) return 'haute';
  if (m === 12 && d >= 22) return 'haute';
  if (m === 1 && d <= 4) return 'haute';
  return 'basse';
}


// ── Fonctions utilisées par les pages (ne pas modifier) ──────────────
function normMaison(maison) {
  const M = String(maison || 'ROSALINA').toUpperCase();
  return M === 'ROSA-LINA' ? 'ROSALINA' : (TARIFS[M] ? M : 'ROSALINA');
}
function getPrixNuit(maison, date) {
  const M = normMaison(maison);
  const key = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  if (PRIX_SPECIAUX[M] && PRIX_SPECIAUX[M][key] != null) return PRIX_SPECIAUX[M][key];
  return TARIFS[M][getSaison(date)];
}
function fmtTarif(n) {
  return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }) + ' €';
}
