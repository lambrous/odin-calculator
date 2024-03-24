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
let currentOperator = null;
let hasResult = true;
let inputValue = elNumInput.textContent;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(n1 = firstNum, n2 = secondNum, operator = currentOperator) {
	const operation = {
		"+": add(n1, n2),
		"-": subtract(n1, n2),
		"*": multiply(n1, n2),
		"/": divide(n1, n2),
	};
	return operation[operator];
}

function getSymbol(operator) {
	const symbols = {
		"+": "+",
		"-": "−",
		"*": "×",
		"/": "÷",
	};
	return symbols[operator] || "";
}

function concatInput(char) {
	if (inputValue.length < 22) {
		inputValue += char;
		updateInputEl();
	}
}

function replaceInput(value = "") {
	inputValue = String(value);
	updateInputEl();
}

function updateInputEl() {
	elNumInput.textContent = `${inputValue}`;
	if (inputValue.length > 14) {
		elNumInput.style.fontSize = `${2.5 * (14 / inputValue.length)}rem`;
	} else {
		elNumInput.style.fontSize = "2.5rem";
	}
}

function isInputEmpty() {
	const emptyValues = ["", "-", "0.", "-0."];
	return emptyValues.includes(inputValue);
}

function resetValues() {
	firstNum = null;
	secondNum = null;
	currentOperator = null;
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
	elOperator.textContent = getSymbol(currentOperator);
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
		if (selectedOperator === "-") {
			hasResult = false;
			replaceInput("-");
		}
		return;
	}

	if (firstNum !== null) {
		secondNum = +inputValue;
		firstNum = operate();
		currentOperator = selectedOperator;
	} else {
		currentOperator = selectedOperator;
		firstNum = +inputValue;
	}

	showEquation();
	replaceInput();
}

function handleResult() {
	if (firstNum !== null && !isInputEmpty()) {
		secondNum = +inputValue;
		replaceInput(operate());
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

function toggleActiveStyle(el, add) {
	if (add) {
		el.classList.add("active");
	} else {
		el.classList.remove("active");
	}
}

function handleKeys(event, addStyle) {
	const key = event.key || event.keyCode;
	let btn;

	if ((key >= "0" && key <= "9") || key === ".") {
		btn = document.querySelector(`button[data-digit="${key}"`);
	} else if (["+", "-", "*", "/"].includes(key)) {
		btn = document.querySelector(`button[data-operator="${key}"`);
	} else if (key === "Backspace") {
		btn = btnBackspace;
	} else if (key === "Enter" || key === "=") {
		btn = btnEqual;
	} else if (key === "Delete") {
		btn = btnClear;
	}

	if (btn) {
		toggleActiveStyle(btn, addStyle);
		if (addStyle) {
			btn.click();
		}
	}
}

function handleKeyDown(event) {
	handleKeys(event, true);
}

function handleKeyUp(event) {
	handleKeys(event, false);
}

for (btn of btnsDigit) btn.addEventListener("click", handleDigit);
for (btn of btnsOperator) btn.addEventListener("click", handleOperation);
btnEqual.addEventListener("click", handleResult);
btnClear.addEventListener("click", handleClear);
btnDecimal.addEventListener("click", handleDecimal);
btnZero.addEventListener("click", handleZero);
btnBackspace.addEventListener("click", handleBackspace);
document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);
