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
const clearBtn = document.getElementById('clearFilters');

// ====== Helpers ======
function getSelectedValues(selectEl){
  if (!selectEl) return [];
  if (selectEl.multiple) {
    return Array.from(selectEl.selectedOptions)
      .map(o => (o.value || '').toLowerCase().trim())
      .filter(Boolean);
  }
  const v = (selectEl.value || '').toLowerCase().trim();
  return v ? [v] : [];
}

// ====== Filter check ======
function matchesFilters(card){
  const ingSelected = getSelectedValues(selects.ingredient); // AND
  const sfeerSelected = getSelectedValues(selects.sfeer);    // OR
  const dieetSelected = getSelectedValues(selects.dieet);    // OR
  const prepSelected  = getSelectedValues(selects.prep)
                        .map(n => Number(n)).filter(n => !Number.isNaN(n));
  const q = (searchInput.value || '').trim().toLowerCase();

  const ingredients = JSON.parse(card.dataset.ingredients || '[]').map(s => (s || '').toLowerCase());
  const sfeer = (card.dataset.sfeer || '').toLowerCase();
  const dieet = (card.dataset.dieet || '').toLowerCase();
  const prep = Number(card.dataset.prep || 0);
  const title = (card.dataset.title || '').toLowerCase();

  const ingOK = ingSelected.length === 0 || ingSelected.every(v => ingredients.includes(v));
  const sfeerOK = sfeerSelected.length === 0 || sfeerSelected.includes(sfeer);
  const dieetOK = dieetSelected.length === 0 || dieetSelected.includes(dieet);
  const prepOK = prepSelected.length === 0 || prepSelected.some(max => prep && prep <= max);

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
Object.values(selects).forEach(sel => {
  if (!sel) return;
  sel.addEventListener('change', applyFilters);
  sel.addEventListener('input', applyFilters);
});

searchInput.addEventListener('input', applyFilters);

searchToggle?.addEventListener('click', () => {
  const show = !searchInput.classList.contains('show');
  searchInput.classList.toggle('show', show);
  if (show) {
    searchInput.focus();
  } else {
    searchInput.value = '';
    applyFilters();
  }
});

clearBtn?.addEventListener('click', () => {
  Object.values(selects).forEach(sel => {
    if (!sel) return;
    if (sel.multiple) {
      Array.from(sel.options).forEach(opt => opt.selected = false);
    } else {
      sel.value = '';
    }
  });
  searchInput.value = '';
  applyFilters();
});

// ====== Init ======
applyFilters();
