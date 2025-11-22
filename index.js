import { Calculator } from "./Calculator.js";

const calculator = new Calculator;

const calcButtons = document.querySelectorAll('button');
const calcInput = document.getElementById('calc-input');

calcButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const inputValue = e.currentTarget.dataset['input'];
    if(inputValue === 'cancel') {
      calculator.resetCalc();
    }else if('+-*/=mod**'.indexOf(inputValue) >= 0) {
      calculator.calculate(inputValue, calcInput.value);
    } else {
      calcInput.value += e.currentTarget.dataset['input'];
    }
  })
})

const windowAllowed = /^[0-9+=\-*/]*$/;
window.addEventListener('keydown', e => {
  const focusedElement = document.activeElement.getAttribute('id');
  if (windowAllowed.test(e.key) && focusedElement !== 'calc-input') {
    const inputValue = e.key;
    if(inputValue === 'cancel') {
      calculator.resetCalc();
    }else if('+-*/=mod**'.indexOf(inputValue) >= 0) {
      calculator.calculate(inputValue, calcInput.value);
    } else {
      calcInput.value += e.key;
    }
  } else if(e.key === 'Backspace') {
    calcInput.value = calcInput.value.slice(0, calcInput.value.length - 1);
  }
})