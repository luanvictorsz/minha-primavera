import {
  SKINS,
  getWalletMorangos,
  getOwnedSkins,
  getActiveSkinId,
  setActiveSkin,
  buySkin,
} from "./momoskins.js";

export function criarPaginaLoja(container) {
  function render() {
    const wallet = getWalletMorangos();
    const owned = getOwnedSkins();
    const activeId = getActiveSkinId();

    container.innerHTML = `
      <div class="store-shell">
        <div class="store-header">
          <h2 class="store-title">🍓 Lojinha da Momo</h2>
          <div class="store-wallet">
            <span>🍓</span>
            <strong id="walletCount">${wallet}</strong>
            <span>morangos</span>
          </div>
        </div>

        <div class="store-grid" id="storeGrid"></div>
      </div>
    `;

    const grid = container.querySelector("#storeGrid");

    for (const skin of SKINS) {
      const isOwned = owned.includes(skin.id);
      const isActive = skin.id === activeId;
      const canAfford = wallet >= skin.price;

      let badgeHtml = "";
      let actionHtml = "";

      if (isActive) {
        badgeHtml = `<span class="skin-badge badge-active">Equipado</span>`;
        actionHtml = `<button class="skin-btn btn-equipped" disabled>Equipado</button>`;
      } else if (isOwned) {
        badgeHtml = `<span class="skin-badge badge-owned">Possuído</span>`;
        actionHtml = `<button class="skin-btn btn-equip" data-id="${skin.id}">Equipar</button>`;
      } else {
        badgeHtml = `<span class="skin-badge badge-price">🍓 ${skin.price}</span>`;
        actionHtml = `<button
          class="skin-btn btn-buy ${canAfford ? "" : "btn-locked"}"
          data-id="${skin.id}"
          ${canAfford ? "" : "disabled"}
        >${canAfford ? "Comprar" : "🔒 " + skin.price}</button>`;
      }

      const card = document.createElement("div");
      card.className = `skin-card ${isActive ? "card-active" : ""} ${!isOwned && !canAfford ? "card-locked" : ""}`;
      card.innerHTML = `
        ${badgeHtml}
        <div class="skin-img-wrap">
          <img src="${skin.img}" alt="${skin.name}" class="skin-img ${!isOwned && !canAfford ? "skin-grayscale" : ""}" />
        </div>
        <p class="skin-name">${skin.name}</p>
        ${actionHtml}
      `;
      grid.appendChild(card);
    }

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-id]");
      if (!btn) return;
      const id = btn.dataset.id;

      if (btn.classList.contains("btn-equip")) {
        setActiveSkin(id);
        render();
        return;
      }

      if (btn.classList.contains("btn-buy")) {
        const result = buySkin(id);
        if (result.ok) {
          setActiveSkin(id);
          render();
        } else {
          showToast(container, result.reason);
        }
      }
    });
  }
  render();
}

function showToast(container, msg) {
  const toast = document.createElement("div");
  toast.className = "store-toast";
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
}