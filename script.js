let endDate;       
let timer;         
let startDate;     

document.getElementById('Set').addEventListener('click', () => {
  document.getElementById('countdown').style.display = 'flex';
  convertToTimestamp();
});

function convertToTimestamp() {
  const dateInput = document.getElementById("date").value;
  const timeInput = document.getElementById("time").value;

  if (!dateInput || !timeInput) {
    document.getElementById("output").textContent = "Please enter both date and time.";
    return;
  }

  // Convert date into readable format
  const dateObj = new Date(dateInput);
  const day = dateObj.getDate();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  const formattedDateTime = `${day} ${month}, ${year} ${timeInput}`;

  // Set new countdown target
  endDate = new Date(formattedDateTime).getTime();
  startDate = new Date().getTime();

  document.getElementById("output").textContent = `Countdown set to: ${formattedDateTime}`;

  // Reset progress bar & countdown numbers
  document.getElementById("progress-bar").style.width = "0%";
  document.getElementById("days").innerHTML = "00";
  document.getElementById("hours").innerHTML = "00";
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";

  
  if (timer) clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  if (!endDate) return;

  const now = new Date().getTime();
  const distanceCovered = now - startDate;
  const distancePending = endDate - now;

  // Time constants
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  // Breakdown into units
  const days = Math.floor(distancePending / oneDay);
  const hrs = Math.floor((distancePending % oneDay) / oneHour);
  const mins = Math.floor((distancePending % oneHour) / oneMinute);
  const secs = Math.floor((distancePending % oneMinute) / oneSecond);

  // Update UI
  document.getElementById("days").innerHTML = days >= 0 ? days : "00";
  document.getElementById("hours").innerHTML = hrs >= 0 ? hrs : "00";
  document.getElementById("minutes").innerHTML = mins >= 0 ? mins : "00";
  document.getElementById("seconds").innerHTML = secs >= 0 ? secs : "00";

  // Progress bar
  const totalDistance = endDate - startDate;
  const percentageDistance = (distanceCovered / totalDistance) * 100;
  document.getElementById("progress-bar").style.width = percentageDistance + "%";

  // Expired state
  if (distancePending < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "EXPIRED";
    document.getElementById("progress-bar").style.width = "100%";
  }
}
