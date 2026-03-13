import { criarPaginaJogo }         from "./games/jogoFlap.js";
import { criarPaginaInfiniteJogo } from "../src/games/JogoInifinite.js";

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
        </div>
      </div>
    `;

    container.querySelector("#btn-flap").addEventListener("click", () => abrirJogo("flap"));
    container.querySelector("#btn-infinite").addEventListener("click", () => abrirJogo("infinite"));
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
    } else {
      jogoAtivo = criarPaginaInfiniteJogo(inner);
    }

    requestAnimationFrame(() => {
      jogoAtivo?.resizeCanvas?.();
      jogoAtivo?.resetGame?.();
    });

    container.querySelector("#btn-voltar").addEventListener("click", () => {
      mostrarSelecao();
    });
  }

  function resizeCanvas() { jogoAtivo?.resizeCanvas?.(); }
  function resetGame()    { jogoAtivo?.resetGame?.();    }
  function pauseGame()    { jogoAtivo?.pauseGame?.();    }

  mostrarSelecao();

  return { resizeCanvas, resetGame, pauseGame };
}