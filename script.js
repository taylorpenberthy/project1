// Trivia Game

var currentQuestionIndex;
var correct = 0;
var question, choice, choices;
var userScore = 0;
// Create an array of the user's selection to check against the correct choice
var selections = [];
// class Quiz(questions) {
//     this.score = 0;
//     this.questions = questions;
//     this.questionIndex = 0;
// }
function get(x) {
    return document.getElementById(x);
}
const openButton = get("open");
const modal = get("modal");
const close = get("close");
var askQuestion = get("question");
var getChoices = get("choices");
const listChoices = get("listChoices");
const score = get("score");
console.log(listChoices);

const openBox = () => {
  modal.style.display = "block";
};

const closeBox = () => {
  modal.style.display = "none";
};
openButton.addEventListener("click", openBox);
close.addEventListener("click", closeBox);

const startBtn = get("start");
const hideP = get("hide");
function initialize() {
    currentQuestionIndex = 0;
  startBtn.innerHTML = 'Next';
  hideP.style.display = 'none';
  nextBtn = document.createElement("button");
  nextBtn.classList.add("next");
  startBtn.appendChild(nextBtn);
  displayQuestion();
  }


// Create a class called Question that will use the questions that I produce
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
}

var questions = [
  new Question(
    "Where is Taylor from?",
    ["California", "New York", "Chicago", "Wisconsin", "Tennessee"],
    "New York"
  ),
  new Question(
    "Where did Taylor go to school?",
    [
      "University of Wisconsin-Madison",
      "NYU",
      "University of Oregon",
      "Tulane University",
      "Ohio State University"
    ],
    "University of Wisconsin-Madison"
  ),
  new Question(
    "What field does Taylor hope to work in?",
    [
      "Game Development",
      "Healthcare Technology",
      "Software Sales",
      "Finance",
      "Music"
    ],
    "Healthcare Technology"
  ),
  new Question(
    "Which of the following is Taylor's dog?",
    ["Frida", "Jack", "Snickers", "Lucy", "Taylor"],
    "Frida"
  )
];



function correctAnswer(index) {
    index = currentQuestionIndex;
  return questions[index].answer;
    
}

function clearChoices() {
    let child = listChoices.firstElementChild;
    while (child) {
        listChoices.removeChild(child);
        child = listChoices.firstElementChild;
    }
}

function displayQuestion () {
    if (currentQuestionIndex >= questions.length) {
        askQuestion.innerHTML = `You got ${correct} of ${questions.length} questions correct.`
    }
    askQuestion.innerHTML = questions[currentQuestionIndex].text;
    displayChoices();
}


function displayChoices() {
    getChoices.style.display = 'none'
    let theseQs = questions[currentQuestionIndex].choices;
    for (let i = 0; i < theseQs.length; i++) {
        option = document.createElement("div");
        option.classList.add('choice');
        option.innerHTML = theseQs[i];
        listChoices.appendChild(option);
        clickEvent(option);
}
}

function clickEvent(event) {
    event.addEventListener("click", function(e) {
        e = event;
        if (e.innerHTML == correctAnswer(currentQuestionIndex)) {
            console.log("Correct answer!");
            addScore(10);
            clearChoices();
            currentQuestionIndex++;
            setInterval(displayQuestion(), 5000);
        }
    })
    
}
    
function addScore(num) {
    userScore += num;
    score.innerText = userScore;
}
