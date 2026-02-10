import './style.css'
import momo from '../img/Momo.png'

const frases = [
  'O Raviel aprontando de novo.',
  'O Raviel dormindo todo torto.',
  'O Raviel achando que manda na casa.',
  'O Raviel pedindo carinho do nada.',

  'O sorriso dela ilumina tudo.',
  'Os olhinhos dela dizem mais que palavras.',
  'O jeito que ela sorri sem perceber.',
  'O sorriso dela chega antes dela, todo mundo se encanta.',
  'Os olhinhos dela quando ela ri....',

  'Ela tocando ukulele distraída.',
  'Ela aprendendo uma música nova no ukulele.',
  'O ukulele desafinado e ainda perfeito.',

  'A gente no zoológico rindo de tudo.',
  'O Raviel iria amar o zoológico.',

  'Perdidos na Liberdade juntos.',
  'Passeio simples no shopping, saudade.',

  'Caminhando pelo Ibirapuera.',
  'criando bichinhos de massinha no Ibirapuera.',
  'minha primavera...'
]

document.querySelector('#app').innerHTML = `
  <div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 12px;
  ">
    <span id="frase"></span>
    <img
      src="${momo}"
      alt="Momo"
      width="200"
      height="300"
      class="momo-balanceando"
    />
    <button id="btnMomo">Momo diz...</button>
  </div>
`

const spanFrase = document.querySelector('#frase')
const botao = document.querySelector('#btnMomo')

botao.addEventListener('click', () => {
  const indice = Math.floor(Math.random() * frases.length)
  spanFrase.textContent = frases[indice]
})
