//this script will handle creating problems and answers for the clock game

function getClockProblem(){

    //create empty clockProblem object
    var clockProblem = new ClockProblem(0, 0, 0, 0, 0, "", "", "", "", "", "", 0, [], 0);

    //get question format
    // 1) what time does this clock show ? (answer will be digital clock style): "guessTime"
    // 2) which clock shows x' oClock ? (answer will be clicking on one of 4 clocks): "pickClock" || "guessText"
    // 3) how many minutes between these two clocks ? (answer will be to evaluate the time in both and return the difference in time): "timeDiff"
    // 4) trivia - how many minutes are in a half hour? (answer will be appropriate for question): "trivia"
    // 5) time word problems: "wordProblem"
    // 6) set the clock to show x' oClock ? (answer will be user setting analog clock hands to correct position): "setTime"
    getQuestionFormat(clockProblem);
    testClockProblemQuestionFormat(clockProblem);

    //get the hour, minute, and text of the problem
    createQuestionWithFormat(clockProblem);

    //get the position the correct answer will be placed in
    //not needed for questions that will have a numerical answer
    if(clockProblem.format == "guessTime" || clockProblem.format == "guessText" || clockProblem.format == "pickClock"){
           
        getCorrectAnswerPosition(clockProblem);
        testClockProblemCorrectAnswerPosition(clockProblem); 
    }

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
function ClockProblem(hour, minute, secondHour, secondMinute, time, question, format, slang, secondSlang, ampm, secondampm, correctPosition, notAnswerArray, timeDiffAnswer){
    this.hour = hour;
    this.minute = minute;
    this.secondHour = secondHour;
    this.secondMinute = secondMinute;
    this.time = time;
    this.question = question;
    this.format = format;
    this.slang = slang;
    this.secondSlang = secondSlang;
    this.ampm = ampm;
    this.secondampm = secondampm;
    this.correctPosition = correctPosition;
    this.notAnswerArray = notAnswerArray;
    this.timeDiffAnswer = timeDiffAnswer;
}

//gets either "guessTime" or "pickClock" as game types and hydrates clockProblem.format
function getQuestionFormat(clockProblem){
    //var questionFormat = 4; //timeDiff for testing
    var questionFormat = getRandomInt(0, 5);

    clockProblem.format = getQuestionFormatString(questionFormat);
    return clockProblem;
}

function getQuestionFormatString(questionFormat){
   var formatString;
   if (questionFormat === 0){
       formatString = "guessTime";
    } else if(questionFormat === 1){
        formatString = "pickClock";
    } else if(questionFormat === 2){
        formatString = "guessText";
    } else if(questionFormat === 3){
        formatString = "trivia";
    } else if(questionFormat === 4){
        formatString = "timeDiff";
    } else if(questionFormat === 5){
        formatString = "wordProblem";
    } else if(questionFormat === 6){
        formatString = "setTime";
    }
    console.log(formatString);
    return formatString;
 }

function createQuestionWithFormat(clockProblem) {
    //get hour and minute
    clockProblem.hour = getRandomInt(1, 12);
    testClockProblemHour(clockProblem);
    clockProblem.minute = getMinute();
    testClockProblemMinute(clockProblem);

    //get second hour and second minute
    clockProblem.secondHour = getRandomInt(1, 12);
    testClockProblemSecondHour(clockProblem);
    clockProblem.secondMinute = getMinute();
    testClockProblemSecondMinute(clockProblem);

    //get slang term for minute (like quarter til or half past)
    clockProblem.slangTerm = getSlangTerm(clockProblem.minute);
    //get second slang term for second minute
    clockProblem.secondSlangTerm = getSlangTerm(clockProblem.secondMinute);

    //get AMPM value
    clockProblem.ampm = getAMPM();
    //get second AMPM vlaue
    clockProblem.secondampm = getAMPM();

    //get the text for the clock problem (what time does this clock show)
    getClockQuestionText(clockProblem);

    return clockProblem;
}



//get the slang term
function getSlangTerm(minute){
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
    } else if (minute == 25){
        slang = "twenty-five after"
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

    return slang;
}

//get ampm value
function getAMPM(){
    var randomInt = getRandomInt(0, 2);
    return randomInt == 0 ? "A.M." : "P.M."; 
}

//get the question text (what time does this clock show?)
function getClockQuestionText(clockProblem){
    //what time does this clock show ? (answer will be digital clock style)
    if ((clockProblem.format === "guessTime") || (clockProblem.format === "guessText")){
        clockProblem.question = "What time is shown?";
    }
    //which clock shows x' oClock ? (answer will be clicking on one of 4 clocks)
    else if (clockProblem.format === "pickClock"){
        
        var questionText = "Which clock shows ";
        //handle the 00 minute
        if (clockProblem.minute === 00){

           questionText += clockProblem.hour + " " + clockProblem.slangTerm + "?";

        } else if (clockProblem.minute > 30 && clockProblem.minute != 45){

            questionText += clockProblem.slangTerm + " " + getHourPlusOne(clockProblem.hour) + "?";

        } else if (clockProblem.minute != 45){

            questionText += clockProblem.slangTerm + " " + clockProblem.hour + "?";

        } else if (clockProblem.minute == 45){

            questionText += clockProblem.slangTerm + " " + getHourPlusOne(clockProblem.hour) + "?";

        }

        clockProblem.question = questionText;

    // timeDiff questions - show two clocks and ask the difference between the two
    } else if (clockProblem.format === "timeDiff") {
        clockProblem.question = "What is the difference in time in hours and minutes?";
        clockProblem.timeDiffAnswer = getTimeDiffAnswer(clockProblem);

    } else if (clockProblem.format === "trivia") {
        
        var randomInt = getRandomInt(0, 7);
        clockProblem.question = getTriviaQuestion(randomInt);
        clockProblem.answer = getTriviaAnswer(randomInt);

    } else if (clockProblem.format === "wordProblem") {
        console.log('----------> haven\'t coded word problem');
        getClockProblem();

    } else if (clockProblem.format === "setTime") {
        console.log('----------> haven\'t coded set time');
        getClockProblem();

    }else {
        alert('Encountered an error with the question format. Error 1.');
    }
    
    //add test for logging 13 hour issue that has arisen
    testClockProblemHourForThirteen(clockProblem);

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

// set the appropriate UI elements, clear or hide the others
function setUI(clockProblem){

    clearUI();
    
    // only draw analog clocks if needed
    if(clockProblem.format === "guessTime" || clockProblem.format === "guessText" || clockProblem.format === "pickClock"){
    
        // save the correct answer location to hidden field
        document.getElementById("hiddenField").innerHTML = clockProblem.correctPosition;
        // draw the clock displays
        drawAnalogClocks(clockProblem);
    }

    // if format is guessTime need to draw digital clocks as well
    // unhide the guessTime div
    if (clockProblem.format === "guessTime"){
        drawDigitalClocks(clockProblem);
        document.getElementById("guessTime").classList.remove("hidden");
        document.getElementById("guessTimeText").innerText = clockProblem.question;

    // unhide pickClock div
    } else if (clockProblem.format === "pickClock") {
        document.getElementById("pickClock").classList.remove("hidden");
        document.getElementById("pickClockText").innerText = clockProblem.question;

    // unhide guessText div
    } else if (clockProblem.format === "guessText") {
        document.getElementById("guessText").classList.remove("hidden");
        getTextAnswers(clockProblem);
        document.getElementById("guessTextText").innerText = clockProblem.question;

    // unhide triviaSection div
    } else if (clockProblem.format === "trivia"){
        document.getElementById("triviaSection").classList.remove("hidden");
        document.getElementById("triviaQuestion").innerText = clockProblem.question;
        // save the correct answer to hidden field
        document.getElementById("hiddenField").innerHTML = clockProblem.answer;
        document.getElementById("triviaInput").focus();
    }

    // unhide timeDiffSection div
    else if (clockProblem.format === "timeDiff"){
        drawDigitalClocks(clockProblem);
        document.getElementById("timeDiffSection").classList.remove("hidden");
        document.getElementById("timeDiffQuestion").innerText = clockProblem.question;
        // save the correct answer to hidden field
        document.getElementById("hiddenField").innerHTML = clockProblem.timeDiffAnswer;
        document.getElementById("timeDiffHours").focus();
    }
}

//create timer and set initial score values
function beginTimerAndScoreTracking(){
    document.getElementById("timeAndScore").classList.remove("hidden");
    document.getElementById("correctAnswers").innerHTML = 0;
    document.getElementById("incorrectAnswers").innerHTML = 0;
    
    setInterval(countTime, 1000);
}

function countTime(counter){
    var counter = Number(document.getElementById("timeDisplay").innerHTML);
    counter += 1;
    document.getElementById("timeDisplay").innerHTML = counter;
    return counter;
}

// get the analog clock displays
function drawAnalogClocks(clockProblem){
    // what time does this clock show? (need 1 analog clock for the question clock, 4 digital for answers)
    if (clockProblem.format == "guessTime"){
        getAnalogClock('clockQuestion', clockProblem.hour, clockProblem.minute);
    }
    // which clock shows x o'Clock? (need 4 analog clocks)
    else if (clockProblem.format == "pickClock"){
        getAnalogClock('pickCanvas'+clockProblem.correctPosition, clockProblem.hour, clockProblem.minute);
        // Cranking up the difficulty. Purposefully spoofing answers closer to the actual answer
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[0], clockProblem.hour, getRandomMinuteWithException(clockProblem.minute));
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[1], getHourPlusOne(clockProblem.hour), getMinute());
        getAnalogClock('pickCanvas'+clockProblem.notAnswerArray[2], getHourMinusOne(clockProblem.hour), getMinute());
    } else {
        // need 1 analog clock for question clock. 4 text times for answers
        getAnalogClock("clockQuestion2", clockProblem.hour, clockProblem.minute);
    }
}

// get the digital clock displays
function drawDigitalClocks(clockProblem){
    // handle all cases that are not timeDiff
    if(clockProblem.format !== "timeDiff"){

    getDigitalClock('guessCanvas'+clockProblem.correctPosition, clockProblem.hour, clockProblem.minute);
    // Cranking up the difficulty. Purposefully spoofing answers closer to the actual answer
    getDigitalClock('guessCanvas'+clockProblem.notAnswerArray[0], clockProblem.hour, getRandomMinuteWithException(clockProblem.minute));
    getDigitalClock('guessCanvas'+clockProblem.notAnswerArray[1], getHourPlusOne(clockProblem.hour), getMinute());
    getDigitalClock('guessCanvas'+clockProblem.notAnswerArray[2], getHourMinusOne(clockProblem.hour), getMinute());

    }
    else {
        // Draw digital clocks for time diff
        getDigitalClock("timeDiff1", clockProblem.hour, clockProblem.minute);
        getDigitalClock("timeDiff2", clockProblem.secondHour, clockProblem.secondMinute);
        // Write out "A.M." or "P.M."
        document.getElementById("timeDiff1").innerText += " " + clockProblem.ampm;
        document.getElementById("timeDiff2").innerText += " " + clockProblem.secondampm;
    }
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

    //hide all UI divs
    document.getElementById("guessTime").classList.add("hidden");
    document.getElementById("pickClock").classList.add("hidden");
    document.getElementById("guessText").classList.add("hidden");
    document.getElementById("triviaSection").classList.add("hidden");
    document.getElementById("timeDiffSection").classList.add("hidden");

    //clear trivia border classes
    document.getElementById("triviaInput").classList.remove("green-border-thin");
    document.getElementById("triviaInput").classList.remove("red-border-thin");

    //clear time diff border classes
    document.getElementById("timeDiffHours").classList.remove("green-border-thin");
    document.getElementById("timeDiffMinutes").classList.remove("green-border-thin");
}

// check the user's input versus the correct answer
function checkAnswer(input, id){
    document.getElementById("hdnID").innerHTML = id;
    var correctPosition = document.getElementById("hiddenField").innerHTML;
    if (input == correctPosition) {
        console.log('You got it correct.');
        document.getElementById("resultsLabel").innerHTML = "Correct!";
        var correct = document.getElementById("correctAnswers").innerHTML;
        correct = Number(correct)+1;
        document.getElementById("correctAnswers").innerHTML = correct;
        document.activeElement.blur();
        setTimeout(getClockProblem, 1000);
    } else {
        console.log('Incorrect. Log this as a missed question.');
        document.getElementById("resultsLabel").innerHTML = "Nope, that wasn't the right choice.";
        var incorrect = document.getElementById("incorrectAnswers").innerHTML;
        incorrect = Number(incorrect)+1;
        document.getElementById("incorrectAnswers").innerHTML = incorrect;
        document.getElementById(id+correctPosition).classList.add("green-border");
    }
}

// check the user's trivia answer
function submitTriviaAnswer(){
    //remove trivia input border class
    document.getElementById("triviaInput").classList.remove("red-border-thin");
    var correctAnswer = document.getElementById("hiddenField").innerHTML;
    var submittedAnswer = document.getElementById("triviaInput").value;

    //correct
    if (Number(submittedAnswer) === Number(correctAnswer)){
        console.log('You got it correct.');
        document.getElementById("resultsLabel").innerHTML = "Correct!";
        var correct = document.getElementById("correctAnswers").innerHTML;
        correct = Number(correct)+1;
        document.getElementById("correctAnswers").innerHTML = correct;
        document.activeElement.blur();
        document.getElementById("triviaInput").value = "";
        document.getElementById("triviaInput").classList.add("green-border-thin");
        setTimeout(getClockProblem, 1000);

    } else {
        //incorrect
        console.log('Incorrect. Log this as a missed question.');
        document.getElementById("resultsLabel").innerHTML = "Nope, that is not correct.";
        var incorrect = document.getElementById("incorrectAnswers").innerHTML;
        incorrect = Number(incorrect)+1;
        document.getElementById("incorrectAnswers").innerHTML = incorrect;
        document.getElementById("triviaInput").classList.add("red-border-thin");
        document.getElementById("triviaInput").value = "";
        document.getElementById("triviaInput").focus();
    }
}

// convert and check the user's time diff answer
function submitTimeDiffInput(){
    // remove timeDiff input border class
    document.getElementById("timeDiffHours").classList.remove("red-border-thin");
    document.getElementById("timeDiffMinutes").classList.remove("red-border-thin");
    var correctAnswer = document.getElementById("hiddenField").innerHTML;
    var submittedAnswer;
    var submittedHours = document.getElementById("timeDiffHours").value;
    var submittedMinutes = document.getElementById("timeDiffMinutes").value;
    
    // convert hours and minutes to minutes only
    submittedAnswer = Number((submittedHours * 60) + Number(submittedMinutes));
    //console.log('submitted answer is ' + submittedAnswer);
     // hours correct - add green border for hours
    if (Math.floor(Number(submittedAnswer / 60)) === Math.floor(Number(correctAnswer / 60))){
        document.getElementById("timeDiffHours").classList.add("green-border-thin");
     } else if(Number(correctAnswer) < 60 && submittedHours === 0){
        document.getElementById("timeDiffHours").classList.add("green-border-thin");
     } 
     else
     {
        //console.log(submittedAnswer + ' is submitted answer. Correct answer is ' + correctAnswer);
        document.getElementById("timeDiffHours").classList.add("red-border-thin");
     }

    // minutes correct - add green border for minutes
    if ((Number(submittedAnswer) % 60) === (Number(correctAnswer) % 60)){
        document.getElementById("timeDiffMinutes").classList.add("green-border-thin");
    }
    else
    {
        //console.log(submittedAnswer + ' is submitted answer. Correct answer is ' + correctAnswer);
        //console.log('answer % 60 = '+ Number(correctAnswer % 60));
        document.getElementById("timeDiffMinutes").classList.add("red-border-thin");
    }

    // answer is correct
    if (Number(correctAnswer) === Number(submittedHours * 60) + Number(submittedMinutes)){

        console.log('You got it correct.');
        document.getElementById("resultsLabel").innerHTML = "Correct!";
        var correct = document.getElementById("correctAnswers").innerHTML;
        correct = Number(correct)+1;
        document.getElementById("correctAnswers").innerHTML = correct;
        document.activeElement.blur();
        document.getElementById("timeDiffHours").value = "";
        document.getElementById("timeDiffMinutes").value = "";
        setTimeout(getClockProblem, 1000);

    } else {
        //incorrect
        console.log('Incorrect. Log this as a missed question.');
        document.getElementById("resultsLabel").innerHTML = "Nope, that is not correct.";
        var incorrect = document.getElementById("incorrectAnswers").innerHTML;
        incorrect = Number(incorrect)+1;
        document.getElementById("incorrectAnswers").innerHTML = incorrect;
    }
}

// clear the innerhtml from an item
function clearInnerHtml(id){
    document.getElementById(id).innerHTML = "";
}

function getTextAnswers(clockProblem){
    document.getElementById("text"+clockProblem.correctPosition).innerHTML = getCorrectAnswerText(clockProblem);
    document.getElementById("text"+clockProblem.notAnswerArray[0]).innerHTML = getTextForWrongAnswers(clockProblem, 0);
    document.getElementById("text"+clockProblem.notAnswerArray[1]).innerHTML = getTextForWrongAnswers(clockProblem, 1);
    document.getElementById("text"+clockProblem.notAnswerArray[2]).innerHTML = getTextForWrongAnswers(clockProblem, 2);
        
}

function getCorrectAnswerText(clockProblem){
    var answerText = getHourInEnglish(clockProblem.hour) + " " + getMinuteInEnglish(clockProblem.minute);
    return answerText;
}

function getTextForWrongAnswers(clockProblem, value){
    var answerText;
    var hours = [clockProblem.hour, getHourPlusOne(clockProblem.hour), getHourMinusOne(clockProblem.hour)];
    //going to allow the same hour but enforce different minutes

    var hour = getHourInEnglish(hours[value]);
    var minute;
    minute = value == 0 ? minute = getRandomMinuteInEnglishWithException(clockProblem.minute) : getMinuteInEnglish(clockProblem.minute);
    // var minute = getRandomMinuteInEnglishWithException(clockProblem.minute);
    answerText = hour + " " + minute;

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
        console.log("Error encountered. Hour to english conversion failed. Hour came in as "+hour+". Error 6.");
        alert("Error 6.");
    }

    return hourText;
}

// get the minutes. the options are 0 to 60 in 5 min increments
function getMinute(){
    var minuteArray = [00,05,10,15,20,25,30,35,40,45,50,55];
    var minute = minuteArray[getRandomInt(0,12)];
    return minute;
}

// Get minute that doesn't match the minute passed in
function getRandomMinuteWithException(minute){
    //create array off all possible minutes
    var minuteArray = [00,05,10,15,20,25,30,35,40,45,50,55];
    //remove the correct minute
    removeItemFromArrayByValue(minuteArray, minute);
    //get english version of the randomly selected minute
    var min = minuteArray[getRandomInt(0, minuteArray.length)];
    return min;
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

// Get minute (in English) that doesn't match the minute passed in 
function getRandomMinuteInEnglishWithException(minute){
    //create array off all possible minutes
    var minuteArray = [00,05,10,15,20,25,30,35,40,45,50,55];
    //remove the correct minute
    removeItemFromArrayByValue(minuteArray, minute);
    //get english version of the randomly selected minute
    var minuteText = getMinuteInEnglish(minuteArray[getRandomInt(0, minuteArray.length)]);
    return minuteText;
}

function getHourPlusOne(hour){
    // if hour is 11 or fewer, return hour plus one
    // if hour is 12, return 1
    hour = hour <= 11 ? hour +=1 : 1;
    return hour;
}

function getHourMinusOne(hour){
    // if hour is 2 or greater, return hour minus one
    // if hour is 1, return 12
    hour = hour >= 2 ? hour -= 1 : 12;
    return hour;
}

function getTimeDiffAnswer(clockProblem){
    var timeOneInMinutes;
    var timeTwoInMinutes;

    // convert first time to minutes past midnight
    if(clockProblem.ampm === "A.M."){
        timeOneInMinutes = Number((clockProblem.hour * 60) + clockProblem.minute);
    }
    else {
        timeOneInMinutes = Number((clockProblem.hour * 60) + clockProblem.minute + 720);
    }

    // convert second time to minutes past midnight
    if(clockProblem.secondampm === "A.M."){
        timeTwoInMinutes = Number((clockProblem.secondHour * 60) + clockProblem.secondMinute);
    }
    else {
        timeTwoInMinutes = Number((clockProblem.secondHour * 60) + clockProblem.secondMinute + 720);
    }
    // return the difference between the two times
    if (timeOneInMinutes > timeTwoInMinutes){

        console.log(timeOneInMinutes + ' is time one, ' + timeTwoInMinutes + ' is time two. Answer is ' + Number(timeOneInMinutes - timeTwoInMinutes));
        return timeOneInMinutes - timeTwoInMinutes;

    }
    else if(timeTwoInMinutes > timeOneInMinutes){

        console.log(timeTwoInMinutes + ' is time two, ' + timeOneInMinutes + ' is time one. Answer is ' + Number(timeTwoInMinutes - timeOneInMinutes));
        return timeTwoInMinutes - timeOneInMinutes;
        
    }
    else {
        console.log('time is same? remove message after testing pass');
        return 0;
    }
}