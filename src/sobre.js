import momoPhoto from "../img/momoPhoto.jpeg";

export function criarPaginaSobre(container) {
  container.innerHTML = `
    <div class="sobre-shell">

      <div class="sobre-hero">
        <img src="${momoPhoto}" alt="Momo" class="sobre-momo momo-balanceando" />
        <div class="sobre-hero-text">
          <h1 class="sobre-hero-title">Minha Primavera</h1>
          <p class="sobre-hero-sub">feito com muito amor 🍓</p>
        </div>
      </div>

      <div class="sobre-card">
        <div class="sobre-card-icon">📜</div>
        <h3 class="sobre-card-title">O poema dedicado ao Victor</h3>
        <p class="sobre-poem">
          Gosto do teu sorriso<br/>
          porque ele me deixa à vontade.<br/>
          <br/>
          Conversar com você me faz bem,<br/>
          me acalma,<br/>
          me faz querer ficar um pouco mais.<br/>
          <br/>
          Não digo tudo de uma vez,<br/>
          não por falta de vontade,<br/>
          mas porque respeito o tempo das coisas.<br/>
          <br/>
          Talvez eu queira ser mais do que palavras trocadas,<br/>
          talvez eu já queira,<br/>
          mas espero o momento certo...
        </p>
      </div>

      <div class="sobre-card">
        <div class="sobre-card-icon">💻</div>
        <h3 class="sobre-card-title">O projeto</h3>
        <p class="sobre-text">
          Este projeto nasceu como uma forma de demonstrar o meu carinho pela minha namorada.
          É algo simples, mas foi feito com muito amor.
        </p>
        <p class="sobre-text">
          O Momo tem um significado especial: foi um dos presentes que comprei para ela no nosso
          primeiro encontro, uma bolsinha de capivara que vem com um caqui. Desde então, ela leva
          o Momo para todos os nossos encontros.
        </p>
        <p class="sobre-text">
          As frases que o Momo diz são inspiradas em coisas que eu já falei para ela, no que eu
          gostaria de ter dito, e no que ela mesma solta por aí.
        </p>
      </div>

      <div class="sobre-card sobre-card--love">
        <span class="sobre-love-emoji">🦇</span>
        <p class="sobre-love-text">Misa, o Victor te ama muito.</p>
        <p><a href="https://vm-lover.vercel.app/">clique aqui</a><p/>
        </div>

    </div>
  `;
}