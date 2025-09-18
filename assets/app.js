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

function matchesFilters(card){
  const ingSel = (selects.ingredient.value || '').trim().toLowerCase();
  const sfeerSel = (selects.sfeer.value || '').trim().toLowerCase();
  const dieetSel = (selects.dieet.value || '').trim().toLowerCase();
  const prepSel = (selects.prep.value || '').trim();
  const q = (searchInput.value || '').trim().toLowerCase();

  const ingredients = JSON.parse(card.dataset.ingredients || '[]').map(s=>s.toLowerCase());
  const sfeer = (card.dataset.sfeer || '').toLowerCase();
  const dieet = (card.dataset.dieet || '').toLowerCase();
  const prep = Number(card.dataset.prep || 0);
  const title = (card.dataset.title || '').toLowerCase();

  const ingOK = !ingSel || ingredients.includes(ingSel);
  const sfeerOK = !sfeerSel || sfeer === sfeerSel;
  const dieetOK = !dieetSel || dieet === dieetSel;
  const prepOK = !prepSel || (prep && prep <= Number(prepSel));
  const searchOK = !q || [title, ...ingredients, sfeer, dieet, String(prep)].some(s => (s||'').includes(q));

  return ingOK && sfeerOK && dieetOK && prepOK && searchOK;
}

function applyFilters(){
  let visible = 0;
  cards.forEach(card => {
    if(matchesFilters(card)){
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  emptyState.classList.toggle('show', visible === 0);
}

Object.values(selects).forEach(sel => sel.addEventListener('change', applyFilters));
searchInput.addEventListener('input', applyFilters);

searchToggle.addEventListener('click', () => {
  const show = !searchInput.classList.contains('show');
  searchInput.classList.toggle('show', show);
  if(show){
    searchInput.focus();
  } else {
    searchInput.value = '';
    applyFilters();
  }
});

applyFilters();
