//navigation button variable assignments
let highscoreButton = document.getElementById("highscoreButton");
let homeButton = document.getElementById("homeButton");
let resetButton = document.getElementById("resetButton");
let startButton = document.getElementById("startButton");
//timer variable assignments
let timerEl = document.getElementById("timer")
//multiple choice question sections variable assignments
let choice_1 = document.getElementById("choice_1");
let choice_2 = document.getElementById("choice_2");
let choice_3 = document.getElementById("choice_3");
let choice_4 = document.getElementById("choice_4");
let intro = document.getElementById("intro");
let multiChoice = document.getElementById("multiChoice");
let question = document.getElementById("question");
//score submission section variable assignments
let scoreDisplay= document.getElementById("scoreDisplay");
let scoreSubmit = document.getElementById("scoreSubmit")
let nameSubmit = document.getElementById("nameSubmit")
//highscore list variable assignments
let highscoreSection = document.getElementById("highscoreSection")
let highscoreList = document.getElementById("highscoreList")
//script variable assignments
let count =0;
let highscoreStorage = JSON.parse(localStorage.getItem("highscoreStorage"));
if (highscoreStorage === null){
  highscoreStorage = [];
}
let highscoreLi = [];
let score = 0;
let timeLeft = 60;
//multiple choice questions
let questionsARR =[ {
    "question": "What is HTML?",
    "choice_1": "Programing language",
    "choice_2": "Markup language",
    "choice_3": "Styling language",
    "choice_4": "Useless",
    "answer": "Markup language"
},
{
    "question": "What is CSS?",
    "choice_1": "Programing language",
    "choice_2": "Markup language",
    "choice_3": "Styling language",
    "choice_4": "Useless",
    "answer": "Styling language"
},
{
    "question": "What is Javascript?",
    "choice_1": "Programing language",
    "choice_2": "Markup language",
    "choice_3": "Styling language",
    "choice_4": "Useless",
    "answer": "Programing language"
},
{
    "question": "If I define a function 'giveMeEight()' and in my code I have 'a=giveMeEight()' what should my funcion end with to set the variable 'a' to '8'?",
    "choice_1": "send 8",
    "choice_2": "give 8",
    "choice_3": "return 8",
    "choice_4": "done 8",
    "answer": "return 8"
},
{
    "question": "What is the logical operator for 'and'?",
    "choice_1": "&&",
    "choice_2": "||",
    "choice_3": "++",
    "choice_4": "==",
    "answer": "&&"
}
]

//Event listeners
highscoreButton.addEventListener("click",showHighscores);
homeButton.addEventListener("click",showHome);
multiChoice.addEventListener("click", questionWrite)
nameSubmit.addEventListener("click",storeScore )
resetButton.addEventListener("click",resetHighscore);
startButton.addEventListener("click",startGame);


//functions

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
      if(score < 0){
        score = 0;
      }
      timeLeft = 0;
    }
    
  }
}

function resetHighscore(){
  localStorage.setItem("highscoreStorage",null);
  for(let i=0; i<highscoreStorage.length;i++){
    highscoreList.removeChild(highscoreLi[i])
  }
  highscoreStorage = [];
  highscoreLi = [];
}

function showHighscores(){
  highscoreSection.style.display = "flex";
  intro.style.display = "none";
  if (highscoreStorage!==[]){
    writeHighscore();
  }
}

function showHome(){
  highscoreSection.style.display = "none";
  intro.style.display = "flex";
}

function startGame(){
  timer()
  multiChoice.style.display = "flex";
  intro.style.display = "none";

  question.textContent = questionsARR[count].question;
  choice_1.textContent = questionsARR[count].choice_1;
  choice_2.textContent = questionsARR[count].choice_2;
  choice_3.textContent = questionsARR[count].choice_3;
  choice_4.textContent = questionsARR[count].choice_4;
}

function storeScore(event){
  event.preventDefault();
  event.stopPropagation();
  let playerName = document.getElementById("playerName");
  highscoreStorage.push([score,playerName.value]);
  highscoreStorage.sort();
  highscoreStorage.reverse();
  localStorage.setItem("highscoreStorage",JSON.stringify(highscoreStorage));
  writeHighscore()
  highscoreSection.style.display = "flex";
  scoreSubmit.style.display = "none";
}

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
      scoreDisplay.textContent= "Your score is: "+`${score}`;
      clearInterval(timeInterval);
    }
    return;
  }, 1000);
}

function writeHighscore(){
  for(let i=0; i<highscoreStorage.length;i++){
    highscoreLi.push(document.createElement("li"));
    highscoreLi[i].textContent = "Name: " + highscoreStorage[i][1] + " Score: " + highscoreStorage[i][0];
    highscoreList.appendChild(highscoreLi[i])

  }

}