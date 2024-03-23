const elNumInput = document.querySelector(".input");
const elAccumulatedNum = document.querySelector(".recent-num");
const elOperator = document.querySelector(".operator");
const btnsDigit = document.querySelectorAll(".digit");
const btnsOperator = document.querySelectorAll(".operator");
const btnEqual = document.querySelector(".equals");
const btnClear = document.querySelector(".clear");
const btnDecimal = document.querySelector(".decimal");
const btnZero = document.querySelector(".zero");

let firstNum = null;
let secondNum = null;
let operator = null;
let hasResult = true;
let inputValue = elNumInput.textContent;

const calculator = {
	plus: (a, b) => a + b,
	minus: (a, b) => a - b,
	times: (a, b) => a * b,
	divide: (a, b) => a / b,
};

function getSymbol(operator) {
	const symbols = {
		plus: "+",
		minus: "−",
		times: "×",
		divide: "÷",
	};
	return symbols[operator] || "";
}

function concatInput(str) {
	inputValue += str;
	updateInputEl();
}

function clearInput(value = "") {
	inputValue = String(value);
	updateInputEl();
}

function updateInputEl() {
	elNumInput.textContent = `${inputValue}`;
}

function isInputEmpty() {
	const emptyValues = ["", "-", "0.", "-0."];
	return emptyValues.includes(inputValue);
}

function resetValues() {
	firstNum = null;
	secondNum = null;
	operator = null;
}

function showDigit(btn) {
	if (hasResult) {
		clearInput();
		hasResult = false;
	}

	const { digit } = btn.dataset;
	concatInput(digit);
}

function showEquation() {
	elAccumulatedNum.textContent = firstNum;
	elOperator.textContent = getSymbol(operator);
}

function clearEquationEl() {
	elAccumulatedNum.textContent = "";
	elOperator.textContent = "";
}

function handleClear() {
	clearEquationEl();
	resetValues();
	clearInput(0);
	hasResult = true;
}

function handleDigit() {
	if (inputValue.startsWith("0") && inputValue[1] !== ".") {
		clearInput();
	}
	showDigit(this);
}

function handleDecimal() {
	if (!inputValue.includes(".")) {
		showDigit(this);
		if (inputValue === ".") clearInput("0.");
		else if (inputValue === "-.") clearInput("-0.");
	}
}

function handleZero() {
	if (inputValue !== "0" && inputValue !== "-0") showDigit(this);
}

function handleOperation() {
	const selectedOperator = this.dataset.operator;

	if (isInputEmpty()) {
		if (selectedOperator === "minus") {
			hasResult = false;
			clearInput("-");
		}
		return;
	}

	if (firstNum !== null) {
		secondNum = +inputValue;
		firstNum = calculator[operator](firstNum, secondNum);
		operator = selectedOperator;
	} else {
		operator = selectedOperator;
		firstNum = +inputValue;
	}

	showEquation();
	clearInput();
}

function handleResult() {
	if (firstNum !== null && !isInputEmpty()) {
		secondNum = +inputValue;
		clearInput(calculator[operator](firstNum, secondNum));
		clearEquationEl();
		resetValues();
		hasResult = true;
	}
}

for (btn of btnsDigit) btn.addEventListener("click", handleDigit);
for (btn of btnsOperator) btn.addEventListener("click", handleOperation);
btnEqual.addEventListener("click", handleResult);
btnClear.addEventListener("click", handleClear);
btnDecimal.addEventListener("click", handleDecimal);
btnZero.addEventListener("click", handleZero);
