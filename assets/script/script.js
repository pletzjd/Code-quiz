let startButton = document.getElementById("start")
let highscoreButton = document.getElementById("highscore")

startButton.addEventListener("click",timer)


function timer(){
    let timeLeft = 10;
    let timerEl = document.getElementById("timer")

  let timeInterval = setInterval(function () {

    if (timeLeft > 1) {
      timerEl.textContent = "Time Left: " + timeLeft +" seconds";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = "Time Left: " + timeLeft +" second";
      timeLeft--;
    } else {
      timerEl.textContent = 'Time Left: 0 seconds';
      clearInterval(timeInterval);
    }
    return
}, 1000);
}