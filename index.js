const questionsArray = [
    {
      question: 'Who was the lead singer of the band Queen in the 1970s?',
      answer: 'Freddie Mercury',
      options: ['Mick Jagger', 'John Lennon', 'Robert Plant', 'Freddie Mercury']
    },
    {
      question: 'Which band released the iconic song "Take On Me" in 1985?',
      answer: 'A-Ha',
      options: ['Depeche Mode', 'A-Ha', 'The Cure', 'Wham!']
    },
    {
      question: 'Which song by the Cranberries was a massive hit in 1994?',
      answer: 'Zombie',
      options: ['Zombie', 'Linger', 'Dreams', 'Just My Imagination']
    },
    {
      question: 'Which band released the album "American Idiot" in 2004?',
      answer: 'Green Day',
      options: ['Green Day', 'Blink-182', 'Sum 41', 'The Offspring']
    },
    {
      question: 'Which Lady Gaga song became iconic after its release in 2014?',
      answer: 'Bad Romance',
      options: ['Poker Face', 'Just Dance', 'Bad Romance', 'Teeth']
    }
  ];
  
 // Game state variables
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

// DOM Elements
const quizContainer = document.getElementById('quiz');
let startButton;

// Initialize game when window loads
window.onload = () => {
  const previousScore = localStorage.getItem('previous-score');
  if (previousScore !== null) {
    quizContainer.innerHTML = `<p>Previous Score: ${previousScore}%</p><button id="start-quiz">Start Quiz!</button>`;
  } else {
    quizContainer.innerHTML = `<button id="start-quiz">Start Quiz!</button>`;
  }

  // Attach event listener to the start button after it's created
  startButton = document.getElementById('start-quiz');
  if (startButton) {
  startButton.addEventListener('click', startQuiz);
  }
}

// Function to start the quiz
function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  timeLeft = 30;  
  startButton.remove(); 
  
  displayQuestion(); 
  startTimer(); 
}

// Function to display the current question and options
function displayQuestion() {
  const currentQuestion = questionsArray[currentQuestionIndex];
  quizContainer.innerHTML = `
    <p>${currentQuestion.question}</p>
    <div id="options"></div>
    <p id="timer">${timeLeft}</p>
  `;

  const optionsContainer = document.getElementById('options');
  currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.onclick = () => selectAnswer(option);
    optionsContainer.appendChild(button);
  });
}

// Function to handle answer selection
function selectAnswer(selectedOption) {
  const correctAnswer = questionsArray[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
    score++;
  }

  // Move to the next question or end the quiz
  if (currentQuestionIndex < questionsArray.length - 1) {
    currentQuestionIndex++;
    displayQuestion();  
    timeLeft = 30;  
    startTimer();  
  } else {
    endQuiz();  
  }
}

// Function to start the countdown timer and continue across rounds
function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft; 
    } else {
      clearInterval(timer); 
      if (currentQuestionIndex < questionsArray.length -1) {
      selectAnswer("");
      } else {
        endQuiz();
      }
    }
  }, 1000);
}

// Function to end the quiz and display the final score
function endQuiz() {
  const scorePercentage = Math.round((score / questionsArray.length) * 100);
  localStorage.setItem('previous-score', scorePercentage);
  quizContainer.innerHTML = `
    <p>Quiz Over! Your Score: ${scorePercentage}%</p>
    <button id="start-quiz">Start Quiz!</button>
  `;

  // Reattach event listener to the restart button
  startButton = document.getElementById('start-quiz');
  startButton.addEventListener('click', startQuiz);
}