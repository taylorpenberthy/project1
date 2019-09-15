// Trivia Game
// Sources: https://css-tricks.com/restart-css-animation/
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
const resultScreen = get("overlay");
const results = get("results");
const nextButton = get("#nextBtn");
var textbox = get("textbox");
const iconBox = get('boxWithIcons');
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
  startBtn.style.display = 'none';
  hideP.style.display = "none";
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
  ),
  new Question(
    "What is Taylor's number one hard skill?",
    [
      "Using a jackhammer",
      "Problem-solving",
      "Technical Writing",
      "Microsoft Word"
    ],
    "Problem-solving"
  ),
  new Question(
    "What is Taylor's strongest soft skill?",
    [
      "Timeliness",
      "Patience",
      "Communication",
      "Leadership",
      "All of the Above"
    ],
    "All of the Above"
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

function displayQuestion() {
  if (currentQuestionIndex == questions[questions.length - 1]) {
      alert('game over')
    askQuestion.innerHTML = `You got ${correct} of ${questions.length} questions correct.`;
  }else if ((currentQuestionIndex + 1) == 7) {
      endGame();
  }
  else {
        askQuestion.innerHTML = `Question ${currentQuestionIndex + 1} of ${questions.length}: `;
        askQuestion.innerHTML += questions[currentQuestionIndex].text;
        displayChoices();
}
}

function displayChoices() {
  getChoices.style.display = "none";
  let theseQs = questions[currentQuestionIndex].choices;
  for (let i = 0; i < theseQs.length; i++) {
    option = document.createElement("div");
    option.classList.add("choice");
    option.innerHTML = theseQs[i];
    listChoices.appendChild(option);
    clickEvent(option);
  }
}

function clickEvent(event) {
  event.addEventListener("click", function(e) {
    e = event;
    if (e.innerHTML == correctAnswer(currentQuestionIndex)) {
     showResult('win');
      addScore(10);
      clearChoices();
      currentQuestionIndex++;
      setTimeout(displayQuestion(), 5000);
    }else {
        showResult('lose');
        e.style.backgroundColor = 'red';
        clearChoices();
        currentQuestionIndex++;
        setTimeout(displayQuestion(), 10000);
    }
  });
}

function addScore(num) {
  userScore += num;
  score.innerText = userScore;
}

function showResult(outcome) {
    if (outcome == 'win') {
        resultScreen.style.display = 'block';
        results.innerHTML = `Correct answer! Click anywhere to continue. `;
        results.style.display = 'block';
        let myImg = document.images[currentQuestionIndex];
         myImg.style.display = 'inline-block';
         myImg.classList.add('images');
    }if (outcome == 'lose') {
        resultScreen.style.display = 'block';
        results.style.display = 'block';
        results.innerHTML = `Sorry, that is incorrect.  The correct answer is ${correctAnswer(currentQuestionIndex)}. Click anywhere to continute`;
        // nextButton.style.display = 'block';
    }
}

resultScreen.addEventListener("click", function(e) {
    e.preventDefault();
    textbox.classList.remove('bounce');
    // Allows the animation to occur more than once (via CSS tricks)
    void textbox.offsetWidth;
    resultScreen.style.display = 'none';
    textbox.classList.add('bounce');
})

function endGame() {
    resultScreen.style.display = 'block';
    results.innerHTML = `Thanks for playing! You answered ${userScore / 10} questions correctly!`;
    resultScreen.classList.add('winning');
    resultScreen.addEventListener("click", function(e) {
        e.preventDefault();
        askQuestion.innerHTML = `Thanks for playing Taylor's Trivia!`;

    })
}


var x = document.images[0];
console.log(x);