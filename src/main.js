import "./style.css";
import { criarPaginaPrincipal }   from "./principal.js";
import { criarPaginaSobre }       from "./sobre.js";
import { criarPaginaChat }        from "./chat.js";
import { criarPaginaSelecaoJogo } from "./jogoselecao.js";
import { criarPaginaLoja }        from "./pages/momoStore.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div class="app-root">
    <div class="page-container">
      <div id="pagina-principal" class="page page--active"></div>
      <div id="pagina-sobre"     class="page"></div>
      <div id="pagina-chat"      class="page page--chat"></div>
      <div id="pagina-jogo"      class="page page--jogo"></div>
      <div id="pagina-loja"      class="page"></div>
    </div>

    <nav class="bottom-nav">
      <button class="nav-item nav-item--active" data-tab="principal">
        <span class="nav-icon">🐾</span>
        <span class="nav-label">Momo</span>
      </button>
      <button class="nav-item" data-tab="sobre">
        <span class="nav-icon">💌</span>
        <span class="nav-label">Sobre</span>
      </button>
      <button class="nav-item" data-tab="chat">
        <span class="nav-icon">💬</span>
        <span class="nav-label">Chat</span>
      </button>
      <button class="nav-item" data-tab="jogo">
        <span class="nav-icon">🎮</span>
        <span class="nav-label">Jogos</span>
      </button>
      <button class="nav-item" data-tab="loja">
        <span class="nav-icon">🛍️</span>
        <span class="nav-label">Loja</span>
      </button>
    </nav>
  </div>
`;

const paginaPrincipal = document.querySelector("#pagina-principal");
const paginaSobre     = document.querySelector("#pagina-sobre");
const paginaChat      = document.querySelector("#pagina-chat");
const paginaJogo      = document.querySelector("#pagina-jogo");
const paginaLoja      = document.querySelector("#pagina-loja");

criarPaginaPrincipal(paginaPrincipal);
criarPaginaSobre(paginaSobre);
criarPaginaChat(paginaChat);
const jogo = criarPaginaSelecaoJogo(paginaJogo);
criarPaginaLoja(paginaLoja);

const paginas = {
  principal: { el: paginaPrincipal },
  sobre:     { el: paginaSobre },
  chat:      { el: paginaChat },
  jogo:      { el: paginaJogo },
  loja:      { el: paginaLoja },
};

let paginaAtual = "principal";

function trocarPagina(pagina) {
  if (pagina === paginaAtual) return;

  const anterior = paginas[paginaAtual].el;
  const proxima  = paginas[pagina].el;

  anterior.classList.remove("page--active");
  anterior.classList.add("page--exit");
  setTimeout(() => anterior.classList.remove("page--exit"), 250);

  proxima.classList.add("page--active");

  document.querySelectorAll(".nav-item").forEach((btn) =>
    btn.classList.toggle("nav-item--active", btn.dataset.tab === pagina)
  );

  if (pagina !== "jogo") jogo.pauseGame();

  if (pagina === "jogo") {
    requestAnimationFrame(() => jogo.resizeCanvas());
  }

  if (pagina === "principal") {
    criarPaginaPrincipal(paginaPrincipal);
  }

  paginaAtual = pagina;
}

document.querySelectorAll(".nav-item").forEach((btn) =>
  btn.addEventListener("click", () => trocarPagina(btn.dataset.tab))
);