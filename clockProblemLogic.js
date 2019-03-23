//this script will handle creating problems and answers for the clock game

function getClockProblem(){

    //create empty clockProblem object
    var clockProblem = new ClockProblem(0, 0, 0, "", "", "", 0, []);

    //get question format
    // 1) what time does this clock show ? (answer will be digital clock style)
    // 2) which clock shows x' oClock ? (answer will be clicking on one of 4 clocks)
    getQuestionFormat(clockProblem);
    testClockProblemQuestionFormat(clockProblem);

    //get the hour, minute, and text of the problem
    createQuestionWithFormat(clockProblem);

    //get the position the correct answer will be placed in
    getCorrectAnswerPosition(clockProblem);
    testClockProblemCorrectAnswerPosition(clockProblem);

    //set UI
    setUI(clockProblem);
    
}

//create empty clock problem
function ClockProblem(hours, minutes, time, question, format, slang, correctPosition, notAnswerArray){
    this.hours = hours;
    this.minutes = minutes;
    this.time = time;
    this.question = question;
    this.format = format;
    this.slang = slang;
    this.correctPosition = correctPosition;
    this.notAnswerArray = notAnswerArray;
}

//gets either "guessTime" or "pickClock" as game types and hydrates clockProblem.format
function getQuestionFormat(clockProblem){
    var questionFormat = getRandomInt(0, 2);
    questionFormat = (questionFormat == 0 ? "guessTime" : "pickClock");
    clockProblem.format = questionFormat;
    return clockProblem;
}

function createQuestionWithFormat(clockProblem) {
    //get hour and minute
    clockProblem.hour = getRandomInt(1, 12);
    testClockProblemHour(clockProblem);
    clockProblem.minute = getMinute();
    testClockProblemMinute(clockProblem);

    //get slang term for minute (like quarter til or half past)
    getSlangTerm(clockProblem);
    //get the text for the clock problem (what time does this clock show)
    getClockQuestionText(clockProblem);

    return clockProblem;
}

//get the minutes. for now the options are 0, 15, 30, 45
//will add %5 options later
function getMinute(){
    var minuteArray = [0, 15, 30, 45];
    var minute = minuteArray[getRandomInt(0,3)];
    return minute;
}

//get the slang term
function getSlangTerm(clockProblem){
    var minute = clockProblem.minute;
    var slang;

    if (minute == 0){
        slang = "o'clock";
    }
    if (minute == 15){
        slang = "a quarter after";
    }
    if (minute == 30){
        slang = "half past";
    }
    if (minute == 45){
        slang = "a quarter til";
    }

    clockProblem.slangTerm = slang;
    return clockProblem;
}

//get the question text (what time does this clock show?)
function getClockQuestionText(clockProblem){
    //what time does this clock show ? (answer will be digital clock style)
    if (clockProblem.format == "guessTime"){
        clockProblem.question = "What time is shown?";
    }
    //which clock shows x' oClock ? (answer will be clicking on one of 4 clocks)
    else if (clockProblem.format == "pickClock"){
        var questionText;
        if (clockProblem.minute == 0){
           questionText = "Which clock shows " + clockProblem.hour + " " + clockProblem.slangTerm + "?";
        }
        else if (clockProblem.minute == 15){
            questionText = "Which clock shows " + clockProblem.slangTerm + " " + clockProblem.hour + "?";
        }
        else if (clockProblem.minute == 30){
            questionText = "Which clock shows " + clockProblem.slangTerm + " " + clockProblem.hour + "?";
        }
        else if (clockProblem.minute == 45){
            questionText = "Which clock shows " + clockProblem.slangTerm + " " + Number(clockProblem.hour+1) + "?";
        }

        clockProblem.question = questionText;

    }else {
        alert('Encountered an error with the question format. Error 1.');
    }

    return clockProblem;
}

//get the integer that represents the position the correct answer will be placed in (random 1-4)
function getCorrectAnswerPosition(clockProblem){
    clockProblem.correctPosition = getRandomInt(1, 4);
    //will need these for placing the clocks that are not the answer
    var notAnswerArray = [1, 2, 3, 4];
    removeItemFromArrayByValue(notAnswerArray, clockProblem.correctPosition);
    clockProblem.notAnswerArray = notAnswerArray;
    return clockProblem;
}

//set the appropriate UI elements, clear or hide the others
function setUI(clockProblem){
    console.log(clockProblem.question);

    clearUI();
    
    //save the correct answer location to hidden field
    document.getElementById("hiddenField").innerHTML = clockProblem.correctPosition;
    //draw the clock displays
    drawAnalogClocks(clockProblem);

    //if format is guessTime need to draw digital clocks as well
    //unhide the guessTime div
    if (clockProblem.format == "guessTime"){
        drawDigitalClocks(clockProblem);
        document.getElementById("guessTime").classList.remove("hidden");
        document.getElementById("guessTimeText").innerText = clockProblem.question;
    } else {
        document.getElementById("pickClock").classList.remove("hidden");
        document.getElementById("pickClockText").innerText = clockProblem.question;
    }

}

//get the analog clock displays
function drawAnalogClocks(clockProblem){
    //what time does this clock show? (need 1 analog clock for the question clock, 4 digital for answers)
    if (clockProblem.format == "guessTime"){
        getAnalogClock('clockQuestion', clockProblem.hour, clockProblem.minute);
    }
    //which clock shows x o'Clocl? (need 4 analog clocks)
    else if (clockProblem.format == "pickClock"){
        getAnalogClock('pickCanvas'+clockProblem.correctPosition, clockProblem.hour, clockProblem.minute);
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[0], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[1], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[2], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
    }
    
}

//get the digital clock displays
function drawDigitalClocks(clockProblem){
    getDigitalClock('guessCanvas'+clockProblem.correctPosition, clockProblem.hour, clockProblem.minute);
    getDigitalClock('guessCanvas'+clockProblem.notAnswerArray[0], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
    getDigitalClock('guessCanvas'+clockProblem.notAnswerArray[1], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
    getDigitalClock('guessCanvas'+clockProblem.notAnswerArray[2], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
}

function clearUI(){
    //get id and correctPosition to clear the green border if present
    if (document.getElementById("hdnID")){
        var id = document.getElementById("hdnID").innerHTML;
        if (document.getElementById("hiddenField")){
            var correctPosition = document.getElementById("hiddenField").innerHTML;
            if(document.getElementById(id+correctPosition)){
                document.getElementById(id+correctPosition).classList.remove("green-border");
            }
        }
    }

    // var id = document.getElementById("hdnID").innerHTML;
    // var correctPosition = document.getElementById("hiddenField").innerHTML;
    //clear green border
    //document.getElementById(id+correctPosition).style.border = "none";
    //clear hidden field and results label
    clearInnerHtml("hiddenField");
    clearInnerHtml("hdnID");
    clearInnerHtml("resultsLabel");
    
    //clear the canvases
    clearCanvas("clockQuestion");
    clearInnerHtml("guessCanvas1");
    clearInnerHtml("guessCanvas2");
    clearInnerHtml("guessCanvas3");
    clearInnerHtml("guessCanvas4");
    clearCanvas("pickCanvas1");
    clearCanvas("pickCanvas2");
    clearCanvas("pickCanvas3");
    clearCanvas("pickCanvas4");

    //hide both UI divs
    document.getElementById("guessTime").classList.add("hidden");
    document.getElementById("pickClock").classList.add("hidden");
}

//check the user's input versus the correct answer
function checkAnswer(input, id){
    document.getElementById("hdnID").innerHTML = id;
    var correctPosition = document.getElementById("hiddenField").innerHTML;
    if (input == correctPosition) {
        console.log('You got it correct.');
        document.getElementById("resultsLabel").innerHTML = "Correct!";
    } else {
        console.log('Incorrect. Log this as a missed question.');
        document.getElementById("resultsLabel").innerHTML = "Nope, that wasn't the right choice.";
        document.getElementById(id+correctPosition).classList.add("green-border");
    }
}

//clear the innerhtml from an item
function clearInnerHtml(id){
    document.getElementById(id).innerHTML = "";
}