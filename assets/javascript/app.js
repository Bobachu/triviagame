// global variables and objects
var startButton = $("#start-button");
var questionArea = $("#question-area");
questionArea.toggle(false);
var answerArea = $("#answer-area");
var question = $(".question");
var results = $("#result");
var resultsArea = $("#results-area");
var restartButton = $("#restart-button");
restartButton.toggle(false);
// resultsArea.toggle(false);
var count = 2;
var current = 0;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswered = 0;
var userPick;
var counter;
var gameOver = false;

var questions = [{
    question: "What is the average airspeed of in unladen swallow?",
    answers: [
        "Don't know",
        "100mph",
        "so slow",
        "faster than you"
    ],
    correct: 0,
},
{
    question: "What is the airspeed of in unladen swallow?",
    answers: [
        "Don't know",
        "100mph",
        "so slow",
        "faster than you"
    ],
    correct: 1,
},
{
    question: "What is the average of in unladen swallow?",
    answers: [
        "Don't know",
        "100mph",
        "so slow",
        "faster than you"
    ],
    correct: 2,
},
{
    question: "What is the average airspeed of in swallow?",
    answers: [
        "Don't know",
        "100mph",
        "so slow",
        "faster than you"
    ],
    correct: 3,
},
{
    question: "What is the average airspeed of in unladen?",
    answers: [
        "Don't know",
        "100mph",
        "so slow",
        "faster than you"
    ],
    correct: 1,
},

];

function nextQuestion() {
    if (gameOver === true) {
        gameEnd();
    } else {
        cleanUp();
        current++;
        count = 2;
        // end message is displayed for 3 seconds
        setTimeout(function () {
            counter = setInterval(timer, 1000);
            heyTrivia();
        }, 2000)
        resultsArea.text("");
    }
};

function cleanUp() {
    question.text("");
    answerArea.empty();
    $("#timer").html("Time remaining: ");
};

function timer() {
    count--;
    if (count <= 0) {
        setTimeout(function () {
            unanswered++;
            cleanUp();
            // a message is displayed if time runs out before the question is answered
            results.text("Oh No!!! You didn't answer:(");
            clearInterval(counter);
            nextQuestion();
        });

    } else {
        $("#timer").html("Time remaining: " + count);
    }
};

// question is displayed with
function heyTrivia() {
    results.text("")

    question.html(questions[current].question);

    var choicesArr = questions[current].answers;
    var buttonsArr = [];

    // 4 possible answers shown in buttons
    for (let i = 0; i < choicesArr.length; i++) {
        var button = $("<button>");
        button.text(choicesArr[i]);
        button.attr("data-id", i);
        answerArea.append(button);
    }

};
function gameEnd() {
    clearInterval(counter);
    $("#right").html("You got " + correctAnswer + " right!");
    $("#wrong").html("You got " + incorrectAnswer + " wrong. :(");
    $("#unanswered").html("You didn't answer " + unanswered + " questions. :(");
}


function restart() {
    // restart function here
}


// start button
startButton.on("click", function () {
    startButton.toggle(false);
    questionArea.toggle(true);
    counter = setInterval(timer, 1000);
    heyTrivia()
});


answerArea.on('click', 'button', function () {
    if (current === (questions.length - 1)) {
        gameOver = true;
        return;
    }

    userPick = $(this).data("id");
    questions[current].correct;
    if (userPick != questions[current].correct) {
        // a message is displayed for incorrect answer including correct answer
        results.text("Wrong Answer!");
        incorrectAnswer++;
        // timer ends when a question is answered right or wrong
        clearInterval(counter);
        nextQuestion();

    } else if (userPick === questions[current].correct) {
        // a message is displayed for correct answer
        results.text("Correct!!!");
        correctAnswer++;
        clearInterval(counter);
        nextQuestion();
        // results screen
    }
    console.log(gameOver);

});



// next question is shown (no user input)
// timer counts down from 30 seconds again
// after all questions are complete results screen is displayed
// timer is stopped
// number of correct answers is displayed
// number of incorrect answers is displayed
// number of unanswered is displayed
// start over button appears (reset button)
// reset function