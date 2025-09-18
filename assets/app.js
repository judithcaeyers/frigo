// ====== Elements ======
const selects = {
  ingredient: document.getElementById('f-ingredient'),
  sfeer: document.getElementById('f-sfeer'),
  dieet: document.getElementById('f-dieet'),
  prep: document.getElementById('f-prep')
};
const grid = document.getElementById('grid');
const cards = grid ? Array.from(grid.querySelectorAll('.card')) : [];
const emptyState = document.getElementById('emptyState');
const searchToggle = document.getElementById('searchToggle');
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearFilters');

// ====== Custom Multiselect (enhance all <select.ms multiple>) ======
function enhanceMultiSelect(selectEl, labelText){
  // Wrapper
  const wrap = document.createElement('div');
  wrap.className = 'ms';

  // Trigger button
  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'ms-trigger';
  const label = document.createElement('span');
  label.className = 'ms-label';
  label.textContent = labelText || selectEl.getAttribute('aria-label') || 'Kies...';
  const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  chevron.setAttribute('viewBox','0 0 24 24');
  chevron.setAttribute('class','ms-chevron');
  chevron.innerHTML = '<path d="M7 10l5 5 5-5" stroke="#555" stroke-width="2" fill="none" stroke-linecap="round"/>';
  trigger.append(label, chevron);

  // Panel
  const panel = document.createElement('div');
  panel.className = 'ms-panel';
  Array.from(selectEl.options).forEach((opt, idx) => {
    const row = document.createElement('label');
    row.className = 'ms-option';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.value = opt.value;
    cb.checked = opt.selected;
    cb.setAttribute('data-index', idx.toString());
    const txt = document.createElement('span');
    txt.textContent = opt.textContent;
    row.append(cb, txt);
    panel.append(row);

    cb.addEventListener('change', () => {
      opt.selected = cb.checked;
      updateLabel();
      applyFilters(); // trigger filtering live
    });
  });

  // Put together
  selectEl.after(wrap);
  wrap.appendChild(trigger);
  wrap.appendChild(panel);
  selectEl.style.display = 'none'; // keep for a11y/values

  // Toggle open/close
  function closeAllOthers(){
    document.querySelectorAll('.ms.open').forEach(el => {
      if (el !== wrap) el.classList.remove('open');
    });
  }
  trigger.addEventListener('click', () => {
    const willOpen = !wrap.classList.contains('open');
    closeAllOthers();
    wrap.classList.toggle('open', willOpen);
    if (willOpen) {
      // focus first checkbox for keyboard
      const firstCb = panel.querySelector('input[type="checkbox"]');
      if (firstCb) firstCb.focus({preventScroll:true});
    }
  });
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) wrap.classList.remove('open');
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') wrap.classList.remove('open');
  });

  // Label updater
  function updateLabel(){
    const selected = Array.from(selectEl.selectedOptions).map(o => o.textContent);
    if (selected.length === 0) {
      label.textContent = labelText || selectEl.getAttribute('aria-label') || 'Kies...';
    } else if (selected.length <= 2) {
      label.textContent = selected.join(', ');
    } else {
      label.textContent = `${selected.length} geselecteerd`;
    }
  }
  updateLabel();
}

// Enhance all
document.querySelectorAll('select.ms[multiple]').forEach(sel => {
  const niceLabel = sel.id === 'f-ingredient' ? 'Ingrediënten (alles)'
                   : sel.id === 'f-sfeer'      ? 'Sfeer (alles)'
                   : sel.id === 'f-dieet'      ? 'Dieet (alles)'
                   : sel.id === 'f-prep'       ? 'Prep tijd (alles)'
                   : null;
  enhanceMultiSelect(sel, niceLabel);
});

// ====== Filtering logic ======
function getSelectedValues(selectEl){
  // works off the hidden native <select>
  return Array.from(selectEl.selectedOptions)
    .map(o => (o.value || '').toLowerCase().trim())
    .filter(Boolean);
}

function matchesFilters(card){
  const ingSelected = getSelectedValues(selects.ingredient); // AND
  const sfeerSelected = getSelectedValues(selects.sfeer);    // OR
  const dieetSelected = getSelectedValues(selects.dieet);    // OR
  const prepSelected  = getSelectedValues(selects.prep)
                        .map(n => Number(n)).filter(n => !Number.isNaN(n));
  const q = (searchInput?.value || '').trim().toLowerCase();

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

function applyFilters(){
  if (!cards.length) return;
  let visible = 0;
  cards.forEach(card => {
    if (matchesFilters(card)) {
      card.style.display = '';
      visible++;
    } else {
      card.style.display = 'none';
    }
  });
  emptyState?.classList.toggle('show', visible === 0);
}

// ====== Search + Clear ======
searchInput?.addEventListener('input', applyFilters);

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
  // clear native selects (so custom UI reflects after)
  Object.values(selects).forEach(sel => {
    Array.from(sel.options).forEach(opt => opt.selected = false);
  });
  // update custom labels
  document.querySelectorAll('.ms').forEach(ms => {
    ms.classList.remove('open');
  });
  // Recompute labels
  document.querySelectorAll('select.ms[multiple]').forEach(sel => {
    // quick re-enhance label: trigger change by dispatching event on first option
    const evt = new Event('change');
    sel.dispatchEvent(evt);
  });
  searchInput.value = '';
  applyFilters();

  // Also ensure labels visually update:
  document.querySelectorAll('.ms').forEach(ms => {
    const select = ms.previousElementSibling?.matches?.('select.ms') ? ms.previousElementSibling : null;
    const label = ms.querySelector('.ms-label');
    if (select && label){
      const id = select.id;
      label.textContent =
        id === 'f-ingredient' ? 'Ingrediënten (alles)' :
        id === 'f-sfeer'      ? 'Sfeer (alles)' :
        id === 'f-dieet'      ? 'Dieet (alles)' :
        id === 'f-prep'       ? 'Prep tijd (alles)' :
        'Kies...';
    }
  });
});

// Initial filter
applyFilters();
