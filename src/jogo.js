import momo from "../img/Momo.png";
import morango from "../img/morango.png";

export function criarPaginaJogo(container) {
  container.innerHTML = `
    <div class="game-shell">
      <div class="game-hud">
        <div><strong>Pontos:</strong> <span id="score">0</span></div>
        <div><strong>Recorde:</strong> <span id="best">0</span></div>
      </div>

      <div id="game-area" class="game-area" role="button" aria-label="Área do jogo">
        <canvas id="game-canvas"></canvas>

        <div id="game-overlay" class="game-overlay">
          <div class="game-card">
            <h3 style="margin:0 0 6px;">Momo Voador</h3>
            <p style="margin:0 0 12px; opacity:.9;">
              Pegue os morangos!<br />
              Mantenha o dedo/mouse pressionado para subir.<br />
              Solte para descer.<br />
              Não encoste no topo nem no fundo.
            </p>
            <button id="btnStart" type="button">Começar</button>
          </div>
        </div>
      </div>

      <div class="game-help">
        Segurou = sobe • Soltou = desce
      </div>
    </div>
  `;

  const gameArea = container.querySelector("#game-area");
  const canvas = container.querySelector("#game-canvas");
  const ctx = canvas.getContext("2d");
  const overlay = container.querySelector("#game-overlay");
  const btnStart = container.querySelector("#btnStart");
  const scoreEl = container.querySelector("#score");
  const bestEl = container.querySelector("#best");

  const momoImg = new Image();
  momoImg.src = momo;

  const morangoImg = new Image();
  morangoImg.src = morango;

  let rafId = 0;
  let running = false;
  let started = false;
  let pressing = false;
  let viewW = 0;
  let viewH = 0;

  const state = {
    t0: 0,
    score: 0,
    best: Number(localStorage.getItem("momo_best") || 0),
    momoX: 0,
    momoY: 0,
    momoVY: 0,
    gravity: 1600,
    lift: -1400,
    radius: 28,
    morangos: [],
    spawnTimer: 0,
    nextSpawn: 0.75,
    morangoRadius: 18,
    morangoMinSpeed: 260,
    morangoMaxSpeed: 460,
  };

  bestEl.textContent = String(state.best);

  function rand(min, max) {
    return min + Math.random() * (max - min);
  }

  function resizeCanvas() {
    const rect = gameArea.getBoundingClientRect();
    viewW = rect.width;
    viewH = rect.height;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!started) {
      state.momoX = viewW * 0.35;
      state.momoY = viewH * 0.5;
      state.momoVY = 0;
      drawFrame();
    }
  }

  function spawnMorango() {
    const pad = 24;
    state.morangos.push({
      x: viewW + 40,
      y: rand(pad, viewH - pad),
      vx: -rand(state.morangoMinSpeed, state.morangoMaxSpeed),
      r: state.morangoRadius,
    });
  }

  function checkCatchMorango() {
    const catchR = state.radius * 0.85;
    for (let i = state.morangos.length - 1; i >= 0; i--) {
      const m = state.morangos[i];
      const dx = m.x - state.momoX;
      const dy = m.y - state.momoY;
      if (dx * dx + dy * dy <= (m.r + catchR) ** 2) {
        state.morangos.splice(i, 1);
        state.score += 1;
        scoreEl.textContent = String(state.score);
      }
    }
  }

  function clampCollision() {
    if (state.momoY - state.radius <= 10) return true;
    if (state.momoY + state.radius >= viewH - 10) return true;
    return false;
  }

  function drawFrame() {
    const w = viewW;
    const h = viewH;
    if (!w || !h) return;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0b141a";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(255,255,255,.10)";
    ctx.fillRect(0, 0, w, 10);
    ctx.fillRect(0, h - 10, w, 10);

    for (const m of state.morangos) {
      const size = m.r * 2;
      if (morangoImg.complete && morangoImg.naturalWidth > 0) {
        ctx.drawImage(morangoImg, m.x - m.r, m.y - m.r, size, size);
      } else {
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 80, 120, .9)";
        ctx.fill();
      }
    }

    ctx.beginPath();
    ctx.arc(state.momoX, state.momoY, state.radius + 10, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(0,168,132,.12)";
    ctx.fill();

    const angle = Math.max(-0.45, Math.min(0.8, state.momoVY / 900));
    const imgW = 90;
    const imgH = 120;

    ctx.save();
    ctx.translate(state.momoX, state.momoY);
    ctx.rotate(angle);

    if (momoImg.complete && momoImg.naturalWidth > 0) {
      ctx.drawImage(momoImg, -imgW / 2, -imgH / 2, imgW, imgH);
    } else {
      ctx.fillStyle = "rgba(255,255,255,.85)";
      ctx.fillRect(-20, -20, 40, 40);
    }

    ctx.restore();
  }

  function loop(t) {
    if (!running) return;

    const dt = Math.min(0.032, (t - state.t0) / 1000);
    state.t0 = t;

    state.momoVY += (pressing ? state.lift : state.gravity) * dt;
    state.momoVY = Math.max(-850, Math.min(850, state.momoVY));
    state.momoY += state.momoVY * dt;

    state.spawnTimer += dt;
    if (state.spawnTimer >= state.nextSpawn) {
      state.spawnTimer = 0;
      state.nextSpawn = rand(0.35, 0.85);
      spawnMorango();
    }

    for (let i = state.morangos.length - 1; i >= 0; i--) {
      const m = state.morangos[i];
      m.x += m.vx * dt;
      if (m.x < -60) state.morangos.splice(i, 1);
    }

    checkCatchMorango();

    if (clampCollision()) {
      drawFrame();
      gameOver();
      return;
    }

    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  function resetGame() {
    state.score = 0;
    scoreEl.textContent = "0";
    state.morangos = [];
    state.spawnTimer = 0;
    state.nextSpawn = rand(0.45, 0.9);
    state.momoX = viewW * 0.35;
    state.momoY = viewH * 0.5;
    state.momoVY = 0;
    pressing = false;
    started = false;

    overlay.classList.remove("hidden");
    overlay.querySelector("h3").textContent = "Momo Voador";
    overlay.querySelector("p").innerHTML =
      "Pegue os morangos!<br />Segure para subir.<br />Solte para descer.<br />Não encoste no topo nem no fundo.";
    btnStart.textContent = "Começar";

    drawFrame();
  }

  function startGame() {
    if (running) return;
    running = true;
    started = true;
    overlay.classList.add("hidden");
    state.t0 = performance.now();
    rafId = requestAnimationFrame(loop);
  }

  function pauseGame() {
    running = false;
    pressing = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function gameOver() {
    pauseGame();

    const shownScore = state.score;
    state.best = Math.max(state.best, shownScore);
    localStorage.setItem("momo_best", String(state.best));
    bestEl.textContent = String(state.best);

    overlay.classList.remove("hidden");
    overlay.querySelector("h3").textContent = "Você perdeu :(";
    overlay.querySelector("p").innerHTML =
      `Você fez <strong>${shownScore}</strong> ponto(s).<br />Clique em reiniciar e tenta de novo.`;
    btnStart.textContent = "Reiniciar";
  }

  btnStart.addEventListener("click", () => {
    resetGame();
    startGame();
  });

  gameArea.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    if (!started) startGame();
    pressing = true;
  });

  gameArea.addEventListener("pointerup", () => (pressing = false));
  gameArea.addEventListener("pointerleave", () => (pressing = false));
  gameArea.addEventListener("pointercancel", () => (pressing = false));
  window.addEventListener("pointerup", () => (pressing = false));

  window.addEventListener("resize", () => {
    resizeCanvas();
    drawFrame();
  });

  return { resizeCanvas, resetGame, pauseGame };
}