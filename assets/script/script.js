let startButton = document.getElementById("start")
let highscoreButton = document.getElementById("highscoreButton")

let multiChoice = document.getElementById("multiChoice");
let intro = document.getElementById("intro");
let question = document.getElementById("question");
let choice_1 = document.getElementById("choice_1");
let choice_2 = document.getElementById("choice_2");
let choice_3 = document.getElementById("choice_3");
let choice_4 = document.getElementById("choice_4");

let timeLeft = 60;
let count =0;
let timerEl = document.getElementById("timer")
let score = 0;

let scoreSubmit = document.getElementById("scoreSubmit")
let nameSubmit = document.getElementById("nameSubmit")
let highscores = document.getElementById("highscores")

let highScore = JSON.parse(localStorage.getItem("highScore"));
if (highScore === null){
  highScore = [];
}
let highScoreLi = [];
let listEl = document.getElementById("listEl")



let home = document.getElementById("home");
let reset = document.getElementById("reset");

let questionsARR =[ {
    "question": "What is HTML?",
    "choice_1": "Programing language",
    "choice_2": "Formating language",
    "choice_3": "Styling language",
    "choice_4": "Useless",
    "answer": "Formating language"
},
{
    "question": "What is CSS?",
    "choice_1": "Programing language",
    "choice_2": "Formating language",
    "choice_3": "Styling language",
    "choice_4": "Useless",
    "answer": "Styling language"
},
{
    "question": "What is Javascript?",
    "choice_1": "Programing language",
    "choice_2": "Formating language",
    "choice_3": "Styling language",
    "choice_4": "Useless",
    "answer": "Programing language"
},
{
    "question": "If, when my function is done, I want a variable defined by calling the function to be set to 8, what should be at the end of my function?",
    "choice_1": "send 8",
    "choice_2": "give 8",
    "choice_3": "return 8",
    "choice_4": "done 8",
    "answer": "return 8"
},
{
    "question": "The logical operator for 'and' is: ",
    "choice_1": "&&",
    "choice_2": "||",
    "choice_3": "++",
    "choice_4": "==",
    "answer": "&&"
}
]


startButton.addEventListener("click",startGame)
home.addEventListener("click",homeButton)
reset.addEventListener("click",resetButton)



function startGame(){

  function timer(){
    let timeInterval = setInterval(function () {
      if (timeLeft > 1) {
        timerEl.textContent = "Time Left: " + timeLeft +" seconds";
        timeLeft--;
      }else if (timeLeft === 1) {
        timerEl.textContent = "Time Left: " + timeLeft +" second";
        timeLeft--;
      } else if(timeLeft === 0){
        timerEl.textContent = 'Time Left: 0 seconds';
        multiChoice.style.display = "none";
        scoreSubmit.style.display = "flex";
        
        if (count<questionsARR.length){
          score = 0;
        }
        timeLeft = 60;
        count = 0;
        let scoreDisplay= document.getElementById("scoreDisplay");
        scoreDisplay.textContent= "Your score is: "+`${score}`;
        clearInterval(timeInterval);
      }
      return;
    }, 1000);
}

  timer()
  multiChoice.style.display = "flex";
  intro.style.display = "none";

  question.textContent = questionsARR[count].question;
  choice_1.textContent = questionsARR[count].choice_1;
  choice_2.textContent = questionsARR[count].choice_2;
  choice_3.textContent = questionsARR[count].choice_3;
  choice_4.textContent = questionsARR[count].choice_4;

  multiChoice.addEventListener("click", questionWrite)

  nameSubmit.addEventListener("click",storeScore )



}

function writeHighscore(){
  for(let i=0; i<highScore.length;i++){
    highScoreLi.push(document.createElement("li"));
    highScoreLi[i].textContent = "Name: " + highScore[i][1] + " Score: " + highScore[i][0];
    listEl.appendChild(highScoreLi[i])

  }

}

function questionWrite(event){
  event.stopPropagation();
  let element = event.target;
  if (element.matches("button")){
    let chosenAnswer = element.textContent;

    if (chosenAnswer !== questionsARR[count].answer){
      timeLeft = timeLeft-15;
    }

    count++;

    if (count<questionsARR.length){
      question.textContent = questionsARR[count].question;
      choice_1.textContent = questionsARR[count].choice_1;
      choice_2.textContent = questionsARR[count].choice_2;
      choice_3.textContent = questionsARR[count].choice_3;
      choice_4.textContent = questionsARR[count].choice_4;
    }else{
      score = timeLeft;
      timeLeft = 0;
    }
    
  }
}

function resetButton(){
  localStorage.setItem("highScore",null);
  for(let i=0; i<highScore.length;i++){
    listEl.removeChild(highScoreLi[i])
  }
  highScore = [];
  highScoreLi = [];
}

function homeButton(){
  highscores.style.display = "none";
  intro.style.display = "flex";
}

function storeScore(event){
  event.preventDefault();
  event.stopPropagation();

  let playerName = document.getElementById("playerName");
  highScore.push([score,playerName.value]);
  highScore.sort();
  highScore.reverse();
  localStorage.setItem("highScore",JSON.stringify(highScore));

  writeHighscore()

  highscores.style.display = "flex";
  scoreSubmit.style.display = "none";
}

