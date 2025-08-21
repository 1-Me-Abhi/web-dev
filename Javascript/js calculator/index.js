const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (value === 'C') {
      // Clear the display
      currentInput = '';
      display.textContent = '';
    } 
    else if (value === '=') {
      try {
        // Replace symbols with JavaScript operators
        const expression = currentInput
          .replace(/×/g, '*')
          .replace(/÷/g, '/')
          .replace(/−/g, '-');

        // Evaluate result
        const result = eval(expression);
        display.textContent = result;
        currentInput = result.toString();
      } catch {
        display.textContent = 'Error';
        currentInput = '';
      }
    } 
    else {
      // Append clicked value to input
      currentInput += value;
      display.textContent = currentInput;
    }
  });
});
