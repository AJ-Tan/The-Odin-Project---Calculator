export class Calculator {
  #previousValue; #op;
  constructor() {
    this.#previousValue = null;
    this.#op = null;
  }

  #methods(op, a, b) {
    return {
      'mod': a % b,
      '**': a ** b,
      '+': a + b,
      '-': a - b,
      '*': a * b,
      '/': a / b
    }[op]
  } 

  resetCalc() {
    const calcInput = document.getElementById('calc-input');
    const calcHistory = document.getElementById('calc-history');
    this.#previousValue = null;
    this.#op = null;
    calcInput.value = '';
    calcHistory.textContent = '';
  }

  calculate(op, val) {
    const calcInput = document.getElementById('calc-input');
    const calcHistory = document.getElementById('calc-history');
    if(this.#previousValue === null) {
      if(this.#op === null && op === '=') return;
      if(this.#previousValue === null && val === '') return;
      this.#previousValue = +val;
      this.#op = op;
      calcHistory.textContent = `${val} ${op}`
      calcInput.value = '';
    } else {
      let calcValue = this.#methods(this.#op, this.#previousValue, +val);
      calcValue = Math.round(calcValue * 100) / 100;
      if(op === '=') {  
        calcHistory.textContent = `${this.#previousValue} ${this.#op} ${val} =`;
        calcInput.value = calcValue;
        this.#previousValue = null;
        this.#op = null;
      } else {
        this.#previousValue = calcValue;
        this.#op = op;
        calcHistory.textContent = `${calcValue} ${op}`
        calcInput.value = '';
      }
    }
  }
}