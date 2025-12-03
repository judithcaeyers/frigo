// Basisporties (pas je niet aan per recept)
const baseServings = 2;

// Elements
const listEl = document.getElementById("ing-list");
const servingsOut = document.getElementById("servings");
const metaServings = document.getElementById("meta-servings");

function formatQty(q, unit){
  const rounded = Math.round(q * 10) / 10;
  const str = Number.isInteger(rounded) ? rounded : rounded.toString().replace(".", ",");
  return unit ? `${str} ${unit}` : str;
}

function renderQuantities(servings){
  [...listEl.querySelectorAll("li[data-qty]")].forEach(li => {
    const base = parseFloat(li.dataset.qty);
    const unit = li.dataset.unit || "";
    const scaled = base * (servings / baseServings);
    li.querySelector(".ing-qty").textContent = formatQty(scaled, unit);
  });
}

async function copyList(){
  const lines = [...listEl.querySelectorAll("li[data-qty]")].map(li => {
    const qty = li.querySelector(".ing-qty").textContent;
    const name = li.querySelector("span:last-child").textContent.trim();
    return `${qty} ${name}`;
  });
  await navigator.clipboard.writeText(lines.join("\n"));

  const btn = document.getElementById("copy-btn");
  const old = btn.textContent;
  btn.textContent = "Gekopieerd!";
  setTimeout(() => btn.textContent = old, 1500);
}

let currentServings = baseServings;

function updateServings(n){
  currentServings = Math.max(1, n);
  servingsOut.textContent = currentServings;
  metaServings.textContent = currentServings;
  renderQuantities(currentServings);
}

// Event listeners
document.getElementById("btn-minus").addEventListener("click", () => {
  updateServings(currentServings - 1);
});
document.getElementById("btn-plus").addEventListener("click", () => {
  updateServings(currentServings + 1);
});
document.getElementById("copy-btn").addEventListener("click", copyList);

// Initial render
renderQuantities(baseServings);
