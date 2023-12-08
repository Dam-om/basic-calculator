class Calculator {
  constructor(pOperand, cOperand) {
    this.pOperand = pOperand;
    this.cOperand = cOperand;
    this.clear();
  }
  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
    this.compute();
  }
  getDisplay(number) {
    let stringNo = number.toString();
    let integerDigit = parseFloat(stringNo.split(".")[0]);
    let decDigit = stringNo.split(".")[1];
    let intDisplay;
    if (isNaN(integerDigit)) {
      return "";
    } else {
      intDisplay = integerDigit.toLocaleString("en", {
        maximinumFractionDigit: 0,
      });
    }
    if (decDigit != null) {
      return `${intDisplay}.${decDigit}`;
    } else {
      return intDisplay;
    }
  }
  showDisplay() {
    this.cOperand.innerText = this.getDisplay(this.currentOperand);
    if (this.operation != null) {
      this.pOperand.innerText = `${this.getDisplay(this.previousOperand)}${
        this.operation
      } `;
    } else {
      this.pOperand.innerText = "";
    }
  }
  delete() {
    if (this.currentOperand === "" && this.previousOperand !== null) {
      this.currentOperand = this.previousOperand;
      this.previousOperand = "";
      this.operation = undefined;
    }
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== null) {
      this.compute();
    }
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
    this.operation = operation;
  }
  compute() {
    let prev = parseFloat(this.previousOperand);
    let curr = parseFloat(this.currentOperand);
    let computation;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
}

const numberButton = document.querySelectorAll("[data-number]");
const operationButton = document.querySelectorAll("[data-operation]");
const acButton = document.querySelector("[data-AC]");
const delButton = document.querySelector("[data-del]");
const pOperand = document.querySelector("[data-po]");
const cOperand = document.querySelector("[data-co]");
const equalButton = document.querySelector("[data-equals]");
const calculator = new Calculator(pOperand, cOperand);
numberButton.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.showDisplay();
  })
);
operationButton.forEach((button) =>
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.showDisplay();
  })
);

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.showDisplay();
});

acButton.addEventListener("click", () => {
  calculator.clear();
  calculator.showDisplay();
});

delButton.addEventListener("click", () => {
  calculator.delete();
  calculator.showDisplay();
});
