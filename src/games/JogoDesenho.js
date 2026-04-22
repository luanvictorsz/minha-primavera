export function criarPaginaDesenho(container) {
  container.innerHTML = `
    <div class="draw-shell">

      <!-- Toolbar -->
      <div class="draw-toolbar">

        <!-- Colors -->
        <div class="draw-section">
          <div class="draw-colors" id="draw-colors">
            <button class="draw-color active" data-color="#e8f4f0" style="background:#e8f4f0" title="Branco"></button>
            <button class="draw-color" data-color="#00e8a0" style="background:#00e8a0" title="Verde"></button>
            <button class="draw-color" data-color="#4d9fff" style="background:#4d9fff" title="Azul"></button>
            <button class="draw-color" data-color="#ff5577" style="background:#ff5577" title="Rosa"></button>
            <button class="draw-color" data-color="#ffcc44" style="background:#ffcc44" title="Amarelo"></button>
            <button class="draw-color" data-color="#ff8844" style="background:#ff8844" title="Laranja"></button>
            <button class="draw-color" data-color="#cc88ff" style="background:#cc88ff" title="Roxo"></button>
            <button class="draw-color" data-color="#ff6080" style="background:#ff6080" title="Vermelho"></button>
            <label class="draw-color draw-color--custom" title="Cor personalizada">
              <span>🎨</span>
              <input type="color" id="custom-color" value="#00e8a0" />
            </label>
          </div>
        </div>

        <div class="draw-divider"></div>

        <!-- Tools -->
        <div class="draw-section draw-section--tools">
          <button class="draw-tool active" id="tool-brush" title="Pincel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
            </svg>
          </button>
          <button class="draw-tool" id="tool-eraser" title="Borracha">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 20H7L3 16l10-10 7 7-3.5 3.5"/><path d="M6.5 17.5l5-5"/>
            </svg>
          </button>
          <button class="draw-tool" id="tool-fill" title="Preencher">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 11l-8-8-8.5 8.5a5.5 5.5 0 0 0 7.78 7.78L19 11z"/><path d="M20 16s0 3-2 5"/><path d="M22 21H18"/>
            </svg>
          </button>
        </div>

        <div class="draw-divider"></div>

        <!-- Brush size -->
        <div class="draw-section draw-section--size">
          <span class="draw-size-label">Tamanho</span>
          <input type="range" id="brush-size" min="1" max="60" value="8" class="draw-slider" />
          <div class="draw-size-preview" id="size-preview"></div>
        </div>

        <div class="draw-divider"></div>

        <!-- Actions -->
        <div class="draw-section draw-section--actions">
          <button class="draw-action" id="btn-undo" title="Desfazer">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 7v6h6"/><path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"/>
            </svg>
          </button>
          <button class="draw-action" id="btn-clear" title="Limpar tudo">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
            </svg>
          </button>
          <button class="draw-action draw-action--save" id="btn-save" title="Salvar imagem">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Canvas area -->
      <div class="draw-canvas-wrap" id="draw-canvas-wrap">
        <canvas id="draw-canvas"></canvas>
        <div class="draw-cursor" id="draw-cursor"></div>
      </div>

      <!-- Status bar -->
      <div class="draw-statusbar">
        <span id="draw-status">🖌️ Pronto para desenhar!</span>
        <span id="draw-coords" class="draw-coords"></span>
      </div>

    </div>

    <style>
      .draw-shell {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #080e13;
        font-family: 'Courier New', monospace;
        overflow: hidden;
        user-select: none;
      }

      /* ── Toolbar ── */
      .draw-toolbar {
        display: flex;
        align-items: center;
        gap: 0;
        padding: 8px 10px;
        background: #0d1923;
        border-bottom: 1px solid rgba(0,200,140,.15);
        flex-wrap: nowrap;
        overflow-x: auto;
        flex-shrink: 0;
        scrollbar-width: none;
        gap: 4px;
      }
      .draw-toolbar::-webkit-scrollbar { display: none; }

      .draw-section {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
      }

      .draw-divider {
        width: 1px;
        height: 28px;
        background: rgba(255,255,255,.08);
        margin: 0 6px;
        flex-shrink: 0;
      }

      /* Colors */
      .draw-colors {
        display: flex;
        gap: 5px;
        align-items: center;
      }

      .draw-color {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 2px solid transparent;
        cursor: pointer;
        transition: transform .1s, border-color .1s;
        flex-shrink: 0;
        padding: 0;
      }
      .draw-color:hover { transform: scale(1.2); }
      .draw-color.active {
        border-color: #fff;
        transform: scale(1.18);
        box-shadow: 0 0 0 2px rgba(0,0,0,.6);
      }

      .draw-color--custom {
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg,#ff5577,#ffcc44,#00e8a0,#4d9fff);
        font-size: 11px;
        position: relative;
        cursor: pointer;
      }
      .draw-color--custom input {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
        width: 100%;
        height: 100%;
      }
      .draw-color--custom span { pointer-events: none; }

      /* Tools */
      .draw-section--tools { gap: 4px; }
      .draw-tool {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: 1.5px solid rgba(255,255,255,.1);
        background: rgba(255,255,255,.04);
        color: rgba(255,255,255,.5);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .15s, color .15s, border-color .15s, transform .1s;
        padding: 0;
      }
      .draw-tool:hover {
        background: rgba(255,255,255,.1);
        color: #fff;
        border-color: rgba(255,255,255,.25);
      }
      .draw-tool:active { transform: scale(.92); }
      .draw-tool.active {
        background: rgba(0,200,140,.18);
        border-color: rgba(0,200,140,.6);
        color: #00e8a0;
      }

      /* Size */
      .draw-section--size {
        gap: 8px;
      }
      .draw-size-label {
        font-size: .6rem;
        opacity: .4;
        letter-spacing: .08em;
        text-transform: uppercase;
        color: #e8f4f0;
        white-space: nowrap;
      }
      .draw-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 80px;
        height: 4px;
        border-radius: 2px;
        background: rgba(255,255,255,.12);
        outline: none;
        cursor: pointer;
      }
      .draw-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #00e8a0;
        cursor: pointer;
        box-shadow: 0 0 6px rgba(0,232,160,.5);
        transition: transform .1s;
      }
      .draw-slider::-webkit-slider-thumb:hover { transform: scale(1.3); }
      .draw-slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #00e8a0;
        cursor: pointer;
        border: none;
      }
      .draw-size-preview {
        background: #e8f4f0;
        border-radius: 50%;
        flex-shrink: 0;
        transition: width .1s, height .1s;
      }

      /* Actions */
      .draw-section--actions { gap: 4px; }
      .draw-action {
        width: 34px;
        height: 34px;
        border-radius: 8px;
        border: 1.5px solid rgba(255,255,255,.1);
        background: rgba(255,255,255,.04);
        color: rgba(255,255,255,.5);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background .15s, color .15s, border-color .15s, transform .1s;
        padding: 0;
      }
      .draw-action:hover {
        background: rgba(255,255,255,.1);
        color: #fff;
        border-color: rgba(255,255,255,.25);
      }
      .draw-action:active { transform: scale(.92); }
      .draw-action--save {
        background: rgba(0,200,140,.12);
        border-color: rgba(0,200,140,.35);
        color: #00e8a0;
      }
      .draw-action--save:hover {
        background: rgba(0,200,140,.24);
        border-color: rgba(0,200,140,.6);
        color: #00e8a0;
      }

      /* Canvas wrap */
      .draw-canvas-wrap {
        flex: 1;
        position: relative;
        overflow: hidden;
        background:
          linear-gradient(rgba(0,200,140,.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,200,140,.03) 1px, transparent 1px);
        background-size: 32px 32px;
        background-color: #0a0f14;
        cursor: crosshair;
      }

      #draw-canvas {
        position: absolute;
        top: 0; left: 0;
        touch-action: none;
        cursor: none;
      }

      /* Custom cursor */
      .draw-cursor {
        position: absolute;
        border-radius: 50%;
        border: 1.5px solid rgba(255,255,255,.7);
        pointer-events: none;
        transform: translate(-50%, -50%);
        transition: width .1s, height .1s;
        z-index: 10;
        display: none;
        box-shadow: 0 0 6px rgba(0,0,0,.5);
      }

      /* Status bar */
      .draw-statusbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 5px 12px;
        background: #0d1923;
        border-top: 1px solid rgba(0,200,140,.1);
        font-size: .65rem;
        opacity: .6;
        color: #e8f4f0;
        letter-spacing: .04em;
        flex-shrink: 0;
      }
      .draw-coords { font-variant-numeric: tabular-nums; }

      /* Toast */
      .draw-toast {
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,232,160,.9);
        color: #000;
        padding: 8px 18px;
        border-radius: 999px;
        font-size: .78rem;
        font-weight: 700;
        letter-spacing: .04em;
        pointer-events: none;
        animation: drawToast .2s ease;
        z-index: 20;
        white-space: nowrap;
      }
      @keyframes drawToast {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to   { opacity: 1; transform: translateX(-50%) translateY(0); }
      }
    </style>
  `;

  const canvasWrap  = container.querySelector("#draw-canvas-wrap");
  const canvas      = container.querySelector("#draw-canvas");
  const ctx         = canvas.getContext("2d");
  const cursor      = container.querySelector("#draw-cursor");
  const brushSlider = container.querySelector("#brush-size");
  const sizePreview = container.querySelector("#size-preview");
  const statusEl    = container.querySelector("#draw-status");
  const coordsEl    = container.querySelector("#draw-coords");
  const customColor = container.querySelector("#custom-color");

  let tool       = "brush"; 
  let color      = "#e8f4f0";
  let brushSize  = 8;
  let drawing    = false;
  let lastX      = 0;
  let lastY      = 0;
  let undoStack  = [];
  const MAX_UNDO = 30;

  function resizeCanvas() {
    const rect = canvasWrap.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const imgData = canvas.width > 0 ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;

    canvas.width  = Math.floor(rect.width);
    canvas.height = Math.floor(rect.height);

    ctx.fillStyle = "#0a0f14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (imgData && imgData.width > 0) {
      ctx.putImageData(imgData, 0, 0);
    }
  }

  function saveUndo() {
    if (canvas.width === 0 || canvas.height === 0) return;
    if (undoStack.length >= MAX_UNDO) undoStack.shift();
    undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  }

  function undo() {
    if (!undoStack.length) return;
    const img = undoStack.pop();
    ctx.putImageData(img, 0, 0);
    showToast("Desfeito ↩");
  }

  function showToast(msg) {
    const old = canvasWrap.querySelector(".draw-toast");
    if (old) old.remove();
    const t = document.createElement("div");
    t.className = "draw-toast";
    t.textContent = msg;
    canvasWrap.appendChild(t);
    setTimeout(() => t.remove(), 1600);
  }

  function updateSizePreview() {
    const s = Math.max(4, Math.min(brushSize, 28));
    sizePreview.style.width  = s + "px";
    sizePreview.style.height = s + "px";
    cursor.style.width  = brushSize + "px";
    cursor.style.height = brushSize + "px";
  }

  function hexToRgba(hex) {
    const c = hex.replace("#","");
    const num = parseInt(c, 16);
    if (c.length === 3) {
      return [
        parseInt(c[0]+c[0],16),
        parseInt(c[1]+c[1],16),
        parseInt(c[2]+c[2],16),
        255
      ];
    }
    return [(num>>16)&255, (num>>8)&255, num&255, 255];
  }

  function floodFill(startX, startY, fillColor) {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data    = imgData.data;
    const w       = canvas.width;
    const h       = canvas.height;

    const idx = (x, y) => (y * w + x) * 4;
    const si  = idx(startX, startY);
    const targetColor = [data[si], data[si+1], data[si+2], data[si+3]];
    const fill        = hexToRgba(fillColor);

    if (
      targetColor[0] === fill[0] &&
      targetColor[1] === fill[1] &&
      targetColor[2] === fill[2]
    ) return;

    const match = (i) =>
      Math.abs(data[i]   - targetColor[0]) < 30 &&
      Math.abs(data[i+1] - targetColor[1]) < 30 &&
      Math.abs(data[i+2] - targetColor[2]) < 30 &&
      Math.abs(data[i+3] - targetColor[3]) < 30;

    const stack = [[startX, startY]];
    const visited = new Uint8Array(w * h);

    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= w || y < 0 || y >= h) continue;
      const i = idx(x, y);
      const vi = y * w + x;
      if (visited[vi] || !match(i)) continue;
      visited[vi] = 1;
      data[i]   = fill[0];
      data[i+1] = fill[1];
      data[i+2] = fill[2];
      data[i+3] = fill[3];
      stack.push([x+1,y],[x-1,y],[x,y+1],[x,y-1]);
    }
    ctx.putImageData(imgData, 0, 0);
  }

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const src  = e.touches ? e.touches[0] : e;
    return {
      x: src.clientX - rect.left,
      y: src.clientY - rect.top,
    };
  }

  function startDraw(e) {
    e.preventDefault();
    const { x, y } = getPos(e);

    if (tool === "fill") {
      saveUndo();
      floodFill(Math.floor(x), Math.floor(y), color);
      showToast("Preenchido!");
      return;
    }

    saveUndo();
    drawing = true;
    lastX = x; lastY = y;
    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = tool === "eraser" ? "#0a0f14" : color;
    ctx.fill();
  }

  function moveDraw(e) {
    e.preventDefault();
    const { x, y } = getPos(e);

    cursor.style.left = x + "px";
    cursor.style.top  = y + "px";
    cursor.style.display = "block";
    coordsEl.textContent = `${Math.floor(x)}, ${Math.floor(y)}`;

    if (!drawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === "eraser" ? "#0a0f14" : color;
    ctx.lineWidth   = brushSize;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
    ctx.fillStyle = tool === "eraser" ? "#0a0f14" : color;
    ctx.fill();

    lastX = x; lastY = y;
  }

  function endDraw() {
    drawing = false;
  }

  function hideCursor() {
    cursor.style.display = "none";
    coordsEl.textContent = "";
  }

  function saveImage() {
    const link = document.createElement("a");
    link.download = "momo-desenho.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast("Imagem salva!");
  }

  function clearCanvas() {
    saveUndo();
    ctx.fillStyle = "#0a0f14";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    showToast("Canvas limpo");
  }

  container.querySelectorAll(".draw-color[data-color]").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".draw-color").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      color = btn.dataset.color;
      if (tool === "eraser") setTool("brush");
    });
  });

  customColor.addEventListener("input", () => {
    color = customColor.value;
    container.querySelectorAll(".draw-color").forEach(b => b.classList.remove("active"));
    customColor.closest(".draw-color--custom").classList.add("active");
    if (tool === "eraser") setTool("brush");
  });

  function setTool(t) {
    tool = t;
    container.querySelectorAll(".draw-tool").forEach(b => b.classList.remove("active"));
    container.querySelector(`#tool-${t}`).classList.add("active");

    const labels = { brush: "🖌️ Pincel", eraser: "🧹 Borracha", fill: "🪣 Preenchimento" };
    statusEl.textContent = labels[t] || "";

    cursor.style.borderColor = t === "eraser"
      ? "rgba(255,100,100,.7)"
      : t === "fill"
      ? "rgba(100,180,255,.7)"
      : "rgba(255,255,255,.7)";
  }

  container.querySelector("#tool-brush").addEventListener("click",  () => setTool("brush"));
  container.querySelector("#tool-eraser").addEventListener("click", () => setTool("eraser"));
  container.querySelector("#tool-fill").addEventListener("click",   () => setTool("fill"));

  brushSlider.addEventListener("input", () => {
    brushSize = Number(brushSlider.value);
    updateSizePreview();
  });

  container.querySelector("#btn-undo").addEventListener("click",  undo);
  container.querySelector("#btn-clear").addEventListener("click", clearCanvas);
  container.querySelector("#btn-save").addEventListener("click",  saveImage);

  canvas.addEventListener("pointerdown",  startDraw, { passive: false });
  canvas.addEventListener("pointermove",  moveDraw,  { passive: false });
  canvas.addEventListener("pointerup",    endDraw);
  canvas.addEventListener("pointerleave", () => { endDraw(); hideCursor(); });
  canvas.addEventListener("pointerenter", () => { cursor.style.display = "block"; });

  canvas.addEventListener("touchstart",  startDraw, { passive: false });
  canvas.addEventListener("touchmove",   moveDraw,  { passive: false });
  canvas.addEventListener("touchend",    endDraw);

  function onKey(e) {
    if (e.code === "KeyB") setTool("brush");
    if (e.code === "KeyE") setTool("eraser");
    if (e.code === "KeyF") setTool("fill");
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyZ") { e.preventDefault(); undo(); }
    if ((e.ctrlKey || e.metaKey) && e.code === "KeyS") { e.preventDefault(); saveImage(); }
  }
  window.addEventListener("keydown", onKey);

  const cleanup = () => window.removeEventListener("keydown", onKey);

  resizeCanvas();
  updateSizePreview();
  setTool("brush");

  ctx.fillStyle = "#0a0f14";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  window.addEventListener("resize", resizeCanvas);

  return {
    resizeCanvas,
    resetGame: clearCanvas,
    pauseGame: () => {},
    destroy: cleanup,
  };
}