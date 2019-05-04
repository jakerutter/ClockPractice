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

    //start timer / score tracker
    if (!(document.getElementById("letsPracticeBtn").classList.contains("hidden"))){

        beginTimerAndScoreTracking();
    }
    //hide "Lets Practice button"
    document.getElementById("letsPracticeBtn").classList.add("hidden");
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
    var questionFormat = getRandomInt(0, 3);
    questionFormat = (questionFormat == 0 ? "guessTime" : (questionFormat == 1 ? "pickClock" : "guessText"));
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

//get the minutes. the options are 0 to 60 in 5 min increments
function getMinute(){
    var minuteArray = [00,05,10,15,20,25,30,35,40,45,50,55];
    var minute = minuteArray[getRandomInt(0,4)];
    return minute;
}

function getMinuteInEnglish(minute){
    var minuteText;
    if (minute == 00){
        minuteText = "o'clock";
    } else if (minute == 05){
        minuteText = "o' five";
    } else if (minute == 10){
        minuteText = "ten";
    } else if (minute == 15){
        minuteText = "fifteen";
    } else if (minute == 20){
        minuteText = "twenty";
    } else if (minute == 25){
        minuteText = "twenty-five";
    } else if (minute == 30){
        minuteText = "thirty";
    } else if (minute == 35){
        minuteText = "thirty-five";
    } else if (minute == 40){
        minuteText = "forty";
    } else if (minute == 45){
        minuteText = "forty-five";
    } else if (minute == 50){
        minuteText = "fifty";
    } else if (minute == 55){
        minuteText = "fifty-five";
    } else {
        console.log('Error encountered. Get minute in english conversion failed. Error 7.');
        console.log(minute + "<--- that is minute");
        alert('Error 7');
    }
    
    return minuteText;
}

//get the slang term
function getSlangTerm(clockProblem){
    var minute = clockProblem.minute;
    var slang;

    if (minute == 00){
        slang = "o'clock";
    } else if (minute == 05){ 
        slang = "five after";
    } else if (minute == 10){
        slang = "ten after";
    } else if (minute == 15){
        slang = "a quarter after";
    } else if (minute == 20){
        slang = "twenty after"
    } else if (mniute ==25){
        slang = "twent-five after"
    } else if (minute == 30){
        slang = "half past";
    } else if (minute == 35){
        slang = "twenty-five til";
    } else if (minute == 40){
        slang = "twenty til";
    } else if (minute == 45){
        slang = "a quarter til";
    } else if (minute == 50){
        slang = "ten til";
    } else if (minute == 55){
        slang = "five til";
    }

    clockProblem.slangTerm = slang;
    return clockProblem;
}

//get the question text (what time does this clock show?)
function getClockQuestionText(clockProblem){
    //what time does this clock show ? (answer will be digital clock style)
    if ((clockProblem.format == "guessTime") || (clockProblem.format == "guessText")){
        clockProblem.question = "What time is shown?";
    }
    //which clock shows x' oClock ? (answer will be clicking on one of 4 clocks)
    else if (clockProblem.format == "pickClock"){
        var questionText = "Which clock shows ";
        //handle the 00 minute
        if (clockProblem.minute == 00){

           questionText += clockProblem.hour + " " + clockProblem.slangTerm + "?";

        } else if (clockProblem.minute != 45){

            questionText += clockProblem.slangTerm + " " + clockProblem.hour + "?";

        } else if (clockProblem.minute == 45){

            if (clockProblem.hour != 12){

                questionText += clockProblem.slangTerm + " " + Number(clockProblem.hour+1) + "?";

            } else {

                questionText += clockProblem.slangTerm + " 1?";
            }
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
    //unhide pickClock div
    } else if (clockProblem.format == "pickClock") {
        document.getElementById("pickClock").classList.remove("hidden");
        document.getElementById("pickClockText").innerText = clockProblem.question;
    } else {
    //unhide guessText div
        document.getElementById("guessText").classList.remove("hidden");
        getTextAnswers(clockProblem);
        document.getElementById("guessTextText").innerText = clockProblem.question;
    }
}

//create timer and set initial score values
function beginTimerAndScoreTracking(){
    document.getElementById("timeAndScore").classList.remove("hidden");
    document.getElementById("correctAnswer").innerHTML = 0;
    document.getElementById("incorrectAnswer").innerHTML = 0;
    //var timer = setInterval(1000, );
}

//get the analog clock displays
function drawAnalogClocks(clockProblem){
    //what time does this clock show? (need 1 analog clock for the question clock, 4 digital for answers)
    if (clockProblem.format == "guessTime"){
        getAnalogClock('clockQuestion', clockProblem.hour, clockProblem.minute);
    }
    //which clock shows x o'Clock? (need 4 analog clocks)
    else if (clockProblem.format == "pickClock"){
        getAnalogClock('pickCanvas'+clockProblem.correctPosition, clockProblem.hour, clockProblem.minute);
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[0], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[1], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[2], getRandomIntWithException(1, 12, clockProblem.hour), getMinute());
    } else {
        //need 1 analog clock for question clock. 4 text times for answers
        getAnalogClock("clockQuestion2", clockProblem.hour, clockProblem.minute);
        
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

    //clear hidden field and results label
    clearInnerHtml("hiddenField");
    clearInnerHtml("hdnID");
    clearInnerHtml("resultsLabel");
    
    //clear the canvases
    clearCanvas("clockQuestion");
    clearCanvas("clockQuestion2");
    clearInnerHtml("guessCanvas1");
    clearInnerHtml("guessCanvas2");
    clearInnerHtml("guessCanvas3");
    clearInnerHtml("guessCanvas4");
    clearInnerHtml("text1");
    clearInnerHtml("text2");
    clearInnerHtml("text3");
    clearInnerHtml("text4");
    clearCanvas("pickCanvas1");
    clearCanvas("pickCanvas2");
    clearCanvas("pickCanvas3");
    clearCanvas("pickCanvas4");

    //hide both UI divs
    document.getElementById("guessTime").classList.add("hidden");
    document.getElementById("pickClock").classList.add("hidden");
    document.getElementById("guessText").classList.add("hidden");
}

//check the user's input versus the correct answer
function checkAnswer(input, id){
    document.getElementById("hdnID").innerHTML = id;
    var correctPosition = document.getElementById("hiddenField").innerHTML;
    if (input == correctPosition) {
        console.log('You got it correct.');
        document.getElementById("resultsLabel").innerHTML = "Correct!";
        var correct = document.getElementById("correctAnswer").innerHTML;
        correct = Number(correct)+1;
        document.getElementById("correctAnswer").innerHTML = correct;
        document.activeElement.blur();
        setTimeout(getClockProblem, 1000);
    } else {
        console.log('Incorrect. Log this as a missed question.');
        document.getElementById("resultsLabel").innerHTML = "Nope, that wasn't the right choice.";
        var incorrect = document.getElementById("incorrectAnswer").innerHTML;
        incorrect = Number(incorrect)+1;
        document.getElementById("incorrectAnswer").innerHTML = incorrect;
        document.getElementById(id+correctPosition).classList.add("green-border");
    }
}

//clear the innerhtml from an item
function clearInnerHtml(id){
    document.getElementById(id).innerHTML = "";
}

function getTextAnswers(clockProblem){
    document.getElementById("text"+clockProblem.correctPosition).innerHTML = getCorrectAnswerText(clockProblem);
    document.getElementById("text"+clockProblem.notAnswerArray[0]).innerHTML = getTextForWrongAnswers(clockProblem);
    document.getElementById("text"+clockProblem.notAnswerArray[1]).innerHTML = getTextForWrongAnswers(clockProblem);
    document.getElementById("text"+clockProblem.notAnswerArray[2]).innerHTML = getTextForWrongAnswers(clockProblem);
        
}

function getCorrectAnswerText(clockProblem){
    var answerText = getHourInEnglish(clockProblem.hour) + " " + getMinuteInEnglish(clockProblem.minute);
    return answerText;
}

function getTextForWrongAnswers(clockProblem){
    var answerText;
    var randomInt = getRandomInt(0, 2);
    //going to allow the same hour but enforce different minutes
    if (randomInt == 0) {
        var hour = getRandomInt(1,12)
        hour = getHourInEnglish(hour);
        var minute = getRandomMinuteWithException(clockProblem.minute);
        answerText = hour + " " + minute;
    //going to allow same minute but different hour
    } else {
        var hour = getRandomIntWithException(1, 12, clockProblem.hour);
        hour = getHourInEnglish(hour);
        var minute = getMinute();
        minute = getMinuteInEnglish(minute);
        answerText = hour + " " + minute;
    }
    return answerText;
}

function getHourInEnglish(hour){
    var hourText;
    if (hour == 1){
        hourText = "One";
    } else if (hour == 2){
        hourText = "Two";
    } else if (hour == 3){
        hourText = "Three";
    } else if (hour == 4){
        hourText = "Four";
    } else if (hour == 5){
        hourText = "Five";
    } else if (hour == 6){
        hourText = "Six";
    } else if (hour == 7){
        hourText = "Seven";
    } else if (hour == 8){
        hourText = "Eight";
    } else if (hour == 9){
        hourText = "Nine";
    } else if (hour == 10){
        hourText = "Ten";
    } else if (hour == 11){
        hourText = "Eleven";
    } else if (hour == 12){
        hourText = "Twelve";
    } else{
        console.log("Error encountered. Hour to english conversion failed. Error 6.");
        alert("Error 6.");
    }

    return hourText;
}

//Get minute that doesn't match the correct minute
function getRandomMinuteWithException(minute){
    //create array off all possible minutes
    var minuteArray = [00,05,10,15,20,25,30,35,40,45,50,55];
    //remove the correct minute
    removeItemFromArrayByValue(minuteArray, minute);
    //get english version of the randomly selected minute
    var minuteText = getMinuteInEnglish(minuteArray[getRandomInt(0,minuteArray.length)]);
    return minuteText;
}