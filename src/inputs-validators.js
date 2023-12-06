const dayjs = require('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);

export const displayErrorMessage = (inputContainerElement, messageText) => {
    document.querySelectorAll(`.input-container.${inputContainerElement}`).forEach(element => {
        element.classList.add('has-error');
        element.querySelector('.errormessage').textContent = messageText;
    });
};

export const cleanAllErrorMessages = () => {
    document.querySelectorAll('.input-container').forEach(element => {
        element.classList.remove('has-error');
        element.querySelector('.errormessage').textContent = '';
    });
};

/**
 * Check if the entered day is valid.
 * @return {boolean} 
 */
const handleDayInput = day => {
    if (day.length === 0) {
        displayErrorMessage("day", "This field is required");
        return false;
    } else if (day < 1 || day > 31) {
        displayErrorMessage("day", "Please enter a valid day");
        return false;
    }
    return true;
};

/**
 * Check if the entered month is valid.
 * @return {boolean} 
 */
const handleMonthInput = month => {
    if (month.length === 0) {
        displayErrorMessage("month", "This field is required");
        return false;
    } else if (month < 1 || month > 12) {
        displayErrorMessage("month", "Please enter a valid month");
        return false;
    }
    return true;
};

/**
 * Check if the entered year is valid.
 * @return {boolean} 
 */
const handleYearInput = year => {
    const actualYear = new Date().getFullYear();
    
    if (year.length === 0) {
        displayErrorMessage("year", "This field is required");
        return false;
    } else if (year < 100) {
        displayErrorMessage("year", "It's too far in the past");
        return false;
    } else if (year > actualYear) {
        displayErrorMessage("year", "It's too far in the future");
        return false;
    }
    return true;
};

/**
 * Check if the entered date is valid.
 * @return {boolean} true if the date is valid, false otherwise.
 */
export const isValidDate = (year, month, day) => {
    // Manage all inputs
    const isDayValid = handleDayInput(day);
    const isMonthValid = handleMonthInput(month);
    const isYearValid = handleYearInput(year);

    if (isDayValid && isMonthValid && isYearValid) {
        day.length === 1 && (day = `0${day}`);
        month.length === 1 && (month = `0${month}`);
        year.length === 3 && (year = `0${year}`);

        // Check if the date exists with dayjs library
        return dayjs(`${year}-${day}-${month}`, 'YYYY-DD-MM', true).isValid();
    } 
    else return false;
};