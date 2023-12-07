import { isValidDate, cleanAllErrorMessages } from "./inputs-validators";
import './style.css';

// Get input elements
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

// Get result elements
const yearsResult = document.querySelector('.years span');
const monthsResult = document.querySelector('.months span');
const daysResult = document.querySelector('.days span');

/**
 * @param {string} bornDate (format: timestamp) - The born date.
 */
const calculateAge = bornDate => {
    let ageDate = new Date(Date.now() - bornDate.getTime());
    let days = ageDate.getUTCDate() - 1;
    let months = ageDate.getUTCMonth();
    let years = ageDate.getUTCFullYear() - 1970;

    return {
        years,
        months,
        days
    }
}

/**
 * Animates a counter on an HTML element.
 *
 * @param {HTMLElement} htmlElementToAnimate - The HTML element to animate.
 * @param {number} ageValue - The value to animate the counter up to.
 * @param {number} [intervalValue=100] - The interval between each increment of the counter.
 */
const animateCounter = (htmlElementToAnimate, ageValue, intervalValue = 100) => {
    let counter = 0;
    const interval = setInterval(() => {
        htmlElementToAnimate.textContent = ++counter;
        if (counter >= ageValue) clearInterval(interval);
    }, intervalValue);
}

// Button click event
document.querySelector('.app-form').addEventListener('submit', e => {
    e.preventDefault();
    cleanAllErrorMessages();

    if (isValidDate(yearInput.value, monthInput.value, dayInput.value)) {
        const inputDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);

        animateCounter(daysResult, calculateAge(inputDate).days, 100);
        animateCounter(monthsResult, calculateAge(inputDate).months, 100);
        animateCounter(yearsResult, calculateAge(inputDate).years, 10);
    } else {
        yearsResult.textContent = "--";
        monthsResult.textContent = "--";
        daysResult.textContent = "--";
    };
});