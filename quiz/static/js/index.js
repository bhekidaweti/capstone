$(document).ready(function() {
    var timeoutDuration = 15000; // 15 seconds timeout
    var timer;    
    var score = sessionStorage.getItem('score') ? parseInt(sessionStorage.getItem('score')) : 0; // Initialize score

    // Function to start the quiz
    function startQuiz() {
        score = 0; // Reset score
        displayScore(score); // Display initial score
        $("#result").empty(); // Clear result message
        $("#startButton").hide(); // Hide start button
        $("#quiz").show(); // Show quiz content
        startTimer(); // Start the timer
    }

    // Function to attach click event handler to flag images
function attachFlagClickHandler() {
    $(".flag").click(function() {
        var countryName = $(this).attr('alt'); // Grabbing the country name from the alt attribute in the img url 
        var correctCountryName = $("#correct_country_button").text().trim(); // Our country name is randomly selected and saved on the button inside the div

        handleUserChoice(countryName, correctCountryName);
    });
}

// Function to load the next session after the user has successfully guessed the answer
// Function to load the next session after the user has successfully guessed the answer
function loadNextSession() {
    // Reset correctAnswerSelected flag for the next session
    correctAnswerSelected = false;

    // Fetch new questions from the backend using Fetch API
    fetch('/get_next_questions/')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Update the HTML content with new questions
            $('#quiz').empty(); // Clear existing questions
            $("#quiz").append(`<div class="center">
                Click the correct flag that matches the country name given below
            </div>
            <div id="country_name">
                <button id="correct_country_button" class="btn btn-success">${data.correct_country_name}</button>
            </div>
            `);
            data.questions.forEach(function(question) {        
                $('#quiz').append(`<div class="flag-container">
                <img src="${question.flag_url}" class="rounded float-start flag" alt="${question.country_name}">
                </div>`);
            });
            // Restart the timer
            clearInterval(timer);
            startTimer();
            // Hide result message
            $("#result").empty();
            // Hide continue and restart buttons
            $("#continueButton").hide();
            $("#restartButton").hide();
            // Reattach click event handler to flag images
            attachFlagClickHandler();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

   var correctAnswerSelected = false; // Variable to track if the correct answer has been selected

function handleUserChoice(countryName, correctCountryName) {
    clearInterval(timer); // Stop the timer
    if (countryName === correctCountryName) {
        if (!correctAnswerSelected) {
            // Code for handling correct answer
            $("#result").text("Correct! You selected the right flag.");
            score++; // Increment score for correct answer
            displayScore(score); // Update and display score
            sessionStorage.setItem('score', score); // Store score in sessionStorage
            $("#continueButton").show(); // Show continue button
            correctAnswerSelected = true; // Mark the correct answer as selected
        } else {
            // Alert if the correct answer has already been selected
            alert("This question has already been answered! Please click continue to load the next questionnaire.");
        }
    } else {
        if (correctAnswerSelected) {
            // Alert if an incorrect image is clicked after selecting the correct answer
            alert("Please click continue to load another quiz session.");
        } else {
            // Code for handling incorrect answer
            $("#result").text("Incorrect. Please try again.Page will reload in few seconds...");
            setTimeout(function() {
                location.reload(); // Reload the page 
            }, 3000);
            
        }
    }
}


    $(".flag").click(function() {
        var countryName = $(this).attr('alt'); // Grabbing the country name from the alt attribute in the img url 
        var correctCountryName = $("#correct_country_button").text().trim();//Our country name is randomly selected and saved on the button inside the div
        
        handleUserChoice(countryName, correctCountryName);
    });
    // Function to display the score
    function displayScore(score) {
        $("#scoreValue").text(score); // Update the score value on the page
    }

    // Event handler for the start button
    $("#startButton").click(function() {
        startQuiz();
    });

    // Event handler for the continue button
    $("#continueButton").click(function() {
        $("#continueButton").hide(); // Hide continue button
        loadNextSession(); // Load next session
        $("#quiz").show();        
    });

    // Event handler for the restart button
    $("#restartButton").click(function() {
        $("#restartButton").hide(); // Hide restart button        
        startQuiz(); // Restart the quiz
    });

    // Function to start the timer
    function startTimer() {
        var startTime = Date.now();
        timer = setInterval(function() {
            var elapsedTime = Date.now() - startTime;
            var remainingTime = Math.max(0, timeoutDuration - elapsedTime);
            var seconds = Math.ceil(remainingTime / 1000);
            $("#countdown").text(seconds);

            if (remainingTime <= 0) {
                clearInterval(timer);
                $("#result").text("Time's up!Game over ");
                $("#restartButton").show(); // Show restart button
            }
        }, 1000);
    }
});
