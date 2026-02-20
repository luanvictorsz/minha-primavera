import "./style.css";
import momo from "../img/Momo.png";
import heart from "../img/heart.png";
import morango from "../img/morango.png";
import momoPhoto from "../img/momoPhoto.jpeg";

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
      <button id="tab-vazia" aria-selected="false">Sobre</button>
      <button id="tab-chat" aria-selected="false">Chat</button>
      <button id="tab-jogo" aria-selected="false">Jogo</button>
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

      <div id="pagina-vazia" style="height:100%; display:none; padding:16px;">
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

      <div id="pagina-chat" style="height:100%; display:none; padding:0;">
        <div style="
          height:100%;
          display:flex;
          flex-direction:column;
          background:#0b141a;
        ">
          <div style="
            display:flex;
            align-items:center;
            gap:10px;
            padding:12px 14px;
            background:#1f2c34;
            color:#e9edef;
            border-bottom:1px solid rgba(255,255,255,.08);
          ">
            <div style="
              width:36px; height:36px; border-radius:50%;
              overflow:hidden; flex:0 0 auto;
              border:1px solid rgba(255,255,255,.15);
            ">
              <img src="${momoPhoto}" alt="Foto" style="width:100%; height:100%; object-fit:cover;" />
            </div>
            <div style="display:flex; flex-direction:column; line-height:1.1;">
              <strong style="font-size:14px;">Misa</strong>
              <span style="font-size:12px; opacity:.8;">online</span>
            </div>
          </div>

          <div id="chat-messages" style="
            flex:1;
            overflow:auto;
            padding:14px;
            display:flex;
            flex-direction:column;
            gap:10px;
            background:
              radial-gradient(circle at 20% 10%, rgba(255,255,255,.06), transparent 40%),
              radial-gradient(circle at 80% 30%, rgba(255,255,255,.04), transparent 45%),
              #0b141a;
          "></div>

          <form id="chat-form" style="
            display:flex;
            gap:10px;
            padding:10px;
            background:#1f2c34;
            border-top:1px solid rgba(255,255,255,.08);
          ">
            <input
              id="chat-input"
              type="text"
              placeholder="Mensagem"
              autocomplete="off"
              style="
                flex:1;
                padding:12px 14px;
                border-radius:999px;
                border:1px solid rgba(255,255,255,.12);
                outline:none;
                background:#111b21;
                color:#e9edef;
              "
            />
            <button
              id="chat-send"
              type="submit"
              style="
                padding:12px 16px;
                border-radius:999px;
                border:0;
                background:#00a884;
                color:#062e24;
                font-weight:700;
                cursor:pointer;
              "
            >
              Enviar
            </button>
          </form>
        </div>
      </div>

      <!-- PÁGINA: JOGO -->
      <div id="pagina-jogo" style="height:100%; display:none; padding:14px;">
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
      </div>
    </div>
  </div>
`;

const tabPrincipal = document.querySelector("#tab-principal");
const tabVazia = document.querySelector("#tab-vazia");
const tabChat = document.querySelector("#tab-chat");
const tabJogo = document.querySelector("#tab-jogo");

const paginaPrincipal = document.querySelector("#pagina-principal");
const paginaVazia = document.querySelector("#pagina-vazia");
const paginaChat = document.querySelector("#pagina-chat");
const paginaJogo = document.querySelector("#pagina-jogo");

function trocarPagina(pagina) {
  const principalAtiva = pagina === "principal";
  const vaziaAtiva = pagina === "vazia";
  const chatAtiva = pagina === "chat";
  const jogoAtiva = pagina === "jogo";

  tabPrincipal.setAttribute("aria-selected", String(principalAtiva));
  tabVazia.setAttribute("aria-selected", String(vaziaAtiva));
  tabChat.setAttribute("aria-selected", String(chatAtiva));
  tabJogo.setAttribute("aria-selected", String(jogoAtiva));

  paginaPrincipal.style.display = principalAtiva ? "flex" : "none";
  paginaVazia.style.display = vaziaAtiva ? "block" : "none";
  paginaChat.style.display = chatAtiva ? "block" : "none";
  paginaJogo.style.display = jogoAtiva ? "block" : "none";

  if (jogoAtiva) {
    requestAnimationFrame(() => {
      resizeCanvas();
      resetGame();
    });
  } else {
    pauseGame();
  }
}

tabPrincipal.addEventListener("click", () => trocarPagina("principal"));
tabVazia.addEventListener("click", () => trocarPagina("vazia"));
tabChat.addEventListener("click", () => trocarPagina("chat"));
tabJogo.addEventListener("click", () => trocarPagina("jogo"));

const spanFrase = document.querySelector("#frase");
const botao = document.querySelector("#btnMomo");

function fraseAleatoria() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

spanFrase.textContent = fraseAleatoria();

const appRoot = document.querySelector("#app");
const areaBaloes = paginaPrincipal;

appRoot.style.position = "relative";
appRoot.style.overflow = "visible";

areaBaloes.style.position = "relative";
areaBaloes.style.overflow = "hidden";
areaBaloes.style.minHeight = "100%";

function criarBalao(clientX, clientY) {
  const img = document.createElement("img");
  img.src = heart;
  img.alt = "";
  img.className = "heart-img";

  const rect = areaBaloes.getBoundingClientRect();
  const left = clientX - rect.left;
  const top = clientY - rect.top;

  img.style.left = `${left}px`;
  img.style.top = `${top}px`;

  const size = 28 + Math.random() * 42;
  const dur = 1.2 + Math.random() * 1.2;
  const drift = (Math.random() * 2 - 1) * 60;

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

const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");

const mensagensIniciais = [
  { from: "them", text: "oiê" },
  { from: "me", text: "oiê, como prefere que eu salvo aqui?" },
  { from: "them", text: "Como quiser" },
  { from: "them", text: "Misa" },
  { from: "them", text: "Misaki" },
  { from: "them", text: "🦇" },
  { from: "me", text: "ok ok" },
  { from: "me", text: "depois eu coloco o restante de nossas conversas amor, te amo." },
];

function addMessage({ from, text }) {
  const wrap = document.createElement("div");
  wrap.style.display = "flex";
  wrap.style.justifyContent = from === "me" ? "flex-end" : "flex-start";

  const bubble = document.createElement("div");
  bubble.textContent = text;
  bubble.style.maxWidth = "78%";
  bubble.style.padding = "10px 12px";
  bubble.style.borderRadius = "14px";
  bubble.style.fontSize = "14px";
  bubble.style.lineHeight = "1.25";
  bubble.style.whiteSpace = "pre-wrap";
  bubble.style.wordBreak = "break-word";

  if (from === "me") {
    bubble.style.background = "#005c4b";
    bubble.style.color = "#e9edef";
    bubble.style.borderTopRightRadius = "6px";
  } else {
    bubble.style.background = "#202c33";
    bubble.style.color = "#e9edef";
    bubble.style.borderTopLeftRadius = "6px";
  }

  wrap.appendChild(bubble);
  chatMessages.appendChild(wrap);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

mensagensIniciais.forEach(addMessage);

function responderAuto() {
  const respostas = ["Eu te amo", "tô com saudade 🥺", "aish", "meu vampirinho", fraseAleatoria()];
  const text = respostas[Math.floor(Math.random() * respostas.length)];
  addMessage({ from: "them", text });
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage({ from: "me", text });
  chatInput.value = "";

  const typing = { from: "them", text: "digitando..." };
  addMessage(typing);

  setTimeout(() => {
    const last = chatMessages.lastElementChild;
    if (last && last.textContent.includes("digitando...")) last.remove();
    responderAuto();
  }, 700 + Math.random() * 800);
});

const gameArea = document.querySelector("#game-area");
const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const overlay = document.querySelector("#game-overlay");
const btnStart = document.querySelector("#btnStart");
const scoreEl = document.querySelector("#score");
const bestEl = document.querySelector("#best");

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

  // MORANGOS
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

window.addEventListener("resize", () => {
  if (paginaJogo.style.display !== "none") {
    resizeCanvas();
    drawFrame();
  }
});

function spawnMorango() {
  const pad = 24;
  const y = rand(pad, viewH - pad);
  const speed = rand(state.morangoMinSpeed, state.morangoMaxSpeed);

  state.morangos.push({
    x: viewW + 40,
    y,
    vx: -speed,
    r: state.morangoRadius,
  });
}

function checkCatchMorango() {
  const catchR = state.radius * 0.85;

  for (let i = state.morangos.length - 1; i >= 0; i--) {
    const m = state.morangos[i];
    const dx = m.x - state.momoX;
    const dy = m.y - state.momoY;
    const rr = m.r + catchR;

    if (dx * dx + dy * dy <= rr * rr) {
      state.morangos.splice(i, 1);
      state.score += 1;
      scoreEl.textContent = String(state.score);
    }
  }
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

function clampCollision() {
  if (state.momoY - state.radius <= 10) return true;
  if (state.momoY + state.radius >= viewH - 10) return true;
  return false;
}

function loop(t) {
  if (!running) return;

  const dt = Math.min(0.032, (t - state.t0) / 1000);
  state.t0 = t;

  if (pressing) {
    state.momoVY += state.lift * dt;
  } else {
    state.momoVY += state.gravity * dt;
  }

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

requestAnimationFrame(() => {
  if (paginaJogo.style.display !== "none") {
    resizeCanvas();
    resetGame();
  }
});