const elNumInput = document.querySelector(".input");
const elAccumulatedNum = document.querySelector(".recent-num");
const elOperator = document.querySelector(".operator");
const btnsDigit = document.querySelectorAll(".digit");
const btnsOperator = document.querySelectorAll(".operator");
const btnEqual = document.querySelector(".equals");
const btnClear = document.querySelector(".clear");
const btnDecimal = document.querySelector(".decimal");
const btnZero = document.querySelector(".zero");
const btnBackspace = document.querySelector(".delete");

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

function replaceInput(value = "") {
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
	hasResult = true;
}

function showDigit(btn) {
	if (hasResult) {
		replaceInput();
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
	replaceInput(0);
}

function handleDigit() {
	if (inputValue.startsWith("0") && inputValue[1] !== ".") {
		replaceInput();
	}
	showDigit(this);
}

function handleDecimal() {
	if (!inputValue.includes(".")) {
		showDigit(this);
		if (inputValue === ".") replaceInput("0.");
		else if (inputValue === "-.") replaceInput("-0.");
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
			replaceInput("-");
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
	replaceInput();
}

function handleResult() {
	if (firstNum !== null && !isInputEmpty()) {
		secondNum = +inputValue;
		replaceInput(calculator[operator](firstNum, secondNum));
		clearEquationEl();
		resetValues();
	}
}

function handleBackspace() {
	if (inputValue !== "" && !hasResult) {
		replaceInput(inputValue.slice(0, -1));
	} else if (inputValue === "" && firstNum !== null) {
		replaceInput(firstNum);
		clearEquationEl();
		resetValues();
	}
}

for (btn of btnsDigit) btn.addEventListener("click", handleDigit);
for (btn of btnsOperator) btn.addEventListener("click", handleOperation);
btnEqual.addEventListener("click", handleResult);
btnClear.addEventListener("click", handleClear);
btnDecimal.addEventListener("click", handleDecimal);
btnZero.addEventListener("click", handleZero);
btnBackspace.addEventListener("click", handleBackspace);
