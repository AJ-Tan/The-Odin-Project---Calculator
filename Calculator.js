export class Calculator {
  #previousValue; #op;
  constructor() {
    this.#previousValue = null;
    this.#op = null;
  }

  methods(op, a, b = null) {
    switch(op) {
      case 'mod':
        return a % b;
      case '**':
        return a ** a;
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '÷':
        return a / b;
    }
  } 

  initialize() {
    const calcButtons = document.querySelectorAll('button');
    const calcInput = document.getElementById('calc-input');

    calcButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const inputValue = e.currentTarget.dataset['input'];
        if(inputValue === 'cancel') {
          this.resetCalc();
          return;
        }else if('+-*÷=mod**'.indexOf(inputValue) >= 0) {
          this.calculate(inputValue, calcInput.value);
          return;
        } else {
          calcInput.value += e.currentTarget.dataset['input'];
        }
        
      })
    })

    const allowed = /^[0-9+\-*./]*$/;
    calcInput.addEventListener("input", function () {
      if (!allowed.test(this.value)) {
        this.value = this.value.replace(/[^0-9+\-*/]/g, "");
      }
    })
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
      this.#previousValue = +val;
      this.#op = op;
      calcHistory.textContent = `${val} ${op}`
      calcInput.value = '';
    } else {
      let calcValue = this.methods(this.#op, this.#previousValue, +val);
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