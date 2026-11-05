const form = document.getElementById("add-form");
const input = document.getElementById("item-input");
const inputError = document.getElementById("input-error");
const list = document.getElementById("list");
const empty = document.getElementById("empty");
const toast = document.getElementById("toast");
const toastText = document.getElementById("toast-text");
const toastClose = document.getElementById("toast-close");
const backBtn = document.getElementById("back-btn");

const initialItems = ["Dounut", "Red bull", "Doritos", "Petisco de filhote"];

const trashIcon = `
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M3.5 5.5 H16.5 M8 5.5 V3.8 H12 V5.5 M5.5 5.5 L6.2 16 H13.8 L14.5 5.5 M8.5 8.5 V13 M11.5 8.5 V13" />
  </svg>`;

let toastTimer;

function createItem(text) {
  const li = document.createElement("li");
  li.className = "item";

  const label = document.createElement("label");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", () => {
    li.classList.toggle("done", checkbox.checked);
  });

  const name = document.createElement("span");
  name.className = "name";
  name.textContent = text; // textContent evita injeção de HTML

  label.append(checkbox, name);

  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "remove";
  remove.setAttribute("aria-label", `Remover ${text}`);
  remove.innerHTML = trashIcon;
  remove.addEventListener("click", () => removeItem(li));

  li.append(label, remove);
  return li;
}

function updateEmptyState() {
  empty.hidden = list.children.length > 0;
}

function addItem(text) {
  list.appendChild(createItem(text));
  updateEmptyState();
}

function removeItem(li) {
  li.remove();
  updateEmptyState();
  showToast("O item foi removido da lista");
}

function showToast(message) {
  toastText.textContent = message;
  toast.hidden = false;
  // reinicia a animação se já estiver visível
  toast.style.animation = "none";
  void toast.offsetWidth;
  toast.style.animation = "";

  clearTimeout(toastTimer);
  toastTimer = setTimeout(hideToast, 3500);
}

function hideToast() {
  toast.hidden = true;
}

function showInputError() {
  inputError.hidden = false;
  input.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");
}

function clearInputError() {
  inputError.hidden = true;
  input.classList.remove("invalid");
  input.removeAttribute("aria-invalid");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    showInputError();
    input.focus();
    return;
  }

  addItem(text);
  input.value = "";
  clearInputError();
  input.focus();
});

input.addEventListener("input", clearInputError);
toastClose.addEventListener("click", hideToast);

// O botão "Voltar" volta para a página anterior, se existir
backBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if (window.history.length > 1) window.history.back();
});

initialItems.forEach(addItem);
