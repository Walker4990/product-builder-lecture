class LottoBall extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const number = this.getAttribute('number');

    const ball = document.createElement('div');
    ball.classList.add('ball');
    ball.textContent = number;

    const style = document.createElement('style');
    style.textContent = `
      .ball {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: #f1c40f;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: 600;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(ball);
  }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.querySelector('.generate-btn');
const lottoNumbersContainer = document.querySelector('.lotto-numbers');

generateBtn.addEventListener('click', () => {
  lottoNumbersContainer.innerHTML = '';

  const numbers = new Set();
  while (numbers.size < 6) {
    const randomNumber = Math.floor(Math.random() * 45) + 1;
    numbers.add(randomNumber);
  }

  numbers.forEach(number => {
    const lottoBall = document.createElement('lotto-ball');
    lottoBall.setAttribute('number', number);
    lottoNumbersContainer.appendChild(lottoBall);
  });
});
