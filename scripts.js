const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll("[operator]");
const equalsButton = document.querySelector("[equals]");
const clearLastEntryButton = document.querySelector("[clear-last-entry]");
const clearAllButton = document.querySelector("[clear-all]");
const draftNumberElement = document.querySelector(".draft");
const currentNumberElement = document.querySelector(".current-number");

let draftNumber = draftNumberElement.innerText;
let currentNumber = currentNumberElement.innerText;
let operation;

const appendNumber = (number) => {
  if (number === "." && currentNumber.includes(".")) return;

  if (currentNumber === "0") {
    if (number === ".") {
      currentNumber += number;
    } else if (number !== "0") {
      currentNumber = number;
    }
  } else {
    currentNumber += number;
  }
};

const chooseOperation = (selectedOperation) => {
  if (currentNumber === "0") return;

  if (draftNumber !== "0") {
    calculateOperation();
  }

  operation = selectedOperation;
  draftNumber = currentNumber;
  currentNumber = "0";
};

const calculateOperation = () => {
  let result;
  const draft = parseFloat(draftNumber);
  const current = parseFloat(currentNumber);

  if (isNaN(draft) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = (draft + current).toString();
      break;
    case "-":
      result = (draft - current).toString();
      break;
    case "x":
      result = (draft * current).toString();
      break;
    case "÷":
      result = (draft / current).toString();
      break;
  }

  currentNumber = result;
  operation = undefined;
  draftNumber = "0";
};

const updateDisplay = () => {
  draftNumberElement.innerText = draftNumber;
  currentNumberElement.innerText = currentNumber;
};

const changeOperationButtonColor = () => {
  for (const button of operationButtons) {
    button.classList.remove("selected");
  }
};

for (let numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    appendNumber(numberButton.innerText);
    updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    if (operationButton.innerText === "%") {
      currentNumber = (parseFloat(currentNumber) / 100).toString();
    } else {
      changeOperationButtonColor();
      operationButton.classList.add("selected");
      chooseOperation(operationButton.innerText);
    }
    updateDisplay();
  });
}

equalsButton.addEventListener("click", () => {
  changeOperationButtonColor();

  if (currentNumber !== "0") {
    calculateOperation();
  }
  updateDisplay();
});

clearLastEntryButton.addEventListener("click", () => {
  changeOperationButtonColor();

  if (currentNumber.length === 1) {
    currentNumber = "0";
  } else {
    currentNumber = currentNumber.slice(0, -1);
  }
  updateDisplay();
});

clearAllButton.addEventListener("click", () => {
  changeOperationButtonColor();
  draftNumber = "0";
  currentNumber = "0";
  updateDisplay();
});
