//bank of trivia questions
var questionBank = [
    {"Question": "How many minutes are in an hour?", "Answer": 60},
    {"Question": "A quarter hour is how many minutes?", "Answer": 15},
    {"Question": "A half hour is how many minutes?", "Answer": 30},
    {"Question": "How many hours are in a day?", "Answer": 24},
    {"Question": "A quarter til is how many minutes past a quarter after?", "Answer": 30},
    {"Question": "Five til is how many minutes past an hour?", "Answer": 55},
    {"Question": "Three quarters of an hour is how many minutes?", "Answer": 45}
];

function getTriviaQuestion(value){

    var question = questionBank[value];

    return question.Question;
}

function getTriviaAnswer(value){

    var answer = questionBank[value];

    return answer.Answer;
}