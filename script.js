const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNum = null;
let secondNum = null;
let operator = null;

function operate(num1, num2, operator) {
	switch (operator) {
		case "plus":
			return add(num1, num2);
		case "minus":
			return subtract(num1, num2);
		case "times":
			return multiply(num1, num2);
		case "divide":
			return divide(num1, num2);
	}
}

let canInput = false;

const elNumInput = document.querySelector(".input");
const elAccumulatedNum = document.querySelector(".recent-num");
const elOperator = document.querySelector(".operator");
const btnsDigit = document.querySelectorAll(".digit");
const btnsOperator = document.querySelectorAll(".operator");
const btnEqual = document.querySelector(".equals");
const btnClear = document.querySelector(".clear");

for (btn of btnsDigit) btn.addEventListener("click", showDigit);
for (btn of btnsOperator) btn.addEventListener("click", updateEquation);
btnEqual.addEventListener("click", showResult);
btnClear.addEventListener("click", reset);

function showDigit() {
	if (!canInput) {
		clearInputEl();
		canInput = true;
	}

	const digit = this.dataset.digit;
	elNumInput.textContent += digit;
}

function updateEquation() {
	if (firstNum !== null) {
		secondNum = +elNumInput.textContent;
		firstNum = operate(firstNum, secondNum, operator);
		operator = this.dataset.operator;
	} else {
		operator = this.dataset.operator;
		firstNum = +elNumInput.textContent;
	}

	showEquation();
	clearInputEl();
}

function showResult() {
	if (firstNum !== null && !isInputEmpty()) {
		secondNum = +elNumInput.textContent;
		elNumInput.textContent = operate(firstNum, secondNum, operator);
		clearEquationEl();
		resetValues();
		canInput = false;
	}
}

function getSymbol(operator) {
	const symbols = {
		plus: "+",
		minus: "−",
		times: "×",
		divide: "÷",
	};
	return symbols[operator] || "";
}

function showEquation() {
	elAccumulatedNum.textContent = firstNum;
	elOperator.textContent = getSymbol(operator);
}

function clearInputEl() {
	elNumInput.textContent = "";
}

function clearEquationEl() {
	elAccumulatedNum.textContent = "";
	elOperator.textContent = "";
}

function resetValues() {
	firstNum = null;
	secondNum = null;
	operator = null;
}

function reset() {
	clearInputEl();
	clearEquationEl();
	resetValues();
	elNumInput.textContent = 0;
	canInput = false;
}

function isInputEmpty() {
	return elNumInput.textContent === "";
}
