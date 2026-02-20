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

    <h3>O projeto</h3>
    <p>
      Este projeto nasceu como uma forma de demonstrar o meu carinho pela minha namorada. É algo simples, mas foi feito com muito amor.
      O Momo tem um significado especial: foi um dos presentes que comprei para ela no nosso primeiro encontro — uma bolsinha de capivara que vem com um caqui (sim, isso mesmo). Desde então, ela leva o Momo para todos os nossos encontros. Ele é tão fofinho que merecia um espacinho especial neste projeto.
      As frases que o Momo diz são inspiradas em coisas que eu já falei para ela, em coisas que eu gostaria de ter dito, no que eu imagino que ela gostaria de ouvir — além, claro, das frases aleatórias que ela mesma solta.
      No fim, é uma mistura de tudo isso. Mas, acima de qualquer detalhe, é algo feito com muito amor e carinho, pensado nela o tempo todo.
    </p>

    <h3>O momo</h3>
    <img src="${momoPhoto}" alt="Momo" width="300" height="300" class="momo-balanceando" />

  `;
}