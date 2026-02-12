// main.js (com 3ª aba "Chat" simulando WhatsApp)
import "./style.css";
import momo from "../img/Momo.png";
import heart from "../img/heart.png";
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
    ">
      <button id="tab-principal" aria-selected="true">Momo</button>
      <button id="tab-vazia" aria-selected="false">Sobre</button>
      <button id="tab-chat" aria-selected="false">Chat</button>
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
          <!-- Topbar tipo WhatsApp -->
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

          <!-- Mensagens -->
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

          <!-- Input -->
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
    </div>
  </div>
`;

const tabPrincipal = document.querySelector("#tab-principal");
const tabVazia = document.querySelector("#tab-vazia");
const tabChat = document.querySelector("#tab-chat");

const paginaPrincipal = document.querySelector("#pagina-principal");
const paginaVazia = document.querySelector("#pagina-vazia");
const paginaChat = document.querySelector("#pagina-chat");

function trocarPagina(pagina) {
  const principalAtiva = pagina === "principal";
  const vaziaAtiva = pagina === "vazia";
  const chatAtiva = pagina === "chat";

  tabPrincipal.setAttribute("aria-selected", String(principalAtiva));
  tabVazia.setAttribute("aria-selected", String(vaziaAtiva));
  tabChat.setAttribute("aria-selected", String(chatAtiva));

  paginaPrincipal.style.display = principalAtiva ? "flex" : "none";
  paginaVazia.style.display = vaziaAtiva ? "block" : "none";
  paginaChat.style.display = chatAtiva ? "block" : "none";
}

tabPrincipal.addEventListener("click", () => trocarPagina("principal"));
tabVazia.addEventListener("click", () => trocarPagina("vazia"));
tabChat.addEventListener("click", () => trocarPagina("chat"));

/* ---------- Página principal (Momo + corações) ---------- */
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
  const respostas = [
    "Eu te amo",
    "tô com saudade 🥺",
    "aish",
    "meu vampirinho",
    fraseAleatoria(),
  ];
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
