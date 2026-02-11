// main.js (corrigido)
import "./style.css";
import momo from "../img/Momo.png";
import heart from "../img/heart.png";
import momoPhoto from "../img/momoPhoto.jpeg";

const frases = [
  "Você parece referência de artista.",
  "Apaixonada por vitamina de banana.",
  "Raviel tá impossivel hoje.",
  "Misa, o Victor tá muito apaixonado por você.",
  "Misa, o Victor te ama muito.",
  "Misa, sente meu cheirinho... ele passou o perfume dele em mim",
  "a Misa tem um sorriso tão lindo, né?",
  "O Raviel aprontando de novo.",
  "O Raviel dormindo todo torto.",
  "O Raviel achando que manda na casa.",
  "O sorriso dela ilumina tudo.",
  "Os olhinhos dela dizem mais que palavras.",
  "O jeito que ela sorri sem perceber.",
  "O sorriso dela chega antes dela, todo mundo se encanta.",
  "Os olhinhos dela quando ela ri....",
  "Ela tocando ukulele distraída.",
  "Ela aprendendo uma música nova no ukulele.",
  "O ukulele desafinado e ainda perfeito.",
  "A gente no zoológico rindo de tudo.",
  "O Raviel iria amar o zoológico.",
  "Perdidos na Liberdade juntos.",
  "Passeio simples no shopping, saudade.",
  "Caminhando pelo Ibirapuera.",
  "criando bichinhos de massinha no Ibirapuera.",
  "minha primavera...",
  "TAPA NA BUNDAAAAA",
];

const app = document.querySelector("#app");

app.innerHTML = `
  <div style="height:100vh; display:flex; flex-direction:column;">
    <div style="
      display:flex;
      justify-content:center;
      gap:12px;
      padding:12px;
      border-bottom:1px solid rgba(0,0,0,.15);
    ">
      <button id="tab-principal" aria-selected="true">Momo</button>
      <button id="tab-vazia" aria-selected="false">Sobre</button>
    </div>

    <div style="flex:1;">
      <div id="pagina-principal" style="
        height:100%;
        display:flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        gap:12px;
        text-align:center;
      ">
        <span id="frase" style="font-size:18px;"></span>

        <img
          src="${momo}"
          alt="Momo"
          width="200"
          height="300"
          class="momo-balanceando"
        />

        <button id="btnMomo" type="button">Momo diz...</button>
      </div>

      <div id="pagina-vazia" style="height:100%; display:none;">
        <h3>O poema dedicado a Victor</h3>
        <p>
          Gosto do teu sorriso
          porque ele me deixa à vontade.

          Conversar com você me faz bem,
          me acalma,
          me faz querer ficar um pouco mais.

          Não digo tudo de uma vez,
          não por falta de vontade,
          mas porque respeito o tempo das coisas.

          Talvez eu queira ser mais do que palavras trocadas,
          talvez eu já queira,
          mas espero o momento certo...
        </p>

        <h3>O momo</h3>
        <img
          src="${momoPhoto}"
          alt="Momo"
          width="300"
          height="300"
          class="momo-balanceando"
        />
      </div>
    </div>
  </div>
`;

const tabPrincipal = document.querySelector("#tab-principal");
const tabVazia = document.querySelector("#tab-vazia");
const paginaPrincipal = document.querySelector("#pagina-principal");
const paginaVazia = document.querySelector("#pagina-vazia");

function trocarPagina(pagina) {
  const principalAtiva = pagina === "principal";

  tabPrincipal.setAttribute("aria-selected", String(principalAtiva));
  tabVazia.setAttribute("aria-selected", String(!principalAtiva));

  paginaPrincipal.style.display = principalAtiva ? "flex" : "none";
  paginaVazia.style.display = principalAtiva ? "none" : "block";
}

tabPrincipal.addEventListener("click", () => trocarPagina("principal"));
tabVazia.addEventListener("click", () => trocarPagina("vazia"));

const spanFrase = document.querySelector("#frase");
const botao = document.querySelector("#btnMomo");

function fraseAleatoria() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

spanFrase.textContent = fraseAleatoria();

/**
 * BALÕES (corações)
 * Correção principal:
 * - o #app precisa ser a referência do absolute (position:relative)
 * - não usar overflow hidden no #app (senão corta o coração porque #app tem padding/max-width)
 * - criar o coração dentro da página principal, pra não aparecer na aba "Sobre"
 */
const appRoot = document.querySelector("#app");
const areaBaloes = paginaPrincipal; // onde os corações vão nascer/subir

appRoot.style.position = "relative";
appRoot.style.overflow = "visible"; // evita cortar os corações

areaBaloes.style.position = "relative";
areaBaloes.style.overflow = "hidden"; // aqui pode cortar sem problemas
areaBaloes.style.minHeight = "100%";

function criarBalao(clientX, clientY) {
  const img = document.createElement("img");
  img.src = heart;
  img.alt = "";
  img.className = "heart-img";

  // coordenadas do clique relativas à areaBaloes
  const rect = areaBaloes.getBoundingClientRect();
  const left = clientX - rect.left;
  const top = clientY - rect.top;

  img.style.left = `${left}px`;
  img.style.top = `${top}px`;

  const size = 28 + Math.random() * 42; // 28..70
  const dur = 1.2 + Math.random() * 1.2; // 1.2..2.4
  const drift = (Math.random() * 2 - 1) * 60; // -60..60

  img.style.width = `${size}px`;
  img.style.setProperty("--dur", `${dur}s`);
  img.style.setProperty("--drift", `${drift}px`);

  areaBaloes.appendChild(img);
  img.addEventListener("animationend", () => img.remove(), { once: true });
}

botao.addEventListener("click", (e) => {
  spanFrase.textContent = fraseAleatoria();
  criarBalao(e.clientX, e.clientY);
});

paginaPrincipal.addEventListener("click", (e) => {
  if (e.target.closest("#btnMomo")) return;
  criarBalao(e.clientX, e.clientY);
});
