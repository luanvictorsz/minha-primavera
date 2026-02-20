import "./style.css";
import { criarPaginaPrincipal } from "./principal.js";
import { criarPaginaSobre }     from "./sobre.js";
import { criarPaginaChat }      from "./chat.js";
import { criarPaginaJogo }      from "./jogo.js";

const app = document.querySelector("#app");

app.innerHTML = `
  <div style="height:100vh; display:flex; flex-direction:column;">
    <div style="
      display:flex;
      justify-content:center;
      gap:12px;
      padding:12px;
      border-bottom:1px solid rgba(0,0,0,.15);
      flex-wrap:wrap;
    ">
      <button id="tab-principal" aria-selected="true">Momo</button>
      <button id="tab-vazia"     aria-selected="false">Sobre</button>
      <button id="tab-chat"      aria-selected="false">Chat</button>
      <button id="tab-jogo"      aria-selected="false">Jogo</button>
    </div>

    <div style="flex:1; overflow-y:auto; overflow-x:hidden;">
      <div id="pagina-principal" style="min-height:100%; display:flex; flex-direction:column; align-items:center; padding-bottom:24px;"></div>
      <div id="pagina-vazia"     style="height:100%; display:none; padding:16px;"></div>
      <div id="pagina-chat"      style="height:100%; display:none; padding:0;"></div>
      <div id="pagina-jogo"      style="height:100%; display:none; padding:14px;"></div>
    </div>
  </div>
`;

const paginaPrincipal = document.querySelector("#pagina-principal");
const paginaVazia     = document.querySelector("#pagina-vazia");
const paginaChat      = document.querySelector("#pagina-chat");
const paginaJogo      = document.querySelector("#pagina-jogo");

criarPaginaPrincipal(paginaPrincipal);
criarPaginaSobre(paginaVazia);
criarPaginaChat(paginaChat);
const jogo = criarPaginaJogo(paginaJogo);

const tabs = {
  principal: document.querySelector("#tab-principal"),
  vazia:     document.querySelector("#tab-vazia"),
  chat:      document.querySelector("#tab-chat"),
  jogo:      document.querySelector("#tab-jogo"),
};

const paginas = {
  principal: { el: paginaPrincipal, display: "flex" },
  vazia:     { el: paginaVazia,     display: "block" },
  chat:      { el: paginaChat,      display: "block" },
  jogo:      { el: paginaJogo,      display: "block" },
};

function trocarPagina(pagina) {
  Object.entries(tabs).forEach(([key, btn]) =>
    btn.setAttribute("aria-selected", String(key === pagina))
  );

  Object.entries(paginas).forEach(([key, { el, display }]) => {
    el.style.display = key === pagina ? display : "none";
  });

  if (pagina === "jogo") {
    requestAnimationFrame(() => {
      jogo.resizeCanvas();
      jogo.resetGame();
    });
  } else {
    jogo.pauseGame();
  }

  if (pagina === "principal") {
    criarPaginaPrincipal(paginaPrincipal);
  }
}

Object.entries(tabs).forEach(([key, btn]) =>
  btn.addEventListener("click", () => trocarPagina(key))
);