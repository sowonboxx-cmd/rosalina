// ══════════════════════════════════════════════════════════════
//  TARIFS DOMAINE ROSALINA — source unique
//  Utilisé par : dashboard.html, devis_rapide.html, devis_perso.html, devis_rosalina.html
//  Modifier les prix ICI uniquement : toutes les pages se mettent à jour.
// ══════════════════════════════════════════════════════════════

// Prix par nuit selon la saison
const TARIFS = {
  ROSALINA: { basse: 1100, haute: 1200 },
  ROSA:     { basse: 900,  haute: 1000 },
  LINA:     { basse: 400,  haute: 500  },
};

// Prix spéciaux pour une date précise (prioritaires sur la saison)
// Format : 'AAAA-MM-JJ' : prix par nuit
const PRIX_SPECIAUX = {
  ROSALINA: { '2026-12-30': 1400, '2026-12-31': 1400 },
  ROSA:     { '2026-12-30': 1200, '2026-12-31': 1200 },
  LINA:     { '2026-12-30': 600,  '2026-12-31': 600  },
};

// Haute saison : 1er avril → 31 août, et 22 décembre → 4 janvier. Le reste : basse saison.
function getSaison(date) {
  const m = date.getMonth() + 1, d = date.getDate();
  if (m >= 4 && m <= 8) return 'haute';
  if (m === 12 && d >= 22) return 'haute';
  if (m === 1 && d <= 4) return 'haute';
  return 'basse';
}

// Accepte 'ROSALINA' / 'ROSA' / 'LINA' (et 'rosa-lina' = ROSALINA)
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
