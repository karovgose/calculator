"use strict";

class Calculator {
  constructor(operandEl) {
    this.operandEl = operandEl;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const curr = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    if (this.operation !== undefined) {
      this.operandEl.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.operandEl.innerText = this.previousOperand;
    }

    if (this.currentOperand !== "" && this.operation !== undefined) {
      this.operandEl.innerText += " " + this.currentOperand;
    } else if (this.currentOperand !== "") {
      this.operandEl.innerText = this.currentOperand;
    }
  }
}
const calculatorEl = document.querySelector(".calculator");

const toggleBtn = document.querySelector(".toggle_btn");
const toggleIcon = document.querySelector(".toggle_icon");
const operandEl = document.querySelector(".operand");
const numbers = document.querySelectorAll(".number");
const operatorsAll = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".all_clear");
const clearLast = document.querySelector(".clear_last");

const calculator = new Calculator(operandEl);
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    calculator.appendNumber(number.innerText);
    calculator.updateDisplay();
  });
});

operatorsAll.forEach((operator) => {
  operator.addEventListener("click", () => {
    calculator.chooseOperation(operator.innerText);
    calculator.updateDisplay();
  });
});

equal.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

toggleBtn.addEventListener("click", () => {
  calculatorEl.classList.toggle("dark_mode");
  toggleIcon.classList.toggle("white");
});

clear.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

clearLast.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
