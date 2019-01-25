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
var count = 20;
var current = 0;
var correctAnswer = 0;
var incorrectAnswer = 0;
var unanswered = 0;
var userPick;
var counter;
var gameOver = false;

var questions = [{
    question: "What was the first planet to be discovered with a telescope?",
    answers: [
        "Uranus",
        "Neptune",
        "Venus",
        "Jupiter"
    ],
    correct: 0,
},
{
    question: "In the game \"Joust\", what animal was your mount?",
    answers: [
        "A Chicken",
        "A Raptor",
        "An Ostrich",
        "A Horse"
    ],
    correct: 2,
},
{
    question: "What show debuted in 1963 and became the longest running sci-fi series?",
    answers: [
        "Star Trek",
        "Doctor Who",
        "Lost in Space",
        "Battlestar: Galactica"
    ],
    correct: 1,
},
{
    question: "On average, we spend 6 months of our lives waiting for what?",
    answers: [
        "Water to boil",
        "Bathrooms at large events",
        "Websites to load",
        "Traffic ligths to change"
    ],
    correct: 3,
},
{
    question: "Triskaidekaphobia is the fear of what?",
    answers: [
        "Triscuits",
        "The number 13",
        "Clowns",
        "Disease"
    ],
    correct: 1,
},

];

// next question is shown (no user input)
function nextQuestion() {
    cleanUp();
    current++;
    // timer counts down from 30 seconds again
    count = 20;
    // end message is displayed for 3 seconds
    setTimeout(function () {
        counter = setInterval(timer, 1000);
        heyTrivia();
    }, 2000)
    resultsArea.text("");

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
            results.text("Oh No!!! You didn't answer :(");
            clearInterval(counter);
            nextQuestion();
        });

    } else {
        $("#timer").html("Time remaining: " + count);
    }
};

// question is displayed with
function heyTrivia() {
    debugger;
    if (current === questions.length) {
        gameOver = true;
        gameEnd()
    }

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
    // after all questions are complete results screen is displayed
    if (gameOver) {
        // timer is stopped
        clearInterval(counter);
        cleanUp();
        // number of correct answers is displayed
        $("#right").html("You got " + correctAnswer + " right!");
        // number of incorrect answers is displayed
        $("#wrong").html("You got " + incorrectAnswer + " wrong.");
        // number of unanswered is displayed
        $("#unanswered").html("You didn't answer " + unanswered + " questions.");
        restart();
    }
}

function restart() {
    // restart function here
    // start over button appears (reset button)
    restartButton.toggle(true);
    restartButton.on("click", function () {
        window.location.reload();
    })
}


// start button
startButton.on("click", function () {
    startButton.toggle(false);
    questionArea.toggle(true);
    counter = setInterval(timer, 1000);
    heyTrivia()
});


answerArea.on('click', 'button', function () {

    userPick = $(this).data("id");
    questions[current].correct;
    if (userPick != questions[current].correct) {
        // a message is displayed for incorrect answer including correct answer
        results.text("Ahhhhhh! Wrong Answer!");
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
    }


});