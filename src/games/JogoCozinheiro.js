
const RECIPES = [
  {
    name: "Bolo de Morango",
    emoji: "🎂",
    steps: [
      { id: "farinha",    emoji: "🌾", label: "Farinha"       },
      { id: "ovos",       emoji: "🥚", label: "Ovos"          },
      { id: "manteiga",   emoji: "🧈", label: "Manteiga"      },
      { id: "acucar",     emoji: "🍬", label: "Açúcar"        },
      { id: "morango",    emoji: "🍓", label: "Morangos"      },
      { id: "forno",      emoji: "🔥", label: "Forno"         },
    ],
  },
  {
    name: "Suco de Morango",
    emoji: "🥤",
    steps: [
      { id: "morango",    emoji: "🍓", label: "Morangos"      },
      { id: "gelo",       emoji: "🧊", label: "Gelo"          },
      { id: "acucar",     emoji: "🍬", label: "Açúcar"        },
      { id: "leite",      emoji: "🥛", label: "Leite"         },
      { id: "liquidif",   emoji: "⚡",  label: "Liquidificador"},
    ],
  },
  {
    name: "Pizza de Queijo",
    emoji: "🍕",
    steps: [
      { id: "massa",      emoji: "🫓", label: "Massa"         },
      { id: "molho",      emoji: "🍅", label: "Molho"         },
      { id: "queijo",     emoji: "🧀", label: "Queijo"        },
      { id: "oregano",    emoji: "🌿", label: "Orégano"       },
      { id: "forno",      emoji: "🔥", label: "Forno"         },
    ],
  },
  {
    name: "Omelete",
    emoji: "🍳",
    steps: [
      { id: "ovos",       emoji: "🥚", label: "Ovos"          },
      { id: "sal",        emoji: "🧂", label: "Sal"           },
      { id: "manteiga",   emoji: "🧈", label: "Manteiga"      },
      { id: "queijo",     emoji: "🧀", label: "Queijo"        },
      { id: "fogo",       emoji: "🔥", label: "Frigideira"    },
    ],
  },
  {
    name: "Vitamina de Banana",
    emoji: "🍌",
    steps: [
      { id: "banana",     emoji: "🍌", label: "Banana"        },
      { id: "leite",      emoji: "🥛", label: "Leite"         },
      { id: "mel",        emoji: "🍯", label: "Mel"           },
      { id: "aveia",      emoji: "🌾", label: "Aveia"         },
      { id: "liquidif",   emoji: "⚡",  label: "Liquidificador"},
    ],
  },
  {
    name: "Panqueca",
    emoji: "🥞",
    steps: [
      { id: "farinha",    emoji: "🌾", label: "Farinha"       },
      { id: "ovos",       emoji: "🥚", label: "Ovos"          },
      { id: "leite",      emoji: "🥛", label: "Leite"         },
      { id: "manteiga",   emoji: "🧈", label: "Manteiga"      },
      { id: "frigideira", emoji: "🍳", label: "Frigideira"    },
      { id: "mel",        emoji: "🍯", label: "Mel"           },
    ],
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function criarPaginaCozinheiro(container) {
  let recipe        = null;  
  let shuffled      = [];     
  let progress      = [];    
  let status        = "idle"; 
  let score         = 0;
  let best          = Number(localStorage.getItem("momo_chef_best") || 0);
  let recipeIndex   = 0;
  let errorId       = null;  
  let successId     = null;   
  let combo         = 0;
  let shakeTimeout  = null;

  function pickNextRecipe() {
    recipe     = RECIPES[recipeIndex % RECIPES.length];
    recipeIndex++;
    shuffled   = shuffle(recipe.steps);
    progress   = [];
    errorId    = null;
    successId  = null;
  }

  function handleIngredientClick(id) {
    if (status !== "playing") return;
    const expected = recipe.steps[progress.length].id;

    if (id === expected) {
      successId = id;
      progress  = [...progress, id];
      combo++;

      if (progress.length === recipe.steps.length) {
        const bonus = combo >= recipe.steps.length ? 20 : 0;
        score += recipe.steps.length * 10 + bonus;
        if (score > best) {
          best = score;
          localStorage.setItem("momo_chef_best", String(best));
        }
        status = "won";
      }
    } else {
      errorId = id;
      combo   = 0;
      status  = "lost";
    }

    render();
  }

  function startGame() {
    score       = 0;
    recipeIndex = 0;
    combo       = 0;
    status      = "playing";
    pickNextRecipe();
    render();
  }

  function nextRecipe() {
    status = "playing";
    pickNextRecipe();
    render();
  }

  function restartGame() {
    score       = 0;
    recipeIndex = 0;
    combo       = 0;
    status      = "idle";
    recipe      = null;
    render();
  }

  function render() {
    container.innerHTML = buildHTML();
    bindEvents();
  }

  function buildHTML() {
    return `
      <div class="chef-shell">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;600;700;800;900&display=swap');

          .chef-shell {
            height: 100%;
            display: flex;
            flex-direction: column;
            background: #1a0a2e;
            font-family: 'Nunito', sans-serif;
            color: #fff;
            overflow: hidden;
            position: relative;
          }

          /* bg blobs */
          .chef-shell::before,
          .chef-shell::after {
            content: '';
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
            z-index: 0;
          }
          .chef-shell::before {
            width: 300px; height: 300px;
            background: radial-gradient(circle, rgba(255,100,150,.12) 0%, transparent 70%);
            top: -80px; right: -80px;
          }
          .chef-shell::after {
            width: 250px; height: 250px;
            background: radial-gradient(circle, rgba(100,200,255,.08) 0%, transparent 70%);
            bottom: 60px; left: -60px;
          }

          /* ── HUD ── */
          .chef-hud {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 16px;
            background: rgba(0,0,0,.3);
            border-bottom: 1px solid rgba(255,255,255,.07);
            flex-shrink: 0;
            position: relative;
            z-index: 1;
          }
          .chef-hud__item {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .chef-hud__label {
            font-size: .58rem;
            letter-spacing: .12em;
            opacity: .45;
            text-transform: uppercase;
          }
          .chef-hud__val {
            font-family: 'Fredoka One', cursive;
            font-size: 1.3rem;
            color: #ffd060;
            line-height: 1.1;
          }
          .chef-hud__val--pink { color: #ff80a0; }

          /* ── main content ── */
          .chef-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            padding: 12px 14px 10px;
            gap: 12px;
            overflow-y: auto;
            position: relative;
            z-index: 1;
          }

          /* ── recipe card ── */
          .chef-recipe {
            width: 100%;
            max-width: 400px;
            background: rgba(255,255,255,.05);
            border: 1.5px solid rgba(255,255,255,.1);
            border-radius: 18px;
            padding: 14px 16px;
          }
          .chef-recipe__title {
            font-family: 'Fredoka One', cursive;
            font-size: 1.1rem;
            color: #ffd060;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .chef-recipe__steps {
            display: flex;
            gap: 6px;
            flex-wrap: wrap;
          }
          .chef-step {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px 10px;
            border-radius: 999px;
            font-size: .78rem;
            font-weight: 700;
            border: 1.5px solid rgba(255,255,255,.1);
            background: rgba(255,255,255,.04);
            transition: all .2s;
            white-space: nowrap;
          }
          .chef-step--done {
            background: rgba(0,220,140,.15);
            border-color: rgba(0,220,140,.5);
            color: #00e8a0;
          }
          .chef-step--next {
            background: rgba(255,200,80,.12);
            border-color: rgba(255,200,80,.5);
            color: #ffd060;
            animation: chef-pulse 1s ease-in-out infinite;
          }
          .chef-step--pending {
            opacity: .35;
          }
          @keyframes chef-pulse {
            0%,100% { box-shadow: 0 0 0 0 rgba(255,200,80,.3); }
            50%      { box-shadow: 0 0 0 6px rgba(255,200,80,0); }
          }

          /* ── progress bar ── */
          .chef-progress-wrap {
            width: 100%;
            max-width: 400px;
          }
          .chef-progress-bar {
            height: 5px;
            border-radius: 3px;
            background: rgba(255,255,255,.08);
            overflow: hidden;
          }
          .chef-progress-fill {
            height: 100%;
            border-radius: 3px;
            background: linear-gradient(90deg, #00c880, #00e8a0);
            transition: width .3s cubic-bezier(.34,1.56,.64,1);
          }
          .chef-progress-label {
            font-size: .68rem;
            opacity: .45;
            margin-top: 4px;
            letter-spacing: .04em;
          }

          /* ── ingredients grid ── */
          .chef-grid-title {
            font-size: .7rem;
            letter-spacing: .12em;
            opacity: .4;
            text-transform: uppercase;
            align-self: flex-start;
            max-width: 400px;
            width: 100%;
          }
          .chef-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 9px;
            width: 100%;
            max-width: 400px;
          }
          .chef-ingredient {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            padding: 14px 8px 12px;
            border-radius: 16px;
            border: 2px solid rgba(255,255,255,.1);
            background: rgba(255,255,255,.05);
            cursor: pointer;
            transition: transform .12s, background .15s, border-color .15s, box-shadow .15s;
            position: relative;
            overflow: hidden;
          }
          .chef-ingredient:hover {
            background: rgba(255,255,255,.1);
            border-color: rgba(255,255,255,.25);
            transform: translateY(-2px) scale(1.03);
          }
          .chef-ingredient:active {
            transform: scale(.95);
          }
          .chef-ingredient--used {
            opacity: .2;
            pointer-events: none;
            filter: grayscale(.8);
          }
          .chef-ingredient--correct {
            background: rgba(0,220,140,.15);
            border-color: #00e8a0;
            box-shadow: 0 0 16px rgba(0,232,160,.25);
            animation: chef-correct .35s ease;
          }
          .chef-ingredient--wrong {
            background: rgba(255,60,80,.15);
            border-color: #ff3c50;
            box-shadow: 0 0 16px rgba(255,60,80,.3);
            animation: chef-wrong .4s ease;
          }
          @keyframes chef-correct {
            0%   { transform: scale(1); }
            40%  { transform: scale(1.15); }
            100% { transform: scale(1); }
          }
          @keyframes chef-wrong {
            0%,100% { transform: translateX(0); }
            20%     { transform: translateX(-7px); }
            40%     { transform: translateX(7px); }
            60%     { transform: translateX(-5px); }
            80%     { transform: translateX(5px); }
          }
          .chef-ingredient__emoji {
            font-size: 2rem;
            line-height: 1;
          }
          .chef-ingredient__label {
            font-size: .72rem;
            font-weight: 800;
            text-align: center;
            opacity: .85;
            letter-spacing: .02em;
          }

          /* ── overlay (idle / won / lost) ── */
          .chef-overlay {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(26,10,46,.82);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            z-index: 10;
            animation: chef-fadeIn .2s ease;
          }
          @keyframes chef-fadeIn {
            from { opacity:0; } to { opacity:1; }
          }
          .chef-card {
            background: rgba(255,255,255,.06);
            border: 1.5px solid rgba(255,255,255,.12);
            border-radius: 22px;
            padding: 28px 24px;
            text-align: center;
            max-width: 300px;
            width: 88%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
            animation: chef-pop .3s cubic-bezier(.34,1.56,.64,1);
          }
          @keyframes chef-pop {
            from { transform: scale(.8); opacity:0; }
            to   { transform: scale(1);  opacity:1; }
          }
          .chef-card__big {
            font-size: 3.5rem;
            line-height: 1;
          }
          .chef-card__title {
            font-family: 'Fredoka One', cursive;
            font-size: 1.6rem;
            color: #ffd060;
            letter-spacing: .02em;
          }
          .chef-card__title--red  { color: #ff6080; }
          .chef-card__title--green { color: #00e8a0; }
          .chef-card__body {
            font-size: .88rem;
            opacity: .8;
            line-height: 1.6;
          }
          .chef-card__score {
            font-family: 'Fredoka One', cursive;
            font-size: 2rem;
            color: #ffd060;
          }
          .chef-btn {
            width: 100%;
            padding: 13px;
            border-radius: 999px;
            border: none;
            font-family: 'Nunito', sans-serif;
            font-weight: 900;
            font-size: 1rem;
            letter-spacing: .04em;
            cursor: pointer;
            transition: transform .1s, box-shadow .1s;
          }
          .chef-btn--green {
            background: linear-gradient(135deg, #00c880, #00a060);
            color: #001a0a;
            box-shadow: 0 4px 20px rgba(0,200,140,.3);
          }
          .chef-btn--green:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(0,200,140,.45); }
          .chef-btn--yellow {
            background: linear-gradient(135deg, #ffd060, #ffaa20);
            color: #2a1a00;
            box-shadow: 0 4px 20px rgba(255,200,80,.3);
          }
          .chef-btn--yellow:hover { transform: translateY(-2px); box-shadow: 0 6px 28px rgba(255,200,80,.45); }
          .chef-btn--ghost {
            background: rgba(255,255,255,.07);
            color: rgba(255,255,255,.6);
            border: 1px solid rgba(255,255,255,.12);
            margin-top: -4px;
          }
          .chef-btn--ghost:hover { background: rgba(255,255,255,.12); color: #fff; }
          .chef-btn:active { transform: scale(.96) !important; }

          /* combo badge */
          .chef-combo {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: rgba(255,200,80,.15);
            border: 1px solid rgba(255,200,80,.4);
            color: #ffd060;
            border-radius: 999px;
            padding: 3px 12px;
            font-size: .75rem;
            font-weight: 900;
            letter-spacing: .04em;
            opacity: 0;
            transition: opacity .2s;
          }
          .chef-combo.visible { opacity: 1; }

          .chef-help {
            font-size: .65rem;
            opacity: .28;
            letter-spacing: .05em;
            text-align: center;
            flex-shrink: 0;
            padding: 6px;
            position: relative;
            z-index: 1;
          }
        </style>

        <!-- HUD -->
        <div class="chef-hud">
          <div class="chef-hud__item">
            <span class="chef-hud__label">Pontos</span>
            <span class="chef-hud__val">${score}</span>
          </div>
          <div class="chef-hud__item">
            <span class="chef-hud__label">Receita</span>
            <span class="chef-hud__val chef-hud__val--pink">${recipeIndex}</span>
          </div>
          <div class="chef-hud__item">
            <span class="chef-hud__label">Recorde</span>
            <span class="chef-hud__val">${best}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="chef-content">
          ${status === "idle" ? "" : buildRecipeSection()}
          ${status === "playing" ? buildProgressSection() : ""}
          ${status === "playing" ? `<div class="chef-grid-title">Escolha o próximo ingrediente</div>` : ""}
          ${status === "playing" ? buildGrid() : ""}
        </div>

        <!-- Overlay -->
        ${buildOverlay()}

        <!-- help -->
        <div class="chef-help">Clique nos ingredientes na ordem correta da receita</div>
      </div>
    `;
  }

  function buildRecipeSection() {
    if (!recipe) return "";
    return `
      <div class="chef-recipe">
        <div class="chef-recipe__title">
          <span>${recipe.emoji}</span>
          <span>${recipe.name}</span>
          <span class="chef-combo ${combo >= 2 ? "visible" : ""}">🔥 x${combo}</span>
        </div>
        <div class="chef-recipe__steps">
          ${recipe.steps.map((s, i) => {
            let cls = "chef-step";
            if (i < progress.length)          cls += " chef-step--done";
            else if (i === progress.length)   cls += " chef-step--next";
            else                              cls += " chef-step--pending";
            const check = i < progress.length ? "✓ " : "";
            return `<div class="${cls}">${s.emoji} ${check}${s.label}</div>`;
          }).join("")}
        </div>
      </div>
    `;
  }

  function buildProgressSection() {
    if (!recipe) return "";
    const pct = Math.round((progress.length / recipe.steps.length) * 100);
    return `
      <div class="chef-progress-wrap">
        <div class="chef-progress-bar">
          <div class="chef-progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="chef-progress-label">${progress.length} de ${recipe.steps.length} passos</div>
      </div>
    `;
  }

  function buildGrid() {
    if (!shuffled.length) return "";
    return `
      <div class="chef-grid">
        ${shuffled.map(ing => {
          const used    = progress.includes(ing.id);
          const correct = successId === ing.id;
          const wrong   = errorId   === ing.id;
          let cls = "chef-ingredient";
          if (used)    cls += " chef-ingredient--used";
          if (correct) cls += " chef-ingredient--correct";
          if (wrong)   cls += " chef-ingredient--wrong";
          return `
            <button class="${cls}" data-id="${ing.id}">
              <span class="chef-ingredient__emoji">${ing.emoji}</span>
              <span class="chef-ingredient__label">${ing.label}</span>
            </button>
          `;
        }).join("")}
      </div>
    `;
  }

  function buildOverlay() {
    if (status === "idle") {
      return `
        <div class="chef-overlay">
          <div class="chef-card">
            <div class="chef-card__big">👨‍🍳</div>
            <div class="chef-card__title">Momo Cozinheiro</div>
            <div class="chef-card__body">
              Siga a receita na ordem certa!<br/>
              Clique os ingredientes conforme a sequência indicada.
            </div>
            <button class="chef-btn chef-btn--yellow" id="chef-start">Começar a Cozinhar!</button>
          </div>
        </div>
      `;
    }

    if (status === "won") {
      const isLast = recipeIndex >= RECIPES.length;
      return `
        <div class="chef-overlay">
          <div class="chef-card">
            <div class="chef-card__big">${recipe.emoji}</div>
            <div class="chef-card__title chef-card__title--green">Perfeito! 🎉</div>
            <div class="chef-card__body">
              <strong>${recipe.name}</strong> preparado com sucesso!<br/>
              <span style="color:#ffd060; font-weight:800;">+${recipe.steps.length * 10} pontos</span>
              ${combo >= recipe.steps.length ? '<br/><span style="color:#ff80a0">🔥 Combo perfeito! +20 bônus</span>' : ""}
            </div>
            ${isLast
              ? `<div class="chef-card__body" style="color:#ffd060; font-weight:800;">
                   Você completou todas as receitas!<br/>
                   <span class="chef-card__score">${score} pts</span>
                 </div>
                 <button class="chef-btn chef-btn--yellow" id="chef-restart">Jogar Novamente</button>`
              : `<button class="chef-btn chef-btn--green" id="chef-next">Próxima Receita →</button>
                 <button class="chef-btn chef-btn--ghost" id="chef-restart">Recomeçar do Zero</button>`
            }
          </div>
        </div>
      `;
    }

    if (status === "lost") {
      const expected = recipe.steps[progress.length];
      const wrong    = shuffled.find(s => s.id === errorId);
      return `
        <div class="chef-overlay">
          <div class="chef-card">
            <div class="chef-card__big">😵</div>
            <div class="chef-card__title chef-card__title--red">Ops! Errou!</div>
            <div class="chef-card__body">
              Você colocou <strong>${wrong?.emoji} ${wrong?.label}</strong><br/>
              mas o próximo era <strong>${expected?.emoji} ${expected?.label}</strong>
            </div>
            <div class="chef-card__score">${score}</div>
            <button class="chef-btn chef-btn--yellow" id="chef-retry">Tentar de Novo</button>
            <button class="chef-btn chef-btn--ghost"  id="chef-restart">Recomeçar do Zero</button>
          </div>
        </div>
      `;
    }

    return "";
  }

  function bindEvents() {
    container.querySelector("#chef-start")?.addEventListener("click",   startGame);
    container.querySelector("#chef-next")?.addEventListener("click",    nextRecipe);
    container.querySelector("#chef-retry")?.addEventListener("click",   () => {
      status    = "playing";
      progress  = [];
      errorId   = null;
      successId = null;
      shuffled  = shuffle(recipe.steps);
      render();
    });
    container.querySelector("#chef-restart")?.addEventListener("click", restartGame);

    container.querySelectorAll(".chef-ingredient[data-id]").forEach(btn => {
      btn.addEventListener("click", () => handleIngredientClick(btn.dataset.id));
    });
  }

  function resizeCanvas() {  }
  function resetGame()    { restartGame(); }
  function pauseGame()    { }
  function destroy()      { }

  render();

  return { resizeCanvas, resetGame, pauseGame, destroy };
}