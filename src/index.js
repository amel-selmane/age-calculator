import { isValidDate, cleanAllErrorMessages } from "./inputs-validators";
import './style.css';

// Get input elements
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

// Get result elements
const years = document.querySelector('.years span');
const months = document.querySelector('.months span');
const days = document.querySelector('.days span');

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

// Button click event
document.querySelector('.app-form').addEventListener('submit', e => {
    e.preventDefault();
    cleanAllErrorMessages();

    if (isValidDate(yearInput.value, monthInput.value, dayInput.value)) {
        const inputDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);

        let daysCounter = 0;
        const daysInterval = setInterval(() => {
            days.textContent = ++daysCounter;
            if (daysCounter === calculateAge(inputDate).days) clearInterval(daysInterval);
        }, 100);
        
        let monthsCounter = 0;
        const monthsInterval = setInterval(() => {
            months.textContent = ++monthsCounter;
            if (monthsCounter === calculateAge(inputDate).months) clearInterval(monthsInterval);
        }, 100);
        
        let yearsCounter = 0;
        const yearsInterval = setInterval(() => {
            years.textContent = ++yearsCounter;
            if (yearsCounter === calculateAge(inputDate).years) clearInterval(yearsInterval);
        }, 10);
    } else {
        years.textContent = "--";
        months.textContent = "--";
        days.textContent = "--";
    };
});