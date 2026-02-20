import momoPhoto from "../img/momoPhoto.jpeg";
import { fraseAleatoria } from "./principal.js";

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

export function criarPaginaChat(container) {
  container.innerHTML = `
    <div style="height:100%; display:flex; flex-direction:column; background:#0b141a;">
      <div style="
        display:flex; align-items:center; gap:10px;
        padding:12px 14px; background:#1f2c34; color:#e9edef;
        border-bottom:1px solid rgba(255,255,255,.08);
      ">
        <div style="width:36px; height:36px; border-radius:50%; overflow:hidden; flex:0 0 auto; border:1px solid rgba(255,255,255,.15);">
          <img src="${momoPhoto}" alt="Foto" style="width:100%; height:100%; object-fit:cover;" />
        </div>
        <div style="display:flex; flex-direction:column; line-height:1.1;">
          <strong style="font-size:14px;">Misa</strong>
          <span style="font-size:12px; opacity:.8;">online</span>
        </div>
      </div>

      <div id="chat-messages" style="
        flex:1; overflow:auto; padding:14px;
        display:flex; flex-direction:column; gap:10px;
        background:
          radial-gradient(circle at 20% 10%, rgba(255,255,255,.06), transparent 40%),
          radial-gradient(circle at 80% 30%, rgba(255,255,255,.04), transparent 45%),
          #0b141a;
      "></div>

      <form id="chat-form" style="
        display:flex; gap:10px; padding:10px;
        background:#1f2c34; border-top:1px solid rgba(255,255,255,.08);
      ">
        <input
          id="chat-input" type="text" placeholder="Mensagem" autocomplete="off"
          style="flex:1; padding:12px 14px; border-radius:999px; border:1px solid rgba(255,255,255,.12); outline:none; background:#111b21; color:#e9edef;"
        />
        <button id="chat-send" type="submit" style="
          padding:12px 16px; border-radius:999px; border:0;
          background:#00a884; color:#062e24; font-weight:700; cursor:pointer;
        ">Enviar</button>
      </form>
    </div>
  `;

  const chatMessages = container.querySelector("#chat-messages");
  const chatForm = container.querySelector("#chat-form");
  const chatInput = container.querySelector("#chat-input");

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

  function responderAuto() {
    const respostas = ["Eu te amo", "tô com saudade 🥺", "aish", "meu vampirinho", fraseAleatoria()];
    addMessage({ from: "them", text: respostas[Math.floor(Math.random() * respostas.length)] });
  }

  mensagensIniciais.forEach(addMessage);

  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage({ from: "me", text });
    chatInput.value = "";
    addMessage({ from: "them", text: "digitando..." });

    setTimeout(() => {
      const last = chatMessages.lastElementChild;
      if (last && last.textContent.includes("digitando...")) last.remove();
      responderAuto();
    }, 700 + Math.random() * 800);
  });
}