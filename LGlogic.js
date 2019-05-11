function setStorage(key,info) {
    localStorage.setItem(key, JSON.stringify(info));
}

function getStorage(key) {
    var item = localStorage.getItem(key);
    return JSON.parse(item);
}

function createProblemObj(num1, num2, sign, problem, correctAnswer, variable, wordProblemObj){
    this.num1 = num1;
    this.num2 = num2;
    this.sign = sign;
    this.problem = problem;
    this.correctAnswer = correctAnswer;
    this.variable = variable;
    this.wordProblemObj = wordProblemObj;
}

function createWordProblemObj(name1, name2, item, verb, structure){
    this.name1 = name1;
    this.name2 = name2;
    this.item = item;
    this.verb = verb;
    this.structure = structure;
}

function createTimeProblemObj(hours, minutes, time, question){
    this.hours = hours;
    this.minutes = minutes;
    this.time = time;
    this.question = question;
}

//Takes problem obj and calls the appropriate Word problem function
function createWordProblem() {
    var settings = getStorage('settings');

    var problemType = settings.type;

    getRangeValues(settings);
    var num1 = getRandomInt(settings.num1, settings.num2);
    var num2 = getRandomInt(settings.num1, settings.num2);
    var problemObj = new createProblemObj(num1,num2,"","",0,"",{});

    if (problemType === "addsub"){
        getAddSubMathProblem(problemObj);
    }
    else if (problemType === "add"){
        getAddMathProblem(problemObj);
    }
    else if (problemType === "sub"){
        getSubMathProblem(problemObj);
    }
    else if (problemType === "multdiv"){
        getMultDivMathProblem(problemObj);
    }
    else if (problemType === "mult"){
        getMultMathProblem(problemObj);
    }
    else if (problemType === "div"){
        getDivMathProblem(problemObj);
    }
     //get the correct answer
     determineAnswer(problemObj, settings);   
     var wordProblemObj = getWordProblemParts(problemType);
     console.log(wordProblemObj);
     problemObj.wordProblemObj = wordProblemObj;
     console.log(problemObj);
     populateStructureWithParts(problemObj);
    
     setStorage('problemObj', problemObj);
     return problemObj;
}

//Takes problem obj and calls the appropriate Math Function
function createMathProblem() {
    
    var settings = getStorage('settings');
    getRangeValues(settings);

    var format = settings.format;
    var problemType = settings.type;
    //do not need this behavior for times tables
    if (settings.format != 'timesTables'){
        var num1 = getRandomInt(settings.num1, settings.num2);
        var num2 = getRandomInt(settings.num1, settings.num2);
        var problemObj = new createProblemObj(num1,num2,"","",0,"",{});
    } else {
        //for times tables we want to maintain the input numbers --not getRandomInt numbers
        var problemObj = new createProblemObj(settings.num1, settings.num2, "","",0,"",{});
    }
    if (format != 'timesTables'){
        if (format === 'equations'){
    // if (format === "standard"){
            var variableArray = ["a","b","c","d","e","f","g","h","i","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z"];
            var randomIndex = Math.floor(Math.random()* variableArray.length);
            var variable = variableArray[randomIndex];
            problemObj.variable = variable;
        }
        if (problemType === "addsub"){
            getAddSubMathProblem(problemObj);
        }
        else if (problemType === "add"){
            getAddMathProblem(problemObj);
        }
        else if (problemType === "sub"){
            getSubMathProblem(problemObj);
        }
        else if (problemType === "multdiv"){
            getMultDivMathProblem(problemObj);
        }
        else if (problemType === "mult"){
            getMultMathProblem(problemObj);
        }
        else if (problemType === "div"){
            getDivMathProblem(problemObj);
        }
    
     } else if (format === 'timesTables') {
        //this is for times tables
        getTimesTableProblem(problemObj);
    }
    //get the correct answer
    determineAnswer(problemObj, settings);   
    setStorage('problemObj', problemObj); 
    return problemObj;
}

//parse the range values from the settings obj
function getRangeValues(settings){
    var range = settings.range;
    
    var rangeValues = range.split(' - ');

    settings.num1 = rangeValues[0];
    settings.num2 = rangeValues[1];

    setStorage('settings', settings);
    return settings;
}

//Populate the correct answer value
function determineAnswer(problemObj, settings){
    
    var correctAnswer = "";
    if (settings.format === "standard" || settings.format === 'word') {
        if (problemObj.sign === " + "){
            correctAnswer = Number(problemObj.num1+problemObj.num2);
        }
        else if (problemObj.sign === " - "){
            if (problemObj.num1 > problemObj.num2){ 
                correctAnswer = Number(problemObj.num1-problemObj.num2);
            } else {
                correctAnswer = Number(problemObj.num2-problemObj.num1);
            }
        }
        if (problemObj.sign === " * "){
            correctAnswer = Number(problemObj.num1 * problemObj.num2);
        }
        if (problemObj.sign === " / "){
            correctAnswer = Number(problemObj.num1 / problemObj.num2);
        }
        problemObj.correctAnswer = correctAnswer;
        return problemObj;
    }
    else if (settings.format === "equations"){
        if (problemObj.sign === " + ") {
            var standardAnswer = Number(problemObj.num1 + problemObj.num2);
            var problem = (problemObj.num1.toString()+" "+ problemObj.sign +" "+ problemObj.variable +" = "+ standardAnswer.toString());
            problemObj.problem = problem;
            correctAnswer = Number(standardAnswer - problemObj.num1);
        }
        if (problemObj.sign == " - "){
            var standardAnswer = Number(problemObj.num1 - problemObj.num2);
            var problem = (problemObj.num1.toString()+" "+ problemObj.sign +" "+ problemObj.variable +" = "+ standardAnswer.toString());
            problemObj.problem = problem;
            correctAnswer = Number(problemObj.num1 - standardAnswer);
        }
        if (problemObj.sign == " * "){
            var standardAnswer = Number(problemObj.num1 * problemObj.num2);
            var problem = (problemObj.num1.toString()+" "+ problemObj.sign +" "+ problemObj.variable +" = "+ standardAnswer.toString());
            problemObj.problem = problem;
            correctAnswer = Number(standardAnswer / problemObj.num1);
        }
        if (problemObj.sign == " / "){
            var standardAnswer = Number(problemObj.num1 / problemObj.num2);
            var problem = (problemObj.num1.toString()+" "+ problemObj.sign +" "+ problemObj.variable +" = "+ standardAnswer.toString());
            problemObj.problem = problem;
            correctAnswer = Number(problemObj.num2);
        }
        problemObj.correctAnswer = correctAnswer;
        return problemObj;
    } else {
        correctAnswer = Number(problemObj.num1*problemObj.num2);
        problemObj.correctAnswer = correctAnswer;
        return problemObj;
    }
}

function getAddSubMathProblem(problemObj) {
    var signForOperation = Math.random();
    //subtraction problems
    if (signForOperation < .5){
        getSubMathProblem(problemObj);
    }
    //addition problems
    else {
        getAddMathProblem(problemObj);
    }

    return problemObj;
}

// function getAddSubWordProblem(problemObj) {
//     var signForOperation = Math.random();
//     //subtraction problems
//     if (signForOperation < .5){
//         getSubWordProblem(problemObj);
//     }
//     //addition problems
//     else {
//         getAddWordProblem(problemObj);
//     }

//     return problemObj;
// }

function getAddMathProblem(problemObj) {
    problemObj.sign = " + ";
    var problem = (problemObj.num1.toString()+ problemObj.sign + problemObj.num2.toString());
    problemObj.problem = problem;

    return problemObj;
}

// function getAddWordProblem(problemObj) {
//     getWordProblemParts('add');
//     problemObj.sign = " + ";
//     //form word problem here
//     problemObj.problem = problem;

//     return problemObj;
// }

function getSubMathProblem(problemObj, settings) {
    problemObj.sign = " - ";
    var num1 = Math.max(problemObj.num1, problemObj.num2);
    var num2 = Math.min(problemObj.num1, problemObj.num2);
    if (num1 === num2){
        var newNumber = getRandomInt(settings.num1, settings.num2);
        if (num1 > newNumber) {
            num2 = newNumber;
        } else {
            num2 = num1;
            num1 = newNumber;
        }
    }
    var problem = (num1.toString() + problemObj.sign + num2.toString());
    problemObj.problem = problem;
    problemObj.num1 = num1;
    problemObj.num2 = num2;
    return problemObj;
}

function getMultDivMathProblem(problemObj) {
    var signForOperation = Math.random();
    //div problems
    if (signForOperation < .5){
        getDivMathProblem(problemObj);
    }
    //Mult problems
    else {
        getMultMathProblem(problemObj);
    }
    return problemObj;
}

function getMultMathProblem(problemObj) {
    problemObj.sign = " * ";
    var problem = (problemObj.num1.toString() + problemObj.sign + problemObj.num2.toString());
    problemObj.problem = problem;

    return problemObj;
}

function getDivMathProblem(problemObj) {
    var sign = " / ";
    var num1 = Math.max(problemObj.num1, problemObj.num2);
    var num2 = getFactors(num1);
    //check to see if the numbers are the same and also not prime.
    //or if num2 = 1... if so, look for another factor
    if(((num1 === num2 || num2 === 1) && (isPrimeNumber(num1) === false))) {
        num2 = getFactors(num1);
        
        if(((num1 === num2 || num2 === 1) && (isPrimeNumber(num1) === false))) {
            num2 = getFactors(num1);
        }
    }
 
    problemObj.sign = sign;
    problemObj.num1 = num1;
    problemObj.num2 = num2;
    var problem = (problemObj.num1.toString() + problemObj.sign + problemObj.num2.toString());
    problemObj.problem = problem;

    return problemObj;
}

function getTimesTableProblem(problemObj) {
    var multiple = Number(problemObj.num1);
    var upperLimit = Number(problemObj.num2);
    var multipleArray = [];

    for (var i = 0; i <= upperLimit; i += 1){
        multipleArray.push(i);
        }
    var num2 = multipleArray[Math.floor(Math.random() * multipleArray.length)];
    problemObj.sign = " * ";
    problemObj.num1 = multiple;
    problemObj.num2 = num2;

    var problem = (multiple.toString() + problemObj.sign + num2.toString());
    problemObj.problem = problem;

    return problemObj;
}

function getWordProblemParts(designator){
    var wordProblemObj = new createWordProblemObj("", "", "", "", "");
    //get structure of word problem
    getWordProblemStructure(wordProblemObj);
    //word problem data
    var wordProblemNames = [ 'Alex', 'Andrew', 'Amelia', 'Abby', 'Brittney', 'Bill', 'Chris', 'Carlie',
        'Charles', 'Clark', 'Cameron', 'Cindy', 'Danny', 'Danielle', 'Dustin', 'Erica', 'Fred', 'Fanny', 'Frank',
        'Greg', 'Irma', 'Jake', 'Justine', 'Jeremy', 'Josie', 'Jenny', 'Megan', 'Marley', 'Mike', 'Michelle',
        'Oscar', 'Piper', 'Tim', 'Tiffany', 'Tanya', 'Torie', 'Sam', 'Sonny', 'Steph', 'Vinny', 'Wendy', 'Wayne'
    ];

    var wordProblemItems = [ 'ducks', 'candies', 'toys', 'cars', 'bottles', 'paintings', 'butterflies', 'books',
        'computers', 'hats', 'fish', 'cats', 'video games', 'feathers', 'hamburgers', 'birds', 'friends', 'board games',
        'shoes', 'plates', 'marbles', 'blankets', 'trucks', 'markers', 'crayons', 'speakers', 'robots', 'planets',
        'shopkins', 'sisters', 'houses', 'shoes', 'pencils'
    ];
    //is it add or sub
    var signForOperation;
    if (designator === 'addsub'){
        signForOperation = Math.random();
        if (signForOperation < .5){
            designator = 'sub';
        } else {
            designator = 'add';
        }
    }
    //subtraction problem
    if (designator === 'sub'){
        var wordProblemVerbs = [ 'took', 'subtracted', 'removed', 'donated', 'was taxed'];
    }
    //addition problem
    else {
        var wordProblemVerbs = [ 'was given', 'added', 'increased', 'recieved', 'was gifted', 'took' ];   
    }

    var name1 = wordProblemNames[Math.floor(Math.random() * wordProblemNames.length)];
    var name2 = wordProblemNames[Math.floor(Math.random() * wordProblemNames.length)];
    var item = wordProblemItems[Math.floor(Math.random() * wordProblemItems.length)];
    var verb = wordProblemVerbs[Math.floor(Math.random() * wordProblemVerbs.length)];
    wordProblemObj.name1 = name1;
    wordProblemObj.name2 = name2;
    wordProblemObj.item = item;
    wordProblemObj.verb = verb;

    return wordProblemObj;
}

function getWordProblemStructure(wordProblemObj){
    var  signForOperation = Math.random();
    if (signForOperation < .33){
        var structure = 'name1 had num1 item and verb num2 item. How many item does name1 have now?';
    } else if (signForOperation >= .33 && signForOperation <= .66){
        var structure = 'If name1 has num1 item and name2 verb num2 item, how many item does name1 have now?';
    } else {
        var structure = 'There were num1 item. name1 verb num2 item. How many item are there now?';
    }
    wordProblemObj.structure = structure;
    return wordProblemObj;
}

function populateStructureWithParts(problemObj){
    var structure = problemObj.wordProblemObj.structure;
    structure = structure.replace(/name1/g, problemObj.wordProblemObj.name1);
    structure = structure.replace(/name2/g, problemObj.wordProblemObj.name2);
    structure = structure.replace(/num1/g, problemObj.num1);
    structure = structure.replace(/num2/g, problemObj.num2);
    structure = structure.replace(/item/g, problemObj.wordProblemObj.item);
    structure = structure.replace(/verb/g, problemObj.wordProblemObj.verb);

    problemObj.wordProblemObj.structure = structure;
    return problemObj;
}

//UTILITY FUNCTIONS. IsPrimeNumber. getFactors. getRandomInt.
function isPrimeNumber(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
            }
        }
        return true;
}

function getFactors(num){
    var num = Number(num);
    var factorArray = [];
    for (var i = 1; i <= num; i++){
        if (num % i === 0){
            factorArray.push(i);
            }
        }
        //I DONT KNOW WHAT THIS PART DOES. DOCUMENT BETTER!

        // if (isPrimeNumber(num) === false){
        //     factorArray.splice(factorArray.length-1,1);
        //     factorArray.splice(0,1);
        // }

        var randomIndex = Math.floor(Math.random()* factorArray.length);
        var factor = factorArray[randomIndex];
        return factor;
 }

//The max and the min are inclusive in this function
function getRandomInt(min, max) {
    min = Number(min);
    max = Number(max);
    var randomInt;
    randomInt = Math.floor(Math.random() * max) + min  
    return randomInt;
}

function loadLocalStorageValues() {
    createKeyUps();
    $('#allTimeScore').html('All time score: '+ 0);
    var stats = getStorage("stats");
    if (stats != "") {
        if (stats != undefined) {
            if (stats != NaN) {
                if(stats.allTimeScore != ''){
                   $('#allTimeScore').html('All time score: '+ stats.allTimeScore); 
                }
            }
        }
    }
    setStorage('goal', 0);
    setStorage('timer', 0);
}