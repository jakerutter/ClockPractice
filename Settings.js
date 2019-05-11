//Timer for initial settings displays

var counter = setInterval(timer, 1000);
var count = 0;

function timer() {
  //every 5 seconds
  if (count % 5 === 0) {
    console.log(count);
  }
  if (count === 0 ) {
    $("#mainDiv").append("<div id='welcomeMessage'><p>Welcome</p></div>");
  }
  //display welcome message
  if (count === 1 ) {
    $("#welcomeMessage p").addClass("load");
  }
  //welcome message fade out
  if (count === 3 ) {
    $("#welcomeMessage p").removeClass("load").addClass("unload");
  }
  if (count === 5) {
    $("#welcomeMessage p").html("");
    $("#btnPractice").removeClass("hidden").addClass("settingsButton load");
    $("#btnQuiz").removeClass("hidden").addClass("settingsButton load");
  }
  //this has been running a very long time. stop the timer
  if (count > 10000){
    clearInterval(counter);
    return;
  }
  count+=1;
  //Do code for showing the number of seconds here
}

function gameTypeSelected(selection) {
  setStorage('selection', selection);
  clearInterval(counter);
  console.log('selection made: '+ selection +'. counter cleared.');
  //hide the settings leaf
  $('#mainDiv').addClass('unload');
  if (selection === 'practice') {
    //for practice game type allow the user to set an optional goal
    setTimeout(setGoal, 2500);
    console.log('practice selected');
  } else {
    //for quiz the user will set a time and try to get as many right in the time chosen
    setTimeout(setQuizTimer, 2500);
    console.log('quiz selected.');
  }
}

function setQuizTimer(){
  $('#lblGoalTimer').html('Set the quiz timer (minutes)');
  $('#welcomeMessage').remove();
  $('#divButtons').remove();
  $('#mainDiv').removeClass('unload').addClass('load');
  $('#divGoalTimer').removeClass('hidden');

  setTimeout(showTimerInput, 1000);
}

function showTimerInput(){
  $('#lblGoalTimer').removeClass('hidden unload').addClass('load');
  $('#inputGoalTimer').removeClass('hidden unload').addClass('load');
  $('#submitGoalTimer').removeClass('hidden unload').addClass('load');
}

function setGoal(){
  $('#lblGoalTimer').html('Set your goal:\nhow many problems you\'ll answer correctly');
  $('#welcomeMessage').remove();
  $('#divButtons').remove();
  $('#mainDiv').removeClass('unload').addClass('load');
  $('#divGoalTimer').removeClass('hidden');

  setTimeout(showGoalInput, 1000);
}

function showGoalInput(){
  $('#lblGoalTimer').removeClass('hidden unload').addClass('load');
  $('#inputGoalTimer').removeClass('hidden unload').addClass('load');
  $('#submitGoalTimer').removeClass('hidden unload').addClass('load');
}

function checkGoalTimer() {
  var goalOrTimer = $('#inputGoalTimer').val();
  if (goalOrTimer != '' &&  Number(goalOrTimer) > 0){
    submitGoalTimer(goalOrTimer);
  }
}

function submitGoalTimer(goalOrTimer){
  //get the values from the timer and goal inputs
  //the value that is set is being set in localstorage
  var selection = getStorage('selection');
  if (selection === 'quiz'){
    goalOrTimer = Number(goalOrTimer)*60;
    setStorage('timer', goalOrTimer);
  } else {
    goalOrTimer = Number(goalOrTimer);
    setStorage('goal', goalOrTimer);
  }

  setTimeout(showFormatDiv, 1000);
}

function showFormatDiv(){
  $('#pLblGoalTimer').addClass('hidden');
  $('#lblGoalTimer').addClass('hidden');
  $('#inputGoalTimer').addClass('hidden');
  $('#submitGoalTimer').addClass('hidden');
  $('#divProblemFormat').removeClass('hidden');

  setTimeout(showFormatButtons, 1500);
}

function showFormatButtons(){
  $("#btnStandard").removeClass("hidden").addClass("settingsButton load");
  $("#btnWord").removeClass("hidden").addClass("settingsButton load");
  $("#btnTimesTables").removeClass("hidden").addClass("settingsButton load");
  $("#btnEquations").removeClass("hidden").addClass("settingsButton load");
}

function gameFormatSelected(format){
  setStorage('format', format);

  if (format !== 'timesTables') {
    $('#mainDiv').removeClass('load').addClass('unload');
    setTimeout(selectProblems, 2500);
  } else {
    //format is timesTables --> show inputs
    $('#divProblemFormat').addClass('unload');
    setTimeout(showTimesTablesInputs, 2500);
  }
}

function showTimesTablesInputs(){
  $('#divProblemFormat').remove();
  $('#timesTablesNumberSelectDiv').removeClass('hidden').addClass('load');
}

function selectProblems(){
  //show the divs that will hold math type options
  // $('#welcomeMessage').remove();
  $('#divProblemFormat').remove();
  $('#mainDiv').removeClass('large-leaf unload');

  $('#set1').removeClass('hidden').addClass('load');
  $('#set2').removeClass('hidden').addClass('load');
  $('#divClear').removeClass('hidden');
  $('#set3').removeClass('hidden').addClass('load');
  $('#set4').removeClass('hidden').addClass('load');

  setTimeout(showAddSub, 1000);
}

function showAddSub(){
  $("#btnAdd").removeClass("hidden").addClass("settingsButton load");
  $("#btnSub").removeClass("hidden").addClass("settingsButton load");

  setTimeout(showMultDiv, 750);
}

function showMultDiv(){
  $("#btnMult").removeClass("hidden").addClass("settingsButton load");
  $("#btnDiv").removeClass("hidden").addClass("settingsButton load");

  setTimeout(showCombos, 750);
}

function showCombos(){
  $("#btnAddSub").removeClass("hidden").addClass("settingsButton load");
  $("#btnMultDiv").removeClass("hidden").addClass("settingsButton load");

  setTimeout(showMoneyPercent, 750);
}

function showMoneyPercent(){
  $("#btnMoney").removeClass("hidden").addClass("settingsButton load");
  $("#btnPercent").removeClass("hidden").addClass("settingsButton load");
}

function problemTypeSelected(type) {
  setStorage('type', type);
  console.log('problem type chosen. type is ' + type +'.');

  $('#set1').removeClass('load').addClass('unload');
  $('#set2').removeClass('load').addClass('unload');
  $('#set3').removeClass('load').addClass('unload');
  $('#set4').removeClass('load').addClass('unload');
  $('#divClear').addClass('hidden');

  setTimeout(addHiddenToSetDivs, 2500);
}

function addHiddenToSetDivs() {
  //hide the four-leaf divs
  $('#set1').addClass('hidden');
  $('#set2').addClass('hidden');
  $('#set3').addClass('hidden');
  $('#set4').addClass('hidden');

  setTimeout(chooseNumberSizes, 1500);
}

function chooseNumberSizes() {
  //show leaf div for choosing number size
  var problemType = getStorage('type');
  
  //if problem type needs a whole number range, show the whole number slider
  var wholeNumberProblems = ["add", "sub", "addsub", "mult", "div", "multdiv", "equations"];
  var isWholeNumberNeeded = wholeNumberProblems.includes(problemType);
  if (isWholeNumberNeeded) {
      $('#wholeNumberSelectDiv').removeClass('hidden').addClass('load');
    //if problem type is money, show money slider
  } 
    else if (problemType === 'money'){
      $('#moneyNumberSelectDiv').removeClass('hidden').addClass('load');
  }
    else { alert('fell into unwanted state in chooseNumberSizes()');
  }
}

//whole number slider (range selector)
$( function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 0,
    max: 100,
    values: [ 0, 100 ],
    slide: function( event, ui ) {
      $( "#wholeAmount" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    }
  });
  $( "#wholeAmount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
    " - " + $( "#slider-range" ).slider( "values", 1 ) );
});

//money number slider (range selector)
$( function() {
  $( "#money-slider-range" ).slider({
    range: true,
    min: 0.00,
    max: 10.00,
    step: .05,
    values: [ 0, 10 ],
    slide: function( event, ui ) {
      $( "#moneyAmount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#moneyAmount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - " +"$"+ $( "#slider-range" ).slider( "values", 1 ) );
});

function submitWholeRange() {
  setStorage('range', $('#wholeAmount').val());
  $('#wholeNumberSelectDiv').removeClass('load').addClass('unload');

  setTimeout(createSettingsObj, 2500);
}

function submitMoneyRange() {
  setStorage('range', $('#moneyAmount').val());
  $('#moneyNumberSelectDiv').removeClass('load').addClass('unload');

  setTimeout(createSettingsObj, 2500);
}

function submitTimesTableRange() {
  var range = $('#timesAmount').val() + " - " + $('#multipleAmount').val();
  setStorage('range', range);
  $('#timesTablesNumberSelectDiv').removeClass('load').addClass('unload');

  setTimeout(createSettingsObj, 2500);
}

function createSettingsObj(){
  //hide range divs
  $('#wholeNumberSelectDiv').addClass('hidden');
  $('#moneyNumberSelectDiv').addClass('hidden');
  $('#timesTablesNumberSelectDiv').addClass('hidden');

  var settings = {
    selection : getStorage('selection'),
    format : getStorage('format'),
    type : getStorage('type'),
    range : getStorage('range'),
    goal : getStorage('goal')
  }
  setStorage('settings', settings);
  createStatsObj();
  showGameDivs();
}

function checkTTInputs(){
  var multipleAmt = $('#multipleAmount').val();
  var timesAmt = $('#timesAmount').val();
  if (multipleAmt != '' &&  Number(multipleAmt) > 0){
    if (timesAmt != '' && Number(timesAmt) > 0) {
      submitTimesTableRange();
    }
  }
}

function showGameDivs(){
  var settings = getStorage('settings');
  
  //show stats
  $('#divStats').removeClass('hidden unload').addClass('load');
  
  if (settings.format === 'word') {
    //hide unwanted divs & inputs, show the ones we want to see
    $('#questionLeaf').removeClass('large-leaf').addClass('extra-large-leaf');
    $('#questionLeaf').removeClass('hidden').addClass('load');
    var problemObj = createWordProblem();
 
    $('#currentWordQuestion').val(problemObj.wordProblemObj.structure);
    $('#currentWordQuestion').removeClass('hidden');
    $('#currentQuestion').addClass('hidden');
    $('#currentAnswerDisplay').addClass('hidden');
  } else {
    $('#questionLeaf').removeClass('hidden').addClass('load');
    var problemObj = createMathProblem();
  
    //format changes for equations
    if (settings.format === 'equations') {
      $('#hdnVariable').html(problemObj.variable);
      $('#pAnswerDisplay').removeClass('hidden');
      $('#currentAnswerDisplay').addClass('hidden');
      $('#currentQuestion').val(problemObj.problem);
      $('#currentQuestion').css('text-align', 'center');
      $('#currentQuestion').css('width', '150px');
      $('#equationAnswerDisplay').css('text-align', 'center');
      $('#equationAnswerDisplay').css('width', '150px');
    }   
    //format problem for standard, timesTables
    else if (settings.format === 'standard' || settings.format === 'timesTables') {
      $('#currentQuestion').val(problemObj.problem + " =");
    }
 
    if (settings.selection === 'quiz'){
      $('#timeRemaining').removeClass('hidden');
      startQuizTimer();
    }
  }
}

function startQuizTimer() {
  var countDownDate = getStorage('timer');
  // Update the count down every 1 second
  var x = setInterval(function() {

  var distance = countDownDate -= 1;
  // If the count down is over, write some text and end the round
  $('#').html('Time remaining: '+distance);
    if (distance == 0) {
      clearInterval(x);
        //need to display quiz is over, results
      }
  }, 1000);
}

//dynamically display the user's input &
//allow the enter button to sumbit answers
function createKeyUps(){
  //times tables multiple keyup
  $('#multipleAmount').keyup(function(event){
    if(event.keyCode == 13){
      checkTTInputs();
    }
  });
    //times tables number keyup
    $('#timesAmount').keyup(function(event){
      if(event.keyCode == 13){
        checkTTInputs();
      }
    });
    //current answer keyup
  $("#currentAnswer").keyup(function(event){
    $('#currentAnswerDisplay').val($(this).val());
    $('#equationAnswerDisplay').val($('#hdnVariable').html() + ' = ' + $(this).val());
    if(event.keyCode == 13){
      checkAnswerInput();
    }
  });

  //allow Enter to submit goal/timer value
  $("#inputGoalTimer").keyup(function(event){
    if(event.keyCode == 13){
      checkGoalTimer();
    }
  });
}
//verify there is a value in the input before submitting
function checkAnswerInput() {
  var answerProvided = $('#inputGoalTimer').val();
  if (answerProvided != '' &&  Number(answerProvided) > 0){
    $('#equationAnswerDisplay').val('');
    submitAnswer();

  }
}

function submitAnswer() {
  var submittedAnswer = $('#currentAnswer').val();
  console.log('the submitted answer is '+ submittedAnswer);

  var settings = getStorage('settings');
  var problemObj = getStorage('problemObj');
  console.log('the correct answer is '+ problemObj.correctAnswer);
  if (Number(submittedAnswer) === problemObj.correctAnswer){
    //the answer was correct --> update stats
    updateStats('correct');
  } else {
   //incorrect. --> update stats
   updateStats('incorrect');
   showGameDivs();
  }
  //provide another problem
  $('#currentAnswer').val('');
  $('#currentAnswerDisplay').val('');
}

function updateStats(result){
  var stats = getStorage('stats');
  
  if(result === 'correct'){
        stats.currentStreak +=1;
        stats.allTimeScore += 1;
        stats.globalCorrect +=1;

         // if not in bonus +1 questions answered
        if (stats.goalRemaining > 0) {
          stats.questionsAnswered +=1;
        }

        stats.goalRemaining -=1;
        stats.goalRemaining = Math.max(0, stats.goalRemaining);
        
        updateStatDisplay(stats);
        // add 1 bonus question for each streak of 10 correct reached
        if(stats.currentStreak > 0 && stats.currentStreak % 10 === 0) {
          console.log('1 bonus question awarded for streak of 10 correct!');
          let bonusQuestionCount = Number($('#hdnBonusQuestionCount').text());
  
          bonusQuestionCount += 1;
       
          $('#hdnBonusQuestionCount').text(bonusQuestionCount);
        }
        if (stats.goalRemaining === 0) {
          //check for bonus questions before ending game
          let bonusQuestionCount = Number($('#hdnBonusQuestionCount').text());
         
          if (bonusQuestionCount > 0) {
            bonusQuestionCount -= 1;
            $('#hdnBonusQuestionCount').text(bonusQuestionCount);
       
            //provide another question for bonus question
            showGameDivs();
          } else {
            endGame();
          }
          
        } else {
          // correct but not end of game
          //provide another question
          showGameDivs();
        }
  } else {
    //incorect
    stats.currentStreak = 0;
    //if in bonus questions, -1 bonus question
    if (stats.goalRemaining === 0) {
      //check for bonus questions before ending game
      let bonusQuestionCount = Number($('#hdnBonusQuestionCount').text());
      console.log(bonusQuestionCount + ' is bonus question amount');
      if (bonusQuestionCount > 0) {
        bonusQuestionCount -= 1;
        $('#hdnBonusQuestionCount').text(bonusQuestionCount);
        console.log(bonusQuestionCount + ' is new bonus question amount');
        //update stats
        updateStatDisplay(stats);
        //provide another question for bonus question
        showGameDivs();
      } else {
        endGame();
      }
    } else {
      // if goalRemaining > 0 add 1 to questionsAnswered
      stats.questionsAnswered +=1;
    }
  }

  setStorage('stats', stats);
}

function createStatsObj(){
  var stats = getStorage('stats');
  if (stats != undefined){

  var allTimeScore = stats.allTimeScore;
  if ((allTimeScore == "") || (allTimeScore == undefined) || (allTimeScore == NaN)) {
      allTimeScore = 0;
  } else {
      allTimeScore = parseInt(allTimeScore);
    }
  }
  var stats = {
    allTimeScore: allTimeScore,
    currentStreak: 0,
    globalCorrect: 0,
    percentCorrect: 0,
    questionsAnswered: 0,
    currentGrade: '',
    goalRemaining: Number(getStorage('goal'))
  };
  setStorage('stats', stats);
}

function updateStatDisplay(stats){
  var settings = getStorage('settings');
  stats.percentCorrect = ((stats.globalCorrect/stats.questionsAnswered)*100).toFixed(2);
  getCurrentGrade(stats);
  $('#allTimeScore').html('All time score: '+stats.allTimeScore);
  $('#percentCorrect').html('Percent correct: '+stats.percentCorrect + ' is a '+stats.currentGrade);
  $('#currentStreak').html('Current streak: '+stats.currentStreak+" correct");
 
  if(settings.selection === 'practice') {
    $('#goalRemaining').removeClass('hidden');
    $('#goalRemaining').html('Questions remaining for goal: '+stats.goalRemaining);
    }
}

function getCurrentGrade(stats){
  var percentCorrect = stats.percentCorrect;
  if (percentCorrect >= 92) {
    stats.currentGrade = 'A';
  } else if (percentCorrect >= 85){
    stats.currentGrade = 'B';
  } else if (percentCorrect >= 77) {
    stats.currentGrade = 'C';
  } else if (percentCorrect >= 70){
    stats.currentGrade = 'D';
  } else {
    stats.currentGrade = 'F';
  }
  return stats;
}

function endGame(){
  //hide the question leaf
  $('#questionLeaf').removeClass('load').addClass('unload');

}