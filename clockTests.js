//TESTS

//test the clock problem question format (that it has one of the three options)
function testClockProblemQuestionFormat(clockProblem){
    if (clockProblem.format != "guessTime") {

        if (clockProblem.format != "pickClock") {

            if (clockProblem.format != "guessText") {
            
                if (clockProblem.format != "timeDiff") {

                    if (clockProblem.format != "trivia") {

                        if (clockProblem.format != "wordProblem") {

                            console.log('Current value for format is ' + clockProblem.format);
                            alert('Failed test. Clock problem format is invalid. Error 4.'); 
                        } 
                    }
                }
            }
        }
    } else {
        //console.log('Passed clock problem format test.');
    }
}

//test clock problem hour
function testClockProblemHour(clockProblem){
    if ((clockProblem.hour == undefined) || (clockProblem.hour < 1) || (clockProblem.hour > 12)) {
        console.log('Current value for hour is ' + clockProblem.hour);
        alert('Failed test. Clock problem hour is invalid. Error 2.');
    } else {
        //console.log('Passed clock problem hour test.');
    }
}

//test clock problem second hour
function testClockProblemSecondHour(clockProblem){
    if ((clockProblem.secondHour == undefined) || (clockProblem.secondHour < 1) || (clockProblem.secondHour > 12)) {
        console.log('Current value for second hour is ' + clockProblem.secondHour);
        alert('Failed test. Clock problem second hour is invalid. Error 2.');
    } else {
        //console.log('Passed clock problem second hour test.');
    }
}

//test clock problem minute
function testClockProblemMinute(clockProblem){
    if ((clockProblem.minute == undefined) || (clockProblem.minute < 0) || (clockProblem.minute > 60)) {
        console.log('Current value for minute is ' + clockProblem.minute);
        alert('Failed test. Clock problem minute is invalid. Error 3.');
    } else {
        //console.log('Passed clock problem minute test.');
    }
}

//test clock problem second minute
function testClockProblemSecondMinute(clockProblem){
    if ((clockProblem.secondMinute == undefined) || (clockProblem.secondMinute < 0) || (clockProblem.secondMinute > 60)) {
        console.log('Current value for second minute is ' + clockProblem.secondMinute);
        alert('Failed test. Clock problem second minute is invalid. Error 3.');
    } else {
        //console.log('Passed clock problem second minute test.');
    }
}

//test correct position value
function  testClockProblemCorrectAnswerPosition(clockProblem){
    if ((clockProblem.correctPosition < 1) || (clockProblem.correctPosition > 4)){
        console.log('Current value for correct answer position is ' + clockProblem.correctPosition);
        alert('Failed test. Correct position is invalid. Error 5.');
    }
}

//test clock problem hour for 13
function testClockProblemHourForThirteen(clockProblem){
    if ((clockProblem.hour == undefined) || (clockProblem.hour < 1) || (clockProblem.hour > 12)) {
        alert('Error Encountered. Clock hour problem encountered.');
        console.log('Current value for hour is ' + clockProblem.hour);
        console.log('Minute is ' + clockProblem.minute);
        console.log('Slang is ' + clockProblem.slangTerm);
        
    } else {
        //console.log('Passed clock problem hour test.');
    }
}