function updateClock() {
  const now = new Date();
  const hrs = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const timeStr = `${hrs}:${mins}`;

  const el = document.querySelector('.watch');
  console.log(timeStr);
  console.log(el.textContent)
  if (el) el.textContent = timeStr;
}

updateClock();
setInterval(updateClock, 1000);