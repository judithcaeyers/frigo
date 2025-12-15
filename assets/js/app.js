// assets/js/app.js
// Bouwt de receptenkaarten + filters + zoek op basis van window.RECIPES

const gridEl = document.getElementById("grid");
const emptyStateEl = document.getElementById("emptyState");

/* -------------------------
   Helpers
-------------------------- */

function normalize(str) {
  return (str || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function matchesPrep(recipePrep, selectedPrep) {
  if (!selectedPrep.length) return true;
  return selectedPrep.some(max => recipePrep <= Number(max));
}

/* -------------------------
   Filters ophalen
-------------------------- */

function getSelectedValues(selectId) {
  const select = document.getElementById(selectId);
  return select ? Array.from(select.selectedOptions).map(o => o.value) : [];
}

function getSearchValue() {
  const input = document.getElementById("searchInput");
  return input ? normalize(input.value.trim()) : "";
}

/* -------------------------
   Recept matchen
-------------------------- */

function recipeMatchesFilters(recipe) {
  const selIngredients = getSelectedValues("f-ingredient");
  const selSfeer = getSelectedValues("f-sfeer");
  const selDieet = getSelectedValues("f-dieet");
  const selPrep = getSelectedValues("f-prep");
  const search = getSearchValue();

  // Ingrediënten
  if (selIngredients.length) {
    if (!recipe.ingredientsFilter) return false;
    const recipeIngs = recipe.ingredientsFilter.map(normalize);
    if (!selIngredients.every(i => recipeIngs.includes(normalize(i)))) {
      return false;
    }
  }

  // Sfeer
  if (selSfeer.length) {
    if (!recipe.sfeer || !selSfeer.some(s => recipe.sfeer.includes(s))) {
      return false;
    }
  }

  // Dieet
  if (selDieet.length) {
    if (!recipe.dieet || !selDieet.some(d => recipe.dieet.includes(d))) {
      return false;
    }
  }

  // Prep-tijd
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

/* -------------------------
   Kaarten renderen
-------------------------- */

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

  matches.forEach(recipe => {
    gridEl.appendChild(createCard(recipe));
  });
}

/* -------------------------
   Events
-------------------------- */

function bindFilters() {
  ["f-ingredient", "f-sfeer", "f-dieet", "f-prep"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("change", renderGrid);
  });

  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", renderGrid);
  }

  const clearBtn = document.getElementById("clearFilters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      ["f-ingredient", "f-sfeer", "f-dieet", "f-prep"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.selectedIndex = -1;
      });

      const input = document.getElementById("searchInput");
      if (input) input.value = "";

      renderGrid();
    });
  }

  const toggleBtn = document.getElementById("searchToggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const input = document.getElementById("searchInput");
      if (!input) return;
      input.classList.toggle("show");
      if (input.classList.contains("show")) input.focus();
    });
  }
}

/* -------------------------
   Init
-------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.RECIPES || !Array.isArray(window.RECIPES)) {
    console.error("RECIPES is niet geladen of geen array.");
    return;
  }

  bindFilters();
  renderGrid();
});
