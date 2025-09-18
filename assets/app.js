// ====== Elementen ======
const selects = {
  ingredient: document.getElementById('f-ingredient'),
  sfeer: document.getElementById('f-sfeer'),
  dieet: document.getElementById('f-dieet'),
  prep: document.getElementById('f-prep')
};
const grid = document.getElementById('grid');
const cards = Array.from(grid.querySelectorAll('.card'));
const emptyState = document.getElementById('emptyState');
const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');

// ====== Helpers ======
function getSelectedValues(selectEl){
  // Werkt voor zowel single- als multi-select; bij single komt er 0 of 1 value uit
  if (!selectEl) return [];
  if (selectEl.multiple) {
    return Array.from(selectEl.selectedOptions).map(o => (o.value || '').toLowerCase().trim());
  }
  const val = (selectEl.value || '').toLowerCase().trim();
  return val ? [val] : [];
}

// ====== Filter check ======
function matchesFilters(card){
  // Gekozen filters
  const ingSelected = getSelectedValues(selects.ingredient); // array (multi)
  const sfeerSel = (selects.sfeer.value || '').trim().toLowerCase();
  const dieetSel = (selects.dieet.value || '').trim().toLowerCase();
  const prepSel = (selects.prep.value || '').trim();
  const q = (searchInput.value || '').trim().toLowerCase();

  // Data op de kaart
  const ingredients = JSON.parse(card.dataset.ingredients || '[]').map(s => (s || '').toLowerCase());
  const sfeer = (card.dataset.sfeer || '').toLowerCase();
  const dieet = (card.dataset.dieet || '').toLowerCase();
  const prep = Number(card.dataset.prep || 0);
  const title = (card.dataset.title || '').toLowerCase();

  // Ingrediënten: AND-logica → elk gekozen ingrediënt moet aanwezig zijn
  const ingOK = ingSelected.length === 0 || ingSelected.every(v => ingredients.includes(v));
  const sfeerOK = !sfeerSel || sfeer === sfeerSel;
  const dieetOK = !dieetSel || dieet === dieetSel;
  const prepOK = !prepSel || (prep && prep <= Number(prepSel));

  // Vrije zoek: match in titel, ingrediënten, sfeer, dieet of prep-waarde
  const haystack = [title, ...ingredients, sfeer, dieet, String(prep)];
  const searchOK = !q || haystack.some(s => (s || '').includes(q));

  return ingOK && sfeerOK && dieetOK && prepOK && searchOK;
}

// ====== Toepassen van filters ======
function applyFilters(){
  let visible = 0;
  cards.forEach(card => {
    if (matchesFilters(card)) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  emptyState.classList.toggle('show', visible === 0);
}

// ====== Event listeners ======
// Luister naar zowel 'change' als 'input' (zeker bij multi-select handig)
Object.values(selects).forEach(sel => {
  if (!sel) return;
  sel.addEventListener('change', applyFilters);
  sel.addEventListener('input', applyFilters);
});

// Live zoeken
searchInput.addEventListener('input', applyFilters);

// Toggle zoekveld
searchToggle.addEventListener('click', () => {
  const show = !searchInput.classList.contains('show');
  searchInput.classList.toggle('show', show);
  if (show) {
    searchInput.focus();
  } else {
    searchInput.value = '';
    applyFilters();
  }
});

// ====== Init ======
applyFilters();
