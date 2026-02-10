import "./style.css";
import momo from "../img/Momo.png";

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
];

const app = document.querySelector("#app");

app.innerHTML = `
  <div style="height:100vh; display:flex; flex-direction:column;">
    
    <!-- Tabs -->
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

    <!-- Conteúdo -->
    <div style="flex:1;">
      
      <!-- Página principal (frases + momo) -->
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

      <div id="pagina-vazia" style="
        height:100%;
        display:none;
      ">
      <h2>...</h2>
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

botao.addEventListener("click", () => {
  spanFrase.textContent = fraseAleatoria();
});
