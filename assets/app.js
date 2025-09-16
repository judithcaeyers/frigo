// Helpers
const $  = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => Array.from(el.querySelectorAll(s));

/** Simple demo data — replace with your CMS/JSON **/
const RECIPES = [
  {
    id: 1,
    title: "Shakshuka",
    image: "https://picsum.photos/seed/shak/600/400",
    ingredients: ["egg","tomato","onion","garlic","paprika"],
    diet: "veggie",
    types: ["brunch","friends"],
    preptime: "quick",
    author: "Chef Lil J"
  },
  {
    id: 2,
    title: "Grapefruit Gin Fizz",
    image: "https://picsum.photos/seed/fizz/600/800",
    ingredients: ["grapefruit","gin","tonic","sugar"],
    diet: "any",
    types: ["drinks","friends","sunday-afternoon"],
    preptime: "really-quick",
    author: "Chef Lil J"
  },
  {
    id: 3,
    title: "Tapas Plate",
    image: "https://picsum.photos/seed/tapas/600/500",
    ingredients: ["olives","cheese","bread","anchovy"],
    diet: "any",
    types: ["tapas","many-friends"],
    preptime: "really-quick",
    author: "Chef Lil J"
  },
  {
    id: 4,
    title: "Vegan Pancakes",
    image: "https://picsum.photos/seed/panc/600/700",
    ingredients: ["flour","oat milk","banana"],
    diet: "vegan",
    types: ["brunch","day-after-night-out"],
    preptime: "not-so-long",
    author: "Chef Lil J"
  }
];

// App state
const state = {
  q: "",
  ingredients: new Set(),
  diet: "any",                 // any|veggie|vegan
  types: new Set(),            // set of vibe tags
  prepCat: "any"               // any|really-quick|quick|not-so-long
};

function initBrand(){
  const BRAND = (localStorage.getItem('brand') || 'FRIGO');
  const brandEl = $('#brand');
  const brandFoot = $('#brandFoot');
  if(brandEl) brandEl.textContent = BRAND;
  if(brandFoot) brandFoot.textContent = BRAND;
  document.title = `${BRAND} — recipes`;
}

function filterRecipes(){
  const q = state.q.trim().toLowerCase();

  return RECIPES.filter(r=>{
    // text query across title + author + ingredients
    const matchesQ = !q || (
      r.title.toLowerCase().includes(q) ||
      (r.author && r.author.toLowerCase().includes(q)) ||
      r.ingredients.some(i=> i.toLowerCase().includes(q))
    );

    // ingredients (all selected must be present)
    const ingOk = state.ingredients.size===0 ||
      Array.from(state.ingredients).every(sel => r.ingredients.map(i=>i.toLowerCase()).includes(sel));

    // diet
    const dietOk = (state.diet==='any') || (r.diet===state.diet);

    // types (every selected type must be present on recipe)
    const typeOk = state.types.size===0 ||
      Array.from(state.types).every(t=> r.types.includes(t));

    // prep time category
    const prepOk = (state.prepCat==='any') || (r.preptime===state.prepCat);

    return matchesQ && ingOk && dietOk && typeOk && prepOk;
  });
}

function recipeCard(r){
  const div = document.createElement('article');
  div.className = "card";
  div.innerHTML = `
    <a class="media" href="#" aria-label="${r.title}">
      <img src="${r.image}" alt="" loading="lazy">
    </a>
    <a class="inner" href="#">
      <h2 class="title">${r.title}</h2>
      <div class="meta">${r.diet} · ${r.preptime} · ${r.types.join(', ')}</div>
    </a>
  `;
  return div;
}

function masonryResize(grid){
  // Recalculate grid-row spans for all cards
  const rowH = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows')) || 8;
  const gap  = parseInt(getComputedStyle(grid).getPropertyValue('gap')) || 0;
  Array.from(grid.children).forEach(card=>{
    const inner = card.querySelector('.inner');
    const media = card.querySelector('.media');
    const total = (inner?.getBoundingClientRect().height || 0) + (media?.getBoundingClientRect().height || 0) + gap;
    const span = Math.ceil((total + gap) / (rowH + gap));
    card.style.gridRowEnd = `span ${span}`;
  });
}

function render(){
  const grid = $('#grid');
  const list = filterRecipes();

  // Update count
  $('#resultsCount').textContent = `${list.length} result${list.length===1?'':'s'}`;

  // Paint cards
  grid.innerHTML = '';
  list.forEach(r=>{
    const card = recipeCard(r);
    grid.appendChild(card);

    const img = card.querySelector('img');
    const sizeCard = () => masonryResize(grid);
    if(img){
      if(img.complete){ sizeCard(); }
      else{
        img.addEventListener('load', sizeCard);
        img.addEventListener('error', sizeCard);
      }
    }else{
      sizeCard();
    }
  });

  // After DOM paint, ensure layout
  requestAnimationFrame(()=> masonryResize(grid));

  // Update button counts
  $('#count-ing').textContent = state.ingredients.size ? `(${state.ingredients.size})` : '';
  const typeCount = (state.diet!=='any'?1:0) + state.types.size + (state.prepCat!=='any'?1:0);
  $('#count-type').textContent = typeCount ? `(${typeCount})` : '';
}

function paintIngList(filter=''){
  const ingList = $('#ingList');
  const allIngredients = Array.from(new Set(RECIPES.flatMap(r=>r.ingredients.map(i=>i.toLowerCase())))).sort();
  ingList.innerHTML = '';
  allIngredients.filter(i=> i.includes(filter.trim().toLowerCase())).forEach(i=>{
    const id = 'ing-'+i.replace(/[^a-z0-9]+/g,'-');
    const row = document.createElement('label');
    row.className = 'row';
    row.htmlFor = id;
    row.innerHTML = `<input id="${id}" type="checkbox" value="${i}"> ${i}`;
    const input = row.querySelector('input');
    input.checked = state.ingredients.has(i);
    input.addEventListener('change', (e)=>{
      if(e.target.checked) state.ingredients.add(i);
      else state.ingredients.delete(i);
      render();
    });
    ingList.appendChild(row);
  });
}

function closeAllMenus(){
  $$('.menu').forEach(m=>{
    m.classList.remove('open');
    const btn = m.querySelector('button.btn');
    if(btn) btn.setAttribute('aria-expanded','false');
  });
}

function bindUI(){
  const qInput = $('#q');

  // Search input
  qInput.addEventListener('input', e=>{ state.q = e.target.value; render(); });

  // Keyboard focus on slash
  window.addEventListener('keydown', (e)=>{
    if(e.key==='/' && document.activeElement!==qInput){
      e.preventDefault(); qInput.focus();
    }
  });

  // Popover open/close
  function toggleMenu(id){
    const el = $('#'+id);
    const wasOpen = el.classList.contains('open');
    closeAllMenus();
    if(!wasOpen){
      el.classList.add('open');
      const btn = el.querySelector('button.btn');
      if(btn) btn.setAttribute('aria-expanded','true');
    }
  }
  function outsideClose(e){
    if(!e.target.closest('.menu')){
      closeAllMenus();
    }
  }
  $('#btn-ing').addEventListener('click', (e)=>{ e.stopPropagation(); toggleMenu('menu-ing'); $('#ingFilter').focus(); });
  $('#btn-type').addEventListener('click', (e)=>{ e.stopPropagation(); toggleMenu('menu-type'); });
  document.addEventListener('click', outsideClose);
  $$('[data-close]').forEach(btn=> btn.addEventListener('click', (e)=>{ $('#'+e.target.dataset.close).classList.remove('open'); }));

  // Ingredient filter box
  $('#ingFilter').addEventListener('input', e=> paintIngList(e.target.value));
  $('#clearIng').addEventListener('click', ()=>{
    state.ingredients.clear();
    paintIngList($('#ingFilter').value);
    render();
  });

  // Diet / types / prep listeners
  $$('input[name="diet"]').forEach(r=> r.addEventListener('change', (e)=>{ state.diet = e.target.value; render(); }));
  $$('input[data-type]').forEach(cb=> cb.addEventListener('change', (e)=>{
    const v = e.target.value;
    if(e.target.checked) state.types.add(v);
    else state.types.delete(v);
    render();
  }));
  $$('input[name="preptime"]').forEach(r=> r.addEventListener('change', (e)=>{ state.prepCat = e.target.value; render(); }));

  // Footer year
  $('#year').textContent = new Date().getFullYear();

  // Responsive masonry rebalance
  if(!window.__masonryBound){
    window.addEventListener('resize', ()=> masonryResize($('#grid')));
    window.__masonryBound = true;
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  initBrand();
  bindUI();
  paintIngList();
  render();
});
