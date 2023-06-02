var questions = [
    {
        question: "Who wrote book called 1984",
        answers: ["George  Orwell", "Stanley Parable", "Ray Bradbury", "Harper Lee"],
        correctAnswer: 1
    },
    {
        question: "Demolition of the Berlin wall separating East and West Germany began in what year?",
        answers: ["1989", "1990", "1968", "1877"],
        correctAnswer: 0
    },
    {
        question: "How long is an Olympic swimming pool (in meters)?",
        answers: ["200m", "50m", "100m", "25m"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Michelangelo"],
        correctAnswer: 0
    },
    {
        question: "What countries made up the original Axis powers in World War II?",
        answers: ["Poland, Latvia, Estonia, Romania", "USA, UK, France, USSR", "Germany, Italy, Japan", "China, Malaysia, Australia"],
        correctAnswer: 2
    },
    {
        question: "Which country is famous for producing maple syrup?",
        answers: ["United States", "Canada", "Mexico", "Brazil"],
        correctAnswer: 1
    },
    {
        question: "Who wrote the epic poem 'Pan Tadeusz'?",
        answers: ["Andrzej Sapkowski", "Adam Mickiewicz", "Ignacy Krasicki", "Aleksander Fredro"],
        correctAnswer: 1
    },
    {
        question: "What is the chemical symbol for gold?",
        answers: ["Go", "Au", "Gd", "Ag"],
        correctAnswer: 1
    },
    {
        question: "Who named the Pacific Ocean?",
        answers: ["Ferdinand Magellan", "William Shakespeare", "Charles Darwin", "F. Scott Fitzgerald"],
        correctAnswer: 0
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"],
        correctAnswer: 0
    },
    {
        question: "What is the name of the biggest technology company in South Korea?",
        answers: ["Kia Motors", "Hyundai Motor", "Samsung Electronics", "LG Electronics"],
        correctAnswer: 2
    },
    {
        question: "What is the chemical formula for water?",
        answers: ["CO2", "H2O", "NaCl", "O2"],
        correctAnswer: 1
    },
    {
        question: "Who was the first woman to win a Nobel Prize (in 1903)?",
        answers: ["Marie Curie", "Alice Ball", "Ada Lovelace", "Helen Taussig"],
        correctAnswer: 0
    },
    {
        question: "Who was the first woman pilot to fly solo across the Atlantic?",
        answers: ["Harriet Quimby", "Tom Cruise", "Amelia Earhart", "Eileen Collins"],
        correctAnswer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Indian Ocean", "Arctic Ocean", "Atlantic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        question: "Who is the current CEO of Tesla? (in 2023)",
        answers: ["Jeff Bezos", "Elon Musk", "Tim Cook", "Satya Nadella"],
        correctAnswer: 1
    },
    {
        question: "Which artist painted the famous artwork 'The Starry Night'?",
        answers: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Salvador Dalí"],
        correctAnswer: 1
    },
    {
        question: "What is the currency of Japan?",
        answers: ["Yuan", "Pound", "Euro", "Yen"],
        correctAnswer: 3
    },
    {
        question: "What is the capital of Australia?",
        answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: 2
    },
    {
        question: "Who wrote the play 'Hamlet'?",
        answers: ["William Shakespeare", "Arthur Miller", "Anton Chekhov", "Tennessee Williams"],
        correctAnswer: 0
    },
    {
        question: "What is the largest planet in our solar system?",
        answers: ["Earth", "Jupiter", "Saturn", "Neptune"],
        correctAnswer: 1
    },
    {
        question: "Which country is famous for the Great Wall?",
        answers: ["China", "Japan", "India", "South Korea"],
        correctAnswer: 0
    },
    {
        question: "Who discovered the theory of relativity?",
        answers: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"],
        correctAnswer: 1
    },
    {
        question: "What is the chemical symbol for oxygen?",
        answers: ["O", "H", "C", "N"],
        correctAnswer: 0
    },
    {
        question: "Which animal is known for its ability to mimic human speech?",
        answers: ["Dolphin", "Elephant", "Parrot", "Monkey"],
        correctAnswer: 2
    }
];

var currentQuestion = 0;
var score = 0;
var selectedAnswers = Array(questions.length).fill(null);

var startBtn = getQuerySelector('.start_btn');
var instructions = getElementById('instructions');
var quizfeaturescontainer = getElementById('quiz-features-container');
var questionContainer = getElementById('question-container');
var resultContainer = getElementById('result-container');
var answerContainer = getElementById('answers-container');

function displayQuestion() {
    var question = questions[currentQuestion];
    var questionText = questionContainer.getElementsByTagName("p")[0];
    var choices = questionContainer.getElementsByTagName("input");
    var progress = document.getElementById("progress");

    questionText.textContent = question.question;

    for (var i = 0; i < choices.length; i++) {
        choices[i].value = question.answers[i];
        choices[i].checked = false;
        choices[i].setAttribute("data-question", currentQuestion);
        choices[i].nextSibling.textContent = question.answers[i];
    }

    var selectedAnswer = selectedAnswers[currentQuestion];
    if (selectedAnswer !== null) {
        var selectedInput = questionContainer.querySelector(
            'input[value="' + selectedAnswer + '"]'
        );
        if (selectedInput !== null) {
            selectedInput.checked = true;
        }
    }

    progress.textContent = "Question " + (currentQuestion + 1) + " of " + questions.length;
}


function nextQuestion() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');

    if (selectedAnswer === null) {
        alert("Choose an answer!");
        return;
    }

    selectedAnswers[currentQuestion] = selectedAnswer.value;

    if (currentQuestion === questions.length - 1) {
        calculateScore();
        displayResult();
    } else {
        currentQuestion++;
        displayQuestion();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
    } else {
        alert("It is first question!");
    }
}

function calculateScore() {
    score = 0;
    for (var i = 0; i < questions.length; i++) {
        if (selectedAnswers[i] === questions[i].answers[questions[i].correctAnswer]) {
            score++;
        }
    }
}

function displayResult() {
    var resultText = document.getElementById("result");
    var scorePercentage = (score / questions.length) * 100;
    var passThreshold = 75;

    resultText.textContent = score + " / " + questions.length + " (" + scorePercentage + "%)";

    if (scorePercentage >= passThreshold) {
        resultText.textContent += " - PASS";
    } else {
        resultText.textContent += " - FAIL";
    }

    document.getElementById("question-container").style.display = "none";
    resultContainer.style.display = "block";
}

function showAnswers() {
    var answersContainer = document.getElementById("answers-container");
    answersContainer.style.display = 'block';
    answersContainer.innerHTML = '';

    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var questionNumber = i + 1;
        var userAnswer = selectedAnswers[i] || "";
        var correctAnswer = question.answers[question.correctAnswer];

        var answerText = document.createElement("p");
        answerText.textContent = "Pytanie " + questionNumber + ":";
        answersContainer.appendChild(answerText);

        var userAnswerText = document.createElement("p");
        userAnswerText.textContent = "Odpowiedź użytkownika: " + userAnswer;
        answersContainer.appendChild(userAnswerText);

        var correctAnswerText = document.createElement("p");
        correctAnswerText.textContent = "Poprawna odpowiedź: " + correctAnswer;
        answersContainer.appendChild(correctAnswerText);

        var separator = document.createElement("hr");
        answersContainer.appendChild(separator);
    }

    var resultContainer = document.getElementById("result-container");
    resultContainer.appendChild(answersContainer);
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswers = Array(questions.length).fill(null);
    displayQuestion();
    showStart();
    hideContainers();
}

function downloadCertificate() {
    const { jsPDF } = window.jspdf;
    var doc = new jsPDF();

    var margin = 10;
    var pageHeight = doc.internal.pageSize.getHeight();
    var lineHeight = 12;
    var y = 20;

    doc.setFontSize(20);
    doc.text('AFiBV QUIZ CERTIFICATE', margin, y);
    y += lineHeight * 2;

    doc.setFontSize(16);
    doc.text('Score: ' + score + ' / ' + questions.length, margin, y);
    y += lineHeight * 2;

    doc.setFontSize(12);

    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var questionNumber = i + 1;
        var userAnswer = selectedAnswers[i] || "";

        var textLines = doc.splitTextToSize('Questions ' + questionNumber + ':', doc.internal.pageSize.getWidth() - margin * 2);
        doc.text(textLines, margin, y);

        y += lineHeight;
        doc.text('User answers: ' + userAnswer, margin, y);

        y += lineHeight;
        doc.text('Correct answers: ' + question.answers[question.correctAnswer], margin, y);

        y += lineHeight * 2;

        // Check if there is enough space for the next question
        if (y + lineHeight * 3 > pageHeight) {
            doc.addPage();
            y = margin;
        }
    }

    var certificateFile = doc.output();
    var link = document.createElement('a');
    link.href = 'data:application/pdf;base64,' + btoa(certificateFile);
    link.download = 'certificate.pdf';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
}


function getElementById(id) {
    return document.getElementById(id);
}

function getQuerySelector(selector) {
    return document.querySelector(selector);
}

function hideElement(element) {
    element.style.display = 'none';
}

function showElement(element) {
    element.style.display = 'block';
}

function startQuiz() {

    hideElement(startBtn);
    hideElement(instructions);
    hideElement(quizfeaturescontainer);
    showElement(questionContainer);

    displayQuestion();
}

function showStart() {

    showElement(quizfeaturescontainer);
    showElement(startBtn);
    showElement(instructions);
}

function hideContainers() {

    hideElement(questionContainer);
    hideElement(resultContainer);
    hideElement(answerContainer);
}

hideContainers();
document.querySelector('.start_btn button').addEventListener('click', startQuiz);