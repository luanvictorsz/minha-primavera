import momo from "../../img/momoCar.png";
import { addTotalMorangos } from "../../src/pages/momoskins.js";

export function criarPaginaInfiniteJogo(container) {
  container.innerHTML = `
    <div class="inf-shell">
      <div class="inf-hud">
        <div class="inf-hud__item">
          <span class="inf-hud__label">PONTOS</span>
          <span class="inf-hud__val" id="inf-score">0</span>
        </div>
        <div class="inf-hud__item">
          <span class="inf-hud__label">RECORDE</span>
          <span class="inf-hud__val" id="inf-best">0</span>
        </div>
        <div class="inf-hud__item">
          <span class="inf-hud__label">MORANGOS</span>
          <span class="inf-hud__val" id="inf-morangos">0</span>
        </div>
      </div>

      <div id="inf-area" class="inf-area">
        <canvas id="inf-canvas"></canvas>

        <div id="inf-overlay" class="inf-overlay">
          <div class="inf-card">
            <div class="inf-card__title" id="inf-title">Infinite Momo</div>
            <p class="inf-card__desc" id="inf-desc">
              Pule os obstáculos e colete morangos!<br/>
              <strong>Espaço / Toque</strong> para pular.<br/>
              Pule duas vezes para um salto duplo!
            </p>
            <div class="inf-card__controls">
              <div class="inf-key">ESPAÇO</div>
              <span style="opacity:.5">ou</span>
              <div class="inf-key">TOQUE</div>
            </div>
            <button id="inf-btn" class="inf-btn">Começar</button>
          </div>
        </div>
      </div>

      <div class="inf-help">Pule = Espaço / Toque &nbsp;•&nbsp; Duplo pulo disponível!</div>
    </div>

    <style>
      .inf-shell {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #080d12;
        font-family: 'Courier New', monospace;
        color: #e8f4f0;
        user-select: none;
      }

      .inf-hud {
        display: flex;
        justify-content: center;
        gap: 32px;
        padding: 10px 16px;
        border-bottom: 1px solid rgba(0,200,140,.15);
        background: rgba(0,0,0,.4);
        flex-shrink: 0;
      }

      .inf-hud__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
      }

      .inf-hud__label {
        font-size: .6rem;
        letter-spacing: .12em;
        opacity: .45;
      }

      .inf-hud__val {
        font-size: 1.1rem;
        font-weight: 700;
        color: #00e8a0;
        letter-spacing: .04em;
        min-width: 48px;
        text-align: center;
      }

      .inf-area {
        flex: 1;
        position: relative;
        overflow: hidden;
        cursor: pointer;
      }

      #inf-canvas {
        display: block;
        width: 100%;
        height: 100%;
      }

      .inf-overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(8,13,18,.78);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        transition: opacity .25s;
      }

      .inf-overlay.hidden {
        display: none;
      }

      .inf-card {
        background: rgba(0,200,140,.07);
        border: 1px solid rgba(0,200,140,.25);
        border-radius: 18px;
        padding: 28px 32px;
        text-align: center;
        max-width: 320px;
        width: 88%;
        box-shadow: 0 0 40px rgba(0,200,140,.08);
      }

      .inf-card__title {
        font-size: 1.7rem;
        font-weight: 900;
        color: #00e8a0;
        letter-spacing: .04em;
        margin-bottom: 10px;
        text-shadow: 0 0 20px rgba(0,232,160,.4);
      }

      .inf-card__desc {
        margin: 0 0 16px;
        opacity: .85;
        font-size: .88rem;
        line-height: 1.6;
      }

      .inf-card__controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 20px;
        font-size: .8rem;
      }

      .inf-key {
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 6px;
        padding: 3px 10px;
        font-size: .72rem;
        letter-spacing: .06em;
      }

      .inf-btn {
        background: linear-gradient(135deg, #00c880, #00a060);
        border: none;
        color: #000;
        font-weight: 800;
        font-size: 1rem;
        letter-spacing: .06em;
        padding: 12px 40px;
        border-radius: 10px;
        cursor: pointer;
        font-family: 'Courier New', monospace;
        transition: transform .1s, box-shadow .1s;
        box-shadow: 0 4px 20px rgba(0,200,140,.3);
      }

      .inf-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 28px rgba(0,200,140,.45);
      }

      .inf-btn:active {
        transform: translateY(0);
      }

      .inf-help {
        text-align: center;
        font-size: .72rem;
        opacity: .3;
        padding: 8px;
        letter-spacing: .06em;
        flex-shrink: 0;
      }
    </style>
  `;

  const area      = container.querySelector("#inf-area");
  const canvas    = container.querySelector("#inf-canvas");
  const ctx       = canvas.getContext("2d");
  const overlay   = container.querySelector("#inf-overlay");
  const btn       = container.querySelector("#inf-btn");
  const scoreEl   = container.querySelector("#inf-score");
  const bestEl    = container.querySelector("#inf-best");
  const morangosEl= container.querySelector("#inf-morangos");
  const titleEl   = container.querySelector("#inf-title");
  const descEl    = container.querySelector("#inf-desc");

  const momoImg = new Image();
  momoImg.src = momo;
  let momoW = 72, momoH = 72;
  momoImg.onload = () => {
    const r = momoImg.naturalHeight / momoImg.naturalWidth;
    momoW = 72; momoH = Math.round(72 * r);
  };

  let vW = 0, vH = 0, dpr = 1;

  const GROUND_H   = 56;  
  const GRAVITY     = 2400;
  const JUMP_V      = -820;
  const DOUBLE_JUMP_V = -700;

  const state = {
    running: false,
    started: false,
    t0: 0,
    elapsed: 0,
    score: 0,
    best: Number(localStorage.getItem("inf_momo_best") || 0),
    sessionMorangos: 0,

    x: 0,
    y: 0,
    vy: 0,
    onGround: false,
    jumpsLeft: 0,  
    jumping: false,
    squash: 1,      
    squashV: 0,

    trail: [],

    speed: 320,
    maxSpeed: 900,

    obstacles: [],
    obsTimer: 0,
    nextObs: 1.2,

    coins: [],
    coinTimer: 0,
    nextCoin: 0.6,

    bgLayers: [
      { x: 0, parallax: 0.15, color: "rgba(0,200,140,.03)", h: 0.6 },
      { x: 0, parallax: 0.3,  color: "rgba(0,200,140,.05)", h: 0.4 },
      { x: 0, parallax: 0.55, color: "rgba(0,200,140,.08)", h: 0.25 },
    ],

    groundDeco: [],
  };

  bestEl.textContent = String(state.best);

  const rand   = (a, b) => a + Math.random() * (b - a);
  const randInt= (a, b) => Math.floor(rand(a, b + 1));
  const groundY = () => vH - GROUND_H;

  function momoRect() {
    const hw = momoW * 0.38;
    const hh = momoH * 0.42;
    return { x: state.x - hw, y: state.y - hh, w: hw * 2, h: hh * 2 };
  }

  function rectsOverlap(a, b, shrink = 6) {
    return (
      a.x + shrink < b.x + b.w - shrink &&
      a.x + a.w - shrink > b.x + shrink &&
      a.y + shrink < b.y + b.h - shrink &&
      a.y + a.h - shrink > b.y + shrink
    );
  }

  function resizeCanvas() {
    const rect = area.getBoundingClientRect();
    vW = rect.width;
    vH = rect.height;
    dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width  = Math.floor(vW * dpr);
    canvas.height = Math.floor(vH * dpr);
    canvas.style.width  = `${vW}px`;
    canvas.style.height = `${vH}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    state.x = vW * 0.22;
    state.y = groundY();

    if (!state.running) drawFrame();
  }

  const OBS_TYPES = ["low", "tall", "double", "floating"];

  function spawnObstacle() {
    const gY = groundY();
    const type = OBS_TYPES[randInt(0, OBS_TYPES.length - 1)];
    const speed = state.speed;

    if (type === "low") {
      state.obstacles.push({
        type, x: vW + 20,
        y: gY - 36, w: 28, h: 36,
        color: "#e05060", vx: -speed,
      });
    } else if (type === "tall") {
      const h = randInt(52, 80);
      state.obstacles.push({
        type, x: vW + 20,
        y: gY - h, w: 22, h,
        color: "#e05060", vx: -speed,
      });
    } else if (type === "double") {

    const h1 = 36, h2 = randInt(28, 44);
      state.obstacles.push(
        { type, x: vW + 20,  y: gY - h1, w: 24, h: h1, color: "#e05060", vx: -speed },
        { type, x: vW + 56,  y: gY - h2, w: 20, h: h2, color: "#c04050", vx: -speed },
      );
    } else { 
      const floatY = gY - randInt(90, 150);
      state.obstacles.push({
        type, x: vW + 20,
        y: floatY, w: 32, h: 28,
        color: "#6060e0", vx: -speed,
      });
    }
  }

  function spawnCoin() {
    const gY = groundY();
    const floatH = randInt(50, 130);
    state.coins.push({
      x: vW + 20,
      y: gY - floatH,
      r: 10,
      vx: -state.speed,
      pulse: Math.random() * Math.PI * 2,
      collected: false,
    });
  }

  function spawnGroundDeco() {
    state.groundDeco.push({
      x: vW + 10,
      h: randInt(4, 12),
      w: randInt(3, 7),
      color: `rgba(0,200,140,${rand(0.06,0.18)})`,
    });
  }

  function doJump() {
    if (!state.running) return;

    if (state.onGround) {
      state.vy = JUMP_V;
      state.onGround = false;
      state.jumpsLeft = 1; 
      state.squash = 1.35;
      state.squashV = -0.08;
    } else if (state.jumpsLeft > 0) {
      state.vy = DOUBLE_JUMP_V;
      state.jumpsLeft = 0;
      state.squash = 1.2;
      state.squashV = -0.06;

      for (let i = 0; i < 6; i++) {
        state.trail.push({
          x: state.x,
          y: state.y + momoH * 0.4,
          vx: rand(-60, 60),
          vy: rand(40, 140),
          life: 0.4,
          maxLife: 0.4,
          r: rand(3, 6),
        });
      }
    }
  }

  function onJumpInput(e) {
    e.preventDefault();
    if (!state.started) {
      startGame();
      return;
    }
    doJump();
  }

  let rafId = 0;

  function loop(t) {
    if (!state.running) return;

    const dt = Math.min(0.033, (t - state.t0) / 1000);
    state.t0 = t;
    state.elapsed += dt;

    state.speed = Math.min(state.maxSpeed, 320 + state.elapsed * 28);

    const gY = groundY();

    state.vy += GRAVITY * dt;
    state.y  += state.vy * dt;

    if (state.y >= gY) {
      state.y = gY;
      state.vy = 0;
      if (!state.onGround) {
        state.squash = 0.72; 
        state.squashV = 0.14;
      }
      state.onGround = true;
      state.jumpsLeft = 2;
    } else {
      state.onGround = false;
    }

    state.squash += state.squashV;
    state.squashV += (1 - state.squash) * 0.3;
    state.squashV *= 0.75;
    state.squash = Math.max(0.6, Math.min(1.5, state.squash));

    const prevScore = state.score;
    state.score = Math.floor(state.elapsed * 12 + state.coins.filter(c => c.collected).length * 5);
    if (state.score !== prevScore) scoreEl.textContent = String(state.score);

    state.trail.push({
      x: state.x - momoW * 0.3,
      y: state.y,
      vx: rand(-20, -60),
      vy: rand(-15, 15),
      life: 0.22,
      maxLife: 0.22,
      r: rand(3, 7),
    });

    for (let i = state.trail.length - 1; i >= 0; i--) {
      const p = state.trail[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.life -= dt;
      if (p.life <= 0) state.trail.splice(i, 1);
    }

    state.obsTimer += dt;
    if (state.obsTimer >= state.nextObs) {
      state.obsTimer = 0;
      state.nextObs = rand(0.7, 1.6) * Math.max(0.55, 320 / state.speed);
      spawnObstacle();
    }

    for (let i = state.obstacles.length - 1; i >= 0; i--) {
      const o = state.obstacles[i];
      o.x += o.vx * dt * (state.speed / 320);
      if (o.x + o.w < -20) { state.obstacles.splice(i, 1); continue; }

      if (rectsOverlap(momoRect(), o)) {
        drawFrame();
        gameOver();
        return;
      }
    }

    state.coinTimer += dt;
    if (state.coinTimer >= state.nextCoin) {
      state.coinTimer = 0;
      state.nextCoin = rand(0.5, 1.1);
      spawnCoin();
    }

    for (let i = state.coins.length - 1; i >= 0; i--) {
      const c = state.coins[i];
      c.x += c.vx * dt * (state.speed / 320);
      c.pulse += dt * 4;
      if (c.x < -30) { state.coins.splice(i, 1); continue; }
      if (!c.collected) {
        const mr = momoRect();
        const cx = mr.x + mr.w / 2;
        const cy = mr.y + mr.h / 2;
        const dx = c.x - cx;
        const dy = c.y - cy;
        if (dx*dx + dy*dy <= (c.r + 22)**2) {
          c.collected = true;
          state.sessionMorangos += 1;
          morangosEl.textContent = String(state.sessionMorangos);
          addTotalMorangos(1);

          for (let p = 0; p < 8; p++) {
            state.trail.push({
              x: c.x, y: c.y,
              vx: rand(-90, 90), vy: rand(-120, 30),
              life: 0.5, maxLife: 0.5, r: rand(2, 5),
              color: "#ff6080",
            });
          }
        }
      }
    }

    for (const layer of state.bgLayers) {
      layer.x -= state.speed * layer.parallax * dt;
      if (layer.x < -vW) layer.x += vW;
    }

    if (Math.random() < dt * 3) spawnGroundDeco();
    for (let i = state.groundDeco.length - 1; i >= 0; i--) {
      const d = state.groundDeco[i];
      d.x -= state.speed * dt;
      if (d.x < -20) state.groundDeco.splice(i, 1);
    }

    drawFrame();
    rafId = requestAnimationFrame(loop);
  }

  function drawFrame() {
    if (!vW || !vH) return;
    ctx.clearRect(0, 0, vW, vH);

    const gY = groundY();

    const sky = ctx.createLinearGradient(0, 0, 0, vH);
    sky.addColorStop(0,   "#0a1520");
    sky.addColorStop(0.6, "#0d1e2a");
    sky.addColorStop(1,   "#0b1218");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, vW, vH);

    ctx.fillStyle = "rgba(255,255,255,.35)";
    for (let i = 0; i < 60; i++) {
      const sx = (Math.sin(i * 127.1) * 0.5 + 0.5) * vW;
      const sy = (Math.sin(i * 311.7) * 0.5 + 0.5) * gY * 0.9;
      const sr = (Math.sin(i * 74.3) * 0.5 + 0.5) * 1.3;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const layer of state.bgLayers) {
      drawMountains(layer.x, gY, layer.h, layer.color, 7 + state.bgLayers.indexOf(layer) * 2);
      drawMountains(layer.x + vW, gY, layer.h, layer.color, 7 + state.bgLayers.indexOf(layer) * 2);
    }

    const gGrad = ctx.createLinearGradient(0, gY, 0, vH);
    gGrad.addColorStop(0, "#0f2218");
    gGrad.addColorStop(1, "#071008");
    ctx.fillStyle = gGrad;
    ctx.fillRect(0, gY, vW, vH - gY);

    ctx.strokeStyle = "rgba(0,200,140,.35)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, gY);
    ctx.lineTo(vW, gY);
    ctx.stroke();

    for (const d of state.groundDeco) {
      ctx.fillStyle = d.color;
      ctx.fillRect(d.x, gY - d.h, d.w, d.h);
    }

    if (state.running) {
      ctx.strokeStyle = "rgba(0,200,140,.08)";
      ctx.lineWidth = 1;
      const lineOffset = (state.elapsed * state.speed * 0.5) % 80;
      for (let lx = -lineOffset; lx < vW + 80; lx += 80) {
        ctx.beginPath();
        ctx.moveTo(lx, gY + 8);
        ctx.lineTo(lx + 40, gY + 8);
        ctx.stroke();
      }
    }

    for (const p of state.trail) {
      const alpha = p.life / p.maxLife;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * alpha, 0, Math.PI * 2);
      ctx.fillStyle = p.color
        ? p.color.replace(")", `,${alpha * 0.9})`)
        : `rgba(0,220,150,${alpha * 0.55})`;
      ctx.fill();
    }

    for (const c of state.coins) {
      if (c.collected) continue;
      const pulse = 1 + Math.sin(c.pulse) * 0.12;
      const r = c.r * pulse;

      const cg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, r * 2.5);
      cg.addColorStop(0, "rgba(255,80,120,.3)");
      cg.addColorStop(1, "rgba(255,80,120,0)");
      ctx.beginPath();
      ctx.arc(c.x, c.y, r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = cg;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(c.x, c.y, r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,80,120,.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,180,200,.6)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = "#50e090";
      ctx.beginPath();
      ctx.ellipse(c.x, c.y - r - 2, 3, 5, -0.3, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const o of state.obstacles) {
      drawObstacle(o);
    }

    const mx = state.x;
    const my = state.y;
    const sx = 1 / state.squash;
    const sy = state.squash;

    ctx.save();
    ctx.translate(mx, my);
    ctx.scale(sx, sy);

    if (momoImg.complete && momoImg.naturalWidth > 0) {
      ctx.drawImage(momoImg, -momoW / 2, -momoH / 2, momoW, momoH);
    } else {
      ctx.fillStyle = "#fff";
      ctx.fillRect(-20, -20, 40, 40);
    }
    ctx.restore();

    if (!state.onGround && state.jumpsLeft > 0 && state.running) {
      ctx.fillStyle = "rgba(0,232,160,.65)";
      ctx.beginPath();
      ctx.arc(mx, my - momoH * 0.65, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawMountains(offsetX, baseY, heightFactor, color, peaks) {
    ctx.beginPath();
    ctx.moveTo(offsetX, baseY);
    const segW = vW / peaks;
    for (let i = 0; i <= peaks; i++) {
      const px = offsetX + i * segW;
      const ph = baseY * heightFactor * (0.5 + Math.sin(i * 1.7) * 0.5);
      if (i === 0) ctx.lineTo(px, baseY - ph);
      else {
        const cpx = px - segW / 2;
        const cpy = baseY - ph * 0.3;
        ctx.quadraticCurveTo(cpx, cpy, px, baseY - ph);
      }
    }
    ctx.lineTo(offsetX + vW, baseY);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawObstacle(o) {
    // Shadow
    ctx.fillStyle = "rgba(0,0,0,.25)";
    ctx.fillRect(o.x + 4, o.y + o.h - 4, o.w, 8);

    const og = ctx.createLinearGradient(o.x, o.y, o.x + o.w, o.y + o.h);
    og.addColorStop(0, o.type === "floating" ? "#7070f0" : "#f06070");
    og.addColorStop(1, o.type === "floating" ? "#4040c0" : "#a03040");
    ctx.fillStyle = og;

    if (o.type === "floating") {
      roundRect(ctx, o.x, o.y, o.w, o.h, 6);
      ctx.fill();
      ctx.strokeStyle = "rgba(180,180,255,.4)";
      ctx.lineWidth = 1.5;
      roundRect(ctx, o.x + 2, o.y + 2, o.w - 4, o.h - 4, 4);
      ctx.stroke();
    } else {
      roundRect(ctx, o.x, o.y, o.w, o.h, 4);
      ctx.fill();
      if (o.h > 40) {
        ctx.fillStyle = o.type === "tall" ? "#e05060" : o.color;
        ctx.fillRect(o.x - 10, o.y + o.h * 0.3, 10, 14);
        roundRect(ctx, o.x - 10, o.y + o.h * 0.15, 10, o.h * 0.3 + 2, 3);
        ctx.fill();
      }
      ctx.strokeStyle = "rgba(255,160,160,.25)";
      ctx.lineWidth = 1;
      roundRect(ctx, o.x + 1, o.y + 1, o.w - 2, o.h - 2, 3);
      ctx.stroke();
    }
  }

  function roundRect(c, x, y, w, h, r) {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  }

  function startGame() {
    if (state.running) return;
    state.running = true;
    state.started = true;
    overlay.classList.add("hidden");
    state.t0 = performance.now();
    rafId = requestAnimationFrame(loop);
  }

  function pauseGame() {
    state.running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function resetGame() {
    pauseGame();

    state.elapsed = 0;
    state.score = 0;
    state.sessionMorangos = 0;
    state.speed = 320;
    state.obstacles = [];
    state.coins = [];
    state.trail = [];
    state.groundDeco = [];
    state.obsTimer = 0;
    state.nextObs = 1.1;
    state.coinTimer = 0;
    state.nextCoin = rand(0.5, 1.0);
    state.vy = 0;
    state.onGround = true;
    state.jumpsLeft = 2;
    state.squash = 1;
    state.squashV = 0;
    state.started = false;

    state.bgLayers.forEach(l => { l.x = 0; });

    state.x = vW * 0.22;
    state.y = groundY();

    scoreEl.textContent = "0";
    morangosEl.textContent = "0";

    overlay.classList.remove("hidden");
    titleEl.textContent = "Infinite Momo";
    descEl.innerHTML =
      "Pule os obstáculos e colete morangos!<br/>" +
      "<strong>Espaço / Toque</strong> para pular.<br/>" +
      "Pule duas vezes para um salto duplo!";
    btn.textContent = "Começar";

    drawFrame();
  }

  function gameOver() {
    pauseGame();

    const s = state.score;
    state.best = Math.max(state.best, s);
    localStorage.setItem("inf_momo_best", String(state.best));
    bestEl.textContent = String(state.best);

    overlay.classList.remove("hidden");
    titleEl.textContent = "Game Over!";
    descEl.innerHTML =
      `Pontuação: <strong style="color:#00e8a0;font-size:1.2em">${s}</strong><br/>` +
      `Morangos: <strong style="color:#ff6080">${state.sessionMorangos} 🍓</strong><br/>` +
      `Recorde: <strong>${state.best}</strong>`;
    btn.textContent = "Tentar Novamente";
  }

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    resetGame();
    startGame();
  });

  area.addEventListener("pointerdown", onJumpInput);

  window.addEventListener("keydown", (e) => {
    if (e.code === "Space" || e.code === "ArrowUp") {
      onJumpInput(e);
    }
  });

  window.addEventListener("resize", () => {
    resizeCanvas();
    if (!state.running) drawFrame();
  });

  resizeCanvas();
  drawFrame();

  return { resizeCanvas, resetGame, pauseGame };
}
