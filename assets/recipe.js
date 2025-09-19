// ===== Helpers voor hoeveelheden schalen =====
const servingsInput = document.getElementById('servingsInput');
const ingList = document.getElementById('ingList');

// Format getal -> mooie string (1/2, 1/4, … waar zinvol)
function formatQty(n){
  if (!isFinite(n)) return '';
  // afronden op kwartjes
  const rounded = Math.round(n * 4) / 4;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;

  const map = { 0: '', 0.25: '¼', 0.5: '½', 0.75: '¾' };
  const fracStr = map[frac] ?? '';
  if (whole === 0 && fracStr) return fracStr;
  if (fracStr) return `${whole}${fracStr}`;
  return String(rounded % 1 === 0 ? rounded : rounded.toFixed(2));
}

function renderIngredients(){
  const persons = Math.max(1, parseInt(servingsInput.value || '2', 10));
  // bouw (of update) de zichtbare qty spans
  ingList.querySelectorAll('li').forEach(li => {
    const base = parseFloat(li.dataset.qty || '0');      // basis per 1 persoon
    const unit = (li.dataset.unit || '').trim();         // bijv. g, el, tl
    const optional = li.dataset.optional === 'true';

    // maak wrappers indien nog niet aanwezig
    if (!li.querySelector('.ing-qty')) {
      const qtySpan = document.createElement('span');
      qtySpan.className = 'ing-qty';
      li.prepend(qtySpan);

      const nameSpan = document.createElement('span');
      nameSpan.className = 'ing-name';
      nameSpan.textContent = li.textContent.trim();
      // leeg li en rebuild
      li.textContent = '';
      li.append(qtySpan, nameSpan);
      if (optional) {
        const opt = document.createElement('span');
        opt.className = 'ing-optional';
        opt.textContent = '(optioneel)';
        li.append(opt);
      }
    }

    const qtySpan = li.querySelector('.ing-qty');

    // schaal
    const scaled = base * persons;
    const out = base === 0 ? '' : `${formatQty(scaled)} ${unit}`.trim();

    qtySpan.textContent = out;
  });
}

function adjustServings(delta){
  const current = Math.max(1, parseInt(servingsInput.value || '2', 10));
  const next = Math.max(1, current + delta);
  servingsInput.value = next;
  renderIngredients();
}

// Event listeners
document.querySelectorAll('.servings-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    adjustServings(action === 'inc' ? +1 : -1);
  });
});
servingsInput.addEventListener('input', renderIngredients);

// init
renderIngredients();
