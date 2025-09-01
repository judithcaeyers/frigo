// ===== Demo data (swap for your CMS/JSON) =====
card.style.gridRowEnd = 'span '+span;
};
const img = card.querySelector('img');
if(img){ img.complete ? sizeCard() : (img.addEventListener('load', sizeCard), img.addEventListener('error', sizeCard)); }
else { sizeCard(); }
});


// Resize all on viewport changes (bind once)
const resizeAll = ()=>{ Array.from(grid.children).forEach(card=>{
const rowH = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows')) || 8;
const gap = parseInt(getComputedStyle(grid).getPropertyValue('gap')) || 0;
const inner = card.querySelector('.inner'); if(!inner) return;
const span = Math.ceil((inner.getBoundingClientRect().height + gap)/(rowH+gap));
card.style.gridRowEnd = 'span '+span;
}); };
if(!window.__masonryBound){ window.addEventListener('resize', resizeAll); window.__masonryBound=true; }
resizeAll();


// Update button counts
$('#count-ing').textContent = state.ingredients.size?`(${state.ingredients.size})`:'';
const typeCount = (state.diet!=='any'?1:0) + state.types.size + (state.prepCat!=='any'?1:0);
$('#count-type').textContent = typeCount?`(${typeCount})`:'';
}


function paintIngList(filter=''){
const ingList = $('#ingList');
const allIngredients = Array.from(new Set(RECIPES.flatMap(r=>r.ingredients.map(i=>i.toLowerCase())))).sort();
ingList.innerHTML='';
allIngredients.filter(i=> i.includes(filter.trim().toLowerCase())).forEach(i=>{
const id = 'ing-'+i.replace(/[^a-z0-9]+/g,'-');
const row=document.createElement('label'); row.className='row'; row.htmlFor=id; row.innerHTML=`<input id="${id}" type="checkbox" value="${i}"> ${i}`;
const input = row.querySelector('input'); input.checked = state.ingredients.has(i);
input.addEventListener('change', (e)=>{ if(e.target.checked) state.ingredients.add(i); else state.ingredients.delete(i); render(); });
ingList.appendChild(row);
});
}


function bindUI(){
const qInput=$('#q');
qInput.addEventListener('input', e=>{ state.q=e.target.value; render(); });
window.addEventListener('keydown', (e)=>{ if(e.key==='/' && document.activeElement!==qInput){ e.preventDefault(); qInput.focus(); } });


// Popover open/close
function toggleMenu(id){ const el=$('#'+id); const wasOpen=el.classList.contains('open'); $$('.menu').forEach(m=>m.classList.remove('open')); if(!wasOpen){ el.classList.add('open'); } }
function outsideClose(e){ if(!e.target.closest('.menu')){ $$('.menu').forEach(m=>m.classList.remove('open')); } }
$('#btn-ing').addEventListener('click', (e)=>{ e.stopPropagation(); toggleMenu('menu-ing'); $('#ingFilter').focus(); });
$('#btn-type').addEventListener('click', (e)=>{ e.stopPropagation(); toggleMenu('menu-type'); });
document.addEventListener('click', outsideClose);
$$('[data-close]').forEach(btn=> btn.addEventListener('click', (e)=>{ $('#'+e.target.dataset.close).classList.remove('open'); }));


// Ingredient filter box
$('#ingFilter').addEventListener('input', e=> paintIngList(e.target.value));
$('#clearIng').addEventListener('click', ()=>{ state.ingredients.clear(); paintIngList($('#ingFilter').value); render(); });


// Type & time listeners
$$('input[name="diet"]').forEach(r=> r.addEventListener('change', (e)=>{ state.diet=e.target.value; render(); }));
$$('input[data-type]').forEach(cb=> cb.addEventListener('change', (e)=>{ const v=e.target.value; if(e.target.checked) state.types.add(v); else state.types.delete(v); render(); }));
$$('input[name="preptime"]').forEach(r=> r.addEventListener('change', (e)=>{ state.prepCat = e.target.value; render(); }));


// Footer year
$('#year').textContent = new Date().getFullYear();
}


function initBrand(){
const BRAND = (localStorage.getItem('brand') || 'FRIGO');
const brandEl = $('#brand');
const brandFoot = $('#brandFoot');
if(brandEl) brandEl.textContent = BRAND;
if(brandFoot) brandFoot.textContent = BRAND;
document.title = BRAND + ' — recipes';
}


// Bootstrap
document.addEventListener('DOMContentLoaded', ()=>{
initBrand();
bindUI();
paintIngList();
render();
});
