//TESTS

//test the clock problem question format (that it has one of the three options)
function testClockProblemQuestionFormat(clockProblem){
    if (clockProblem.format != "guessTime") {

        if (clockProblem.format != "pickClock") {

            if (clockProblem.format != "guessText") {

              console.log('Current value for format is ' + clockProblem.format);
              alert('Failed test. Clock problem format is invalid. Error 4.');  
            }
        }
    } else {
        console.log('Passed clock problem format test.');
    }
}

//test clock problem hour
function testClockProblemHour(clockProblem){
    if ((clockProblem.hour == undefined) || (clockProblem.hour < 1) || (clockProblem.hour > 12)) {
        console.log('Current value for hour is ' + clockProblem.hour);
        alert('Failed test. Clock problem hour is invalid. Error 2.');
    } else {
        console.log('Passed clock problem hour test.');
    }
}

//test clock problem minute
function testClockProblemMinute(clockProblem){
    if ((clockProblem.minute == undefined) || (clockProblem.minute < 0) || (clockProblem.minute > 60)) {
        console.log('Current value for minute is ' + clockProblem.minute);
        alert('Failed test. Clock problem minute is invalid. Error 3.');
    } else {
        console.log('Passed clock problem minute test.');
    }
}

//test correct position value
function  testClockProblemCorrectAnswerPosition(clockProblem){
    if ((clockProblem.correctPosition < 1) || (clockProblem.correctPosition > 4)){
        console.log('Current value for correct answer position is ' + clockProblem.correctPosition);
        alert('Failed test. Correct position is invalid. Error 5.');
    }
}