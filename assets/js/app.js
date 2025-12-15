// assets/js/app.js
// Bouwt recepten-grid + filters op basis van window.RECIPES

const gridEl = document.getElementById("grid");
const emptyStateEl = document.getElementById("emptyState");

/* =========================
   Helpers
========================= */

function normalize(str = "") {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getSelectedValues(id) {
  const el = document.getElementById(id);
  return el ? Array.from(el.selectedOptions).map(o => o.value) : [];
}

function matchesPrep(recipePrep, selectedPrep) {
  if (!selectedPrep.length) return true;
  return selectedPrep.some(max => recipePrep <= Number(max));
}

/* =========================
   Build ingredient filter
========================= */

function buildIngredientOptions() {
  const select = document.getElementById("f-ingredient");
  if (!select) return;

  const set = new Set();

  RECIPES.forEach(recipe => {
    (recipe.ingredientsFilter || []).forEach(i => {
      if (i) set.add(i.trim());
    });
  });

  const sorted = Array.from(set).sort((a, b) =>
    a.localeCompare(b, "nl", { sensitivity: "base" })
  );

  select.innerHTML = "";
  sorted.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    select.appendChild(opt);
  });
}

/* =========================
   Filtering logic
========================= */

function recipeMatchesFilters(recipe) {
  const selIngredients = getSelectedValues("f-ingredient");
  const selSfeer = getSelectedValues("f-sfeer");
  const selDieet = getSelectedValues("f-dieet");
  const selPrep = getSelectedValues("f-prep");
  const search = normalize(
    document.getElementById("searchInput")?.value || ""
  );

  // Ingrediënten (AND)
  if (selIngredients.length) {
    const rIngs = (recipe.ingredientsFilter || []).map(normalize);
    if (!selIngredients.every(i => rIngs.includes(normalize(i)))) {
      return false;
    }
  }

  // Sfeer (OR)
  if (selSfeer.length) {
    if (!recipe.sfeer || !selSfeer.some(s => recipe.sfeer.includes(s))) {
      return false;
    }
  }

  // Dieet (OR)
  if (selDieet.length) {
    if (!recipe.dieet || !selDieet.some(d => recipe.dieet.includes(d))) {
      return false;
    }
  }

  // Prep tijd
  if (!matchesPrep(recipe.prep ?? Infinity, selPrep)) {
    return false;
  }

  // Vrije zoek
  if (search) {
    const haystack = normalize(
      [
        recipe.title,
        recipe.description,
        ...(recipe.ingredientsFilter || [])
      ].join(" ")
    );
    if (!haystack.includes(search)) return false;
  }

  return true;
}

/* =========================
   Rendering
========================= */

function createCard(recipe) {
  const a = document.createElement("a");
  a.className = "card";
  a.href = `pages/recept.html?slug=${recipe.slug}`;

  const img = document.createElement("img");
  img.src = recipe.image;
  img.alt = recipe.title;

  const titleWrap = document.createElement("div");
  titleWrap.className = "card-title";

  const title = document.createElement("div");
  title.className = "caps";
  title.textContent = recipe.title;

  titleWrap.appendChild(title);
  a.appendChild(img);
  a.appendChild(titleWrap);

  return a;
}

function renderGrid() {
  gridEl.innerHTML = "";

  const matches = RECIPES.filter(recipeMatchesFilters);

  if (!matches.length) {
    emptyStateEl.classList.add("show");
    return;
  }

  emptyStateEl.classList.remove("show");
  matches.forEach(r => gridEl.appendChild(createCard(r)));
}

/* =========================
   Events
========================= */

function bindEvents() {
  ["f-ingredient", "f-sfeer", "f-dieet", "f-prep"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", renderGrid);
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", renderGrid);
  }

  const toggleBtn = document.getElementById("searchToggle");
  if (toggleBtn && searchInput) {
    toggleBtn.addEventListener("click", () => {
      searchInput.classList.toggle("show");
      if (searchInput.classList.contains("show")) searchInput.focus();
    });
  }

  const clearBtn = document.getElementById("clearFilters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      ["f-ingredient", "f-sfeer", "f-dieet", "f-prep"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.selectedIndex = -1;
      });
      if (searchInput) searchInput.value = "";
      renderGrid();
    });
  }
}

/* =========================
   Init
========================= */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.RECIPES || !Array.isArray(window.RECIPES)) {
    console.error("RECIPES niet geladen.");
    return;
  }

  buildIngredientOptions();
  bindEvents();
  renderGrid();
});
