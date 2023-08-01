"use strict";

// Elements (unchanged)
const calculator = document.querySelector(".calculator");
const toggleBtn = document.querySelector(".toggle_btn");
const toggleIcon = document.querySelector(".toggle_icon");
const numbers = document.querySelectorAll(".number");
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");
const deleteAllBtn = document.querySelector(".all_clear");
const deleteBtn = document.querySelector(".clear_last");
const operatorsAll = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");

//Toggle button to select the theme (unchanged)
toggleBtn.addEventListener("click", () => {
  calculator.classList.toggle("dark_mode");
  toggleIcon.classList.toggle("white");
  displayEl.classList.toggle("dark");
});

let calculations = [];
let acc;

//Function to calculate based on button clicked
function calculate(button) {
  const isIcon = button.querySelector("i");
  const value = isIcon ? button.dataset.value : button.textContent;
  //if C is clicked clear the display
  if (value === "C") {
    calculations = [];
    display.textContent = "";
    // if del is clicked delete the last entry
  } else if (value === "DEL") {
    calculations.pop();
    acc = calculations.join("");
    display.textContent = acc;
    // if = is clicked evaluates the expression
  } else if (value === "=") {
    display.textContent = eval(acc);

    //else push the values in arr and show in display
  } else {
    calculations.push(value);
    acc = calculations.join("");
    display.textContent = acc;
  }
}

//Button click listener calls calculate() with dataset value as argument
buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    calculate(button);
  })
);
