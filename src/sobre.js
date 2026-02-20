import momoPhoto from "../img/momoPhoto.jpeg";

export function criarPaginaSobre(container) {
  container.innerHTML = `
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
    <img src="${momoPhoto}" alt="Momo" width="300" height="300" class="momo-balanceando" />
  `;
}