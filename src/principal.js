import "./style.css";
import "./store.css";
import heart from "../img/heart.png";

import {
  getWalletMorangos,
  getActiveSkinImg,
  SKINS,
  getOwnedSkins,
  getActiveSkinId,
  setActiveSkin,
  buySkin,
} from "./pages/momoskins";

const frases = [
  "minha primavera...",
  "TAPA NA BUNDAAAAA",
  "Raviel tá impossivel hoje.",
  "Caminhando pelo Ibirapuera.",
  "Misa, o Victor te ama muito.",
  "O Raviel aprontando de novo.",
  "O sorriso dela ilumina tudo.",
  "Perdidos na Liberdade juntos.",
  "O Raviel dormindo todo torto.",
  "Ela tocando ukulele distraída.",
  "O Raviel iria amar o zoológico.",
  "Você parece referência de artista.",
  "Apaixonada por vitamina de banana.",
  "Os olhinhos dela quando ela ri....",
  "O Raviel achando que manda na casa.",
  "O jeito que ela sorri sem perceber.",
  "A gente no zoológico rindo de tudo.",
  "a Misa tem um sorriso tão lindo, né?",
  "Passeio simples no shopping, saudade.",
  "O ukulele desafinado e ainda perfeito.",
  "Os olhinhos dela dizem mais que palavras.",
  "Ela aprendendo uma música nova no ukulele.",
  "criando bichinhos de massinha no Ibirapuera.",
  "Misa, o Victor tá muito apaixonado por você.",
  "O sorriso dela chega antes dela, todo mundo se encanta.",
  "Misa, sente meu cheirinho... ele passou o perfume dele em mim",
];

export function fraseAleatoria() {
  return frases[Math.floor(Math.random() * frases.length)];
}

function showToast(msg) {
  const toast = document.createElement("div");
  toast.className = "store-toast";
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2400);
}

function renderLoja(lojaEl) {
  const wallet   = getWalletMorangos();
  const owned    = getOwnedSkins();
  const activeId = getActiveSkinId();

  lojaEl.innerHTML = `
    <div class="loja-header">
      <span class="loja-titulo">🛍️ Lojinha</span>
      <span class="loja-wallet">🍓 <strong>${wallet}</strong> disponíveis</span>
    </div>
    <div class="loja-grid"></div>
  `;

  const grid = lojaEl.querySelector(".loja-grid");

  for (const skin of SKINS) {
    const isOwned   = owned.includes(skin.id);
    const isActive  = skin.id === activeId;
    const canAfford = wallet >= skin.price;

    let badge  = "";
    let action = "";

    if (isActive) {
      badge  = `<span class="loja-badge badge-active">Equipado</span>`;
      action = `<button class="loja-btn btn-equipped" disabled>Equipado</button>`;
    } else if (isOwned) {
      badge  = `<span class="loja-badge badge-owned">Possuído</span>`;
      action = `<button class="loja-btn btn-equip" data-id="${skin.id}">Equipar</button>`;
    } else {
      badge  = `<span class="loja-badge badge-price">🍓 ${skin.price}</span>`;
      action = `<button
        class="loja-btn btn-buy ${canAfford ? "" : "btn-locked"}"
        data-id="${skin.id}"
        ${canAfford ? "" : "disabled"}
      >${canAfford ? "Comprar" : "🔒 " + skin.price}</button>`;
    }

    const card = document.createElement("div");
    card.className = `loja-card ${isActive ? "card-active" : ""} ${!isOwned && !canAfford ? "card-locked" : ""}`;
    card.innerHTML = `
      ${badge}
      <div class="loja-img-wrap">
        <img src="${skin.img}" alt="${skin.name}" class="loja-img${!isOwned && !canAfford ? " skin-grayscale" : ""}" />
      </div>
      <p class="loja-name">${skin.name}</p>
      ${action}
    `;
    grid.appendChild(card);
  }

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-id]");
    if (!btn) return;
    const id = btn.dataset.id;

    if (btn.classList.contains("btn-equip")) {
      setActiveSkin(id);
      document.querySelector("#momoMainImg")?.setAttribute("src", getActiveSkinImg());
      renderLoja(lojaEl);
      return;
    }

    if (btn.classList.contains("btn-buy")) {
      const result = buySkin(id);
      if (result.ok) {
        setActiveSkin(id);
        document.querySelector("#momoMainImg")?.setAttribute("src", getActiveSkinImg());
        const walletEl = document.querySelector("#walletDisplay");
        if (walletEl) walletEl.textContent = getWalletMorangos();
        renderLoja(lojaEl);
      } else {
        showToast(result.reason);
      }
    }
  });
}

export function criarPaginaPrincipal(container) {
  const wallet   = getWalletMorangos();
  const momoSkin = getActiveSkinImg();

  container.innerHTML = `
    <div class="principal-shell">

      <div class="principal-topo">
        <span id="frase" class="principal-frase"></span>

        <div class="principal-morangos">
          🍓 <strong id="walletDisplay">${wallet}</strong> morangos disponíveis
        </div>

        <img
          id="momoMainImg"
          src="${momoSkin}"
          alt="Momo"
          class="momo-balanceando principal-momo-img"
        />

        <button id="btnMomo" type="button">Momo diz...</button>
      </div>

      <div id="lojaInline" class="loja-inline"></div>

    </div>
  `;

  container.style.position = "relative";
  container.style.overflow = "hidden";

  const spanFrase = container.querySelector("#frase");
  const botao     = container.querySelector("#btnMomo");
  const lojaEl    = container.querySelector("#lojaInline");

  spanFrase.textContent = fraseAleatoria();
  renderLoja(lojaEl);

  function criarBalao(clientX, clientY) {
    const img = document.createElement("img");
    img.src = heart;
    img.alt = "";
    img.className = "heart-img";

    const rect = container.getBoundingClientRect();
    img.style.left = `${clientX - rect.left}px`;
    img.style.top  = `${clientY - rect.top}px`;

    const size  = 28 + Math.random() * 42;
    const dur   = 1.2 + Math.random() * 1.2;
    const drift = (Math.random() * 2 - 1) * 60;

    img.style.width = `${size}px`;
    img.style.setProperty("--dur",   `${dur}s`);
    img.style.setProperty("--drift", `${drift}px`);

    container.appendChild(img);
    img.addEventListener("animationend", () => img.remove(), { once: true });
  }

  botao.addEventListener("click", (e) => {
    spanFrase.textContent = fraseAleatoria();
    criarBalao(e.clientX, e.clientY);
  });

  container.addEventListener("click", (e) => {
    if (e.target.closest("#btnMomo") || e.target.closest("#lojaInline")) return;
    criarBalao(e.clientX, e.clientY);
  });
}