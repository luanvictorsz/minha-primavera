import momo from "../img/Momo.png";
import heart from "../img/heart.png";

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

export function criarPaginaPrincipal(container) {
  container.innerHTML = `
    <span id="frase" style="font-size:18px;"></span>
    <img src="${momo}" alt="Momo" width="200" height="300" class="momo-balanceando" />
    <button id="btnMomo" type="button">Momo diz...</button>
  `;

  container.style.position = "relative";
  container.style.overflow = "hidden";
  container.style.minHeight = "100%";

  const spanFrase = container.querySelector("#frase");
  const botao = container.querySelector("#btnMomo");

  spanFrase.textContent = fraseAleatoria();

  function criarBalao(clientX, clientY) {
    const img = document.createElement("img");
    img.src = heart;
    img.alt = "";
    img.className = "heart-img";

    const rect = container.getBoundingClientRect();
    img.style.left = `${clientX - rect.left}px`;
    img.style.top = `${clientY - rect.top}px`;

    const size = 28 + Math.random() * 42;
    const dur = 1.2 + Math.random() * 1.2;
    const drift = (Math.random() * 2 - 1) * 60;

    img.style.width = `${size}px`;
    img.style.setProperty("--dur", `${dur}s`);
    img.style.setProperty("--drift", `${drift}px`);

    container.appendChild(img);
    img.addEventListener("animationend", () => img.remove(), { once: true });
  }

  botao.addEventListener("click", (e) => {
    spanFrase.textContent = fraseAleatoria();
    criarBalao(e.clientX, e.clientY);
  });

  container.addEventListener("click", (e) => {
    if (e.target.closest("#btnMomo")) return;
    criarBalao(e.clientX, e.clientY);
  });
}