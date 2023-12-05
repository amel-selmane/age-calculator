// Get input elements
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

// Get result elements
const years = document.querySelector('.years span');
const months = document.querySelector('.months span');
const days = document.querySelector('.days span');

/**
 * Checks if a given year is a leap year.
 *
 * @param {number} year - The year to check.
 * @returns {boolean} Returns true if the year is a leap year, false otherwise.
 */
const isLeapYear = year => {
    if (year % 4 !== 0) {
      return false;
    } else if (year % 100 !== 0) {
      return true;
    } else if (year % 400 !== 0) {
      return false;
    } else {
      return true;
    }
}

// function isValidDate(year, month, day) {
//     var date = new Date(year, month - 1, day);
//     return date && date.getMonth() === month - 1 && date.getDate() == day;
// }

/**
 * Check if the date entered is valid.
 *
 * @return {boolean} true if the date is valid, false otherwise.
 */
const isValidDate = (year, month, day) => {
    const actualYear = new Date().getFullYear();

    if (dayInput.value < 1 || dayInput.value > 31) {
        return false
    } else if (monthInput.value < 1 || monthInput.value > 12) {
        return false;
    } else if (yearInput.value < 1 || yearInput.value > actualYear) {
        return false
    }

    var date = new Date(year, month - 1, day);
    console.log('IS VALID', date.getMonth(), month - 1)
    return date && date.getMonth() === month - 1 && date.getDate() == day;
}

/**
 * @param {string} bornDate (format: timestamp) - The born date.
 */
const calculateAge = bornDate => {
    isValidDate(bornDate.getFullYear(), bornDate.getMonth() + 1, bornDate.getDate())

    console.log("ICI", isValidDate(bornDate.getFullYear(), bornDate.getMonth() + 1, bornDate.getDate()));
    console.log("DATE", new Date(`${bornDate.getFullYear()}, ${bornDate.getMonth() + 1}, ${bornDate.getDate()}`))

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
document.querySelector('.validator button').addEventListener('click', e => {
    e.preventDefault();

    const inputDate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);
    
    // Check if inputs are empty
    if (inputDate.toString() === 'Invalid Date') {
        [...document.querySelectorAll('.errormessage')].map(element => {
            element.classList.add('visible');
        })

        return
    } else {
        [...document.querySelectorAll('.errormessage')].map(element => {
            element.classList.remove('visible');
        })
    }

    years.textContent = calculateAge(inputDate).years;
    months.textContent = calculateAge(inputDate).months;
    days.textContent = calculateAge(inputDate).days;
})