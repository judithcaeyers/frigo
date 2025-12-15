// assets/recipe.js

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function loadRecipeScript(slug) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    // Omdat recept.html in /assets/ staat:
    // assets/recept.html -> assets/recipes/<slug>.js = "recipes/<slug>.js"
    script.src = `recipes/${slug}.js`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Kon receptbestand niet laden: ${script.src}`));
    document.head.appendChild(script);
  });
}

function formatQty(q, unit) {
  const rounded = Math.round(q * 10) / 10;
  const str = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(".", ",");
  return unit ? `${str} ${unit}` : str;
}

function renderRecipe(recipe) {
  document.title = `${recipe.title} — Chef Lil J`;

  document.getElementById("recipe-kicker").textContent = recipe.kicker || "";
  document.getElementById("recipe-title").textContent = recipe.title || "";
  document.getElementById("recipe-subtitle").textContent = recipe.description || "";

  document.getElementById("meta-time").textContent = recipe.time || "";
  document.getElementById("meta-level").textContent = recipe.level || "";

  const metaServings = document.getElementById("meta-servings");
  const servingsOut = document.getElementById("servings");

  const baseServings = recipe.servings ?? 2;
  let currentServings = baseServings;

  metaServings.textContent = baseServings;
  servingsOut.textContent = baseServings;

  // Ingrediënten opbouwen
  const listEl = document.getElementById("ing-list");
  listEl.innerHTML = "";

  recipe.ingredients.forEach((item) => {
    if (item.type === "divider") {
      const hr = document.createElement("hr");
      hr.className = "subdivider";
      listEl.appendChild(hr);
      return;
    }

    const li = document.createElement("li");
    li.dataset.qty = item.qty;
    li.dataset.unit = item.unit || "";

    const qtySpan = document.createElement("span");
    qtySpan.className = "ing-qty";
    qtySpan.textContent = formatQty(item.qty, item.unit);

    const labelSpan = document.createElement("span");
    labelSpan.textContent = item.label;

    li.appendChild(qtySpan);
    li.appendChild(labelSpan);
    listEl.appendChild(li);
  });

  // Stappen opbouwen
  const stepList = document.getElementById("step-list");
  stepList.innerHTML = "";

  recipe.steps.forEach((text) => {
    const li = document.createElement("li");
    li.className = "step";
    const p = document.createElement("p");
    p.textContent = text;
    li.appendChild(p);
    stepList.appendChild(li);
  });

  function renderQuantities(servings) {
    [...listEl.querySelectorAll("li[data-qty]")].forEach((li) => {
      const baseQty = parseFloat(li.dataset.qty);
      const unit = li.dataset.unit || "";
      const scaled = baseQty * (servings / baseServings);
      li.querySelector(".ing-qty").textContent = formatQty(scaled, unit);
    });
  }

  function updateServings(n) {
    currentServings = Math.max(1, n);
    servingsOut.textContent = currentServings;
    metaServings.textContent = currentServings;
    renderQuantities(currentServings);
  }

  // Listeners (1x)
  document.getElementById("btn-minus").addEventListener("click", () => {
    updateServings(currentServings - 1);
  });

  document.getElementById("btn-plus").addEventListener("click", () => {
    updateServings(currentServings + 1);
  });

  document.getElementById("copy-btn").addEventListener("click", async () => {
    const lines = [...listEl.querySelectorAll("li[data-qty]")].map((li) => {
      const qty = li.querySelector(".ing-qty").textContent;
      const name = li.querySelector("span:last-child").textContent.trim();
      return `${qty} ${name}`;
    });

    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      const btn = document.getElementById("copy-btn");
      const old = btn.textContent;
      btn.textContent = "Gekopieerd!";
      setTimeout(() => (btn.textContent = old), 1500);
    } catch (e) {
      alert("Kopiëren lukt niet in deze browser. Selecteer en kopieer handmatig.");
    }
  });

  // Initial render
  renderQuantities(baseServings);
}

function renderError(message) {
  document.getElementById("recipe-title").textContent = "Recept niet gevonden";
  document.getElementById("recipe-subtitle").textContent = message;
  document.getElementById("recipe-kicker").textContent = "";
  document.getElementById("meta-time").textContent = "";
  document.getElementById("meta-servings").textContent = "";
  document.getElementById("meta-level").textContent = "";
}

document.addEventListener("DOMContentLoaded", async () => {
  const slug = getSlug();

  if (!slug) {
    renderError('Er ontbreekt een slug in de URL. Gebruik bv. "../assets/recept.html?slug=bietello-tonato"');
    return;
  }

  try {
    window.RECIPE = null;
    await loadRecipeScript(slug);

    if (!window.RECIPE) {
      renderError(`Het receptbestand voor "${slug}" laadde, maar bevat geen window.RECIPE.`);
      return;
    }

    renderRecipe(window.RECIPE);
  } catch (err) {
    renderError(`Ik kan "${slug}" niet laden. Bestaat assets/recipes/${slug}.js?`);
  }
});
