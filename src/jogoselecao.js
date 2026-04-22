import { criarPaginaJogo }         from "./games/jogoFlap.js";
import { criarPaginaInfiniteJogo } from "../src/games/JogoInifinite.js";
import { criarPaginaDesenho }      from "./games/JogoDesenho.js";
import { criarPaginaCozinheiro }   from "./games/JogoCozinheiro.js";

export function criarPaginaSelecaoJogo(container) {
  let jogoAtivo = null;

  function mostrarSelecao() {
    if (jogoAtivo?.pauseGame) jogoAtivo.pauseGame();
    jogoAtivo = null;

    container.innerHTML = `
      <div class="game-selection">
        <h2 class="game-selection__title">🎮 Jogos</h2>

        <div class="game-selection__grid">
          <button class="game-card-btn" id="btn-flap">
            <div class="game-card-btn__icon">
              <img src="../img/momoAviao.png" alt="Flap Momo" />
            </div>
            <div class="game-card-btn__name">Flap Momo</div>
            <div class="game-card-btn__desc">
              Voe desviando das bordas e colete morangos!
            </div>
          </button>

          <button class="game-card-btn" id="btn-infinite">
            <div class="game-card-btn__icon">
              <img src="../img/momoCar.png" alt="Infinite Momo" />
            </div>
            <div class="game-card-btn__name">Infinite Momo</div>
            <div class="game-card-btn__desc">
              Corra infinitamente desviando de obstáculos!
            </div>
          </button>

          <button class="game-card-btn" id="btn-cozinheiro">
            <div class="game-card-btn__icon">
              <span style="font-size:52px; line-height:1; display:block;">👨‍🍳</span>
            </div>
            <div class="game-card-btn__name">Momo Chef</div>
            <div class="game-card-btn__desc">
              Siga as receitas na ordem certa e marque pontos!
            </div>
          </button>

          <button class="game-card-btn" id="btn-desenho">
            <div class="game-card-btn__icon">
              <span style="font-size:52px; line-height:1; display:block;">🎨</span>
            </div>
            <div class="game-card-btn__name">Estúdio Momo</div>
            <div class="game-card-btn__desc">
              Desenhe livremente com pincéis, cores e muito mais!
            </div>
          </button>
        </div>
      </div>
    `;

    container.querySelector("#btn-flap").addEventListener("click",       () => abrirJogo("flap"));
    container.querySelector("#btn-infinite").addEventListener("click",   () => abrirJogo("infinite"));
    container.querySelector("#btn-cozinheiro").addEventListener("click", () => abrirJogo("cozinheiro"));
    container.querySelector("#btn-desenho").addEventListener("click",    () => abrirJogo("desenho"));
  }

  function abrirJogo(tipo) {
    container.innerHTML = `
      <div style="height:100%; display:flex; flex-direction:column;">
        <button id="btn-voltar" class="btn-voltar">← Voltar</button>
        <div id="jogo-inner" style="flex:1; min-height:0;"></div>
      </div>
    `;

    const inner = container.querySelector("#jogo-inner");

    if (tipo === "flap") {
      jogoAtivo = criarPaginaJogo(inner);
    } else if (tipo === "infinite") {
      jogoAtivo = criarPaginaInfiniteJogo(inner);
    } else if (tipo === "cozinheiro") {
      jogoAtivo = criarPaginaCozinheiro(inner);
    } else if (tipo === "desenho") {
      jogoAtivo = criarPaginaDesenho(inner);
    }

    requestAnimationFrame(() => {
      jogoAtivo?.resizeCanvas?.();
    });

    container.querySelector("#btn-voltar").addEventListener("click", () => {
      jogoAtivo?.destroy?.();
      mostrarSelecao();
    });
  }

  function resizeCanvas() { jogoAtivo?.resizeCanvas?.(); }
  function resetGame()    { jogoAtivo?.resetGame?.();    }
  function pauseGame()    { jogoAtivo?.pauseGame?.();    }

  mostrarSelecao();

  return { resizeCanvas, resetGame, pauseGame };
}