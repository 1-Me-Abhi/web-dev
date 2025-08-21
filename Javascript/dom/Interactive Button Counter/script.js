let noOfClick = document.querySelector('.counter');
let counterDisplay = document.querySelector('.number');
let changeColor = document.querySelector('.changeColor');

let count = 0;

noOfClick.addEventListener('click', function() {
    count++;
    counterDisplay.textContent = count + ' Clicks';
});
let color=function () {
  const maxVal = 0xFFFFFF; // 16777215
  let randomNumber = Math.floor(Math.random() * (maxVal + 1));
  let hexColor = randomNumber.toString(16);
  hexColor = hexColor.padStart(6, '0'); // Ensure 6 digits
  return `#${hexColor.toUpperCase()}`; // Convert to uppercase for consistency
}
function change_the_color(){
    document.body.style.background = color();
}
changeColor.addEventListener('click',change_the_color);