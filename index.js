// Get input elements
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');

// Get result elements
const years = document.querySelector('.years span');
const months = document.querySelector('.months span');
const days = document.querySelector('.days span');

const isValidDay = (year, month, day) => {
    let date = new Date(year, month - 1, day);
    console.log(date.getMonth())
    return date.getMonth() === month - 1 && date.getDate() === day;
}

const isValidDate = () => {
    if (dayInput.value < 1 || dayInput.value > 31) {
        return false
    } else if (monthInput.value < 1 || monthInput.value > 12) {
        return false;
    } else if (yearInput.value < 1) {
        return false;
    }
}

/**
 * @param {string} date (format: YYYY-MM-DD) - The born date.
 */
const calculateAge = bornDate => {
    isValidDay(bornDate.getFullYear(), bornDate.getMonth() + 1, bornDate.getDate());

    if (isValidDate() === false) {
        console.log('NIQUE TOI')
        return
    }

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