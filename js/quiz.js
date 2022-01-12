
//get items of DOM
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

//local method
let currentQuestion = {};
let acceptingAnswere = true;
let score = 0;
let questionCurrent = 0;
let availableQuestion = [];

//set questions
let questions = [{
    question: 'بیشترین زبان برنامه نویسی استفاده شده در سال 2019 کدام است؟',
    choice1: 'جاوااسکریپت',
    choice2: 'جاوا',
    choice3: 'پایتون',
    choice4: 'HTML',
    correct: 1,
}, {
    question: "Encapsulation در زبان جاوا به چه معناست؟",
    choice1: "محدود کردن کلاس ",
    choice2: " کپسول سازی مکانیسمی است که یک کد و داده مربوط با آن کد را یکجا گرد آوری نموده و کپسول بدست آمده را درمقابل دخالت یا سوء استفاده های غیر مجاز محافظت می نماید",
    choice3: "به معنای ارث بری از کلاس پدر است",
    choice4: "از این طریق ورودی برای کلاس درسافت میکنیم",
    correct: 2,
}, {
    question: "در جاوا برای جدا كردن قسمتي خاص از رشته از کدام گزینه استفاده میکنیم؟",
    choice1: "substr()",
    choice2: "substring()",
    choice3: "function()",
    choice4: "indexOf()",
    correct: 2,
}, {
    question: "کلاس مورد نطر برای دریافت ورودی از کاربر در جاوا کدام است",
    choice1: "java.util.Scanner",
    choice2: "until",
    choice3: "import",
    choice4: "java.get.Entrance",
    correct: 1,
}]


const SCORE_POINTS = 100;
const MAX_QUESTION = 4;

startgame = () => {
    questionCounter = 0;
    score = 0;

    //copy all questions to availableQuestion by spread Syntax
    availableQuestion = [...questions];
    getnewquestion();
}

getnewquestion = () => {
    //check the end of the questions or questions is empty
    if (availableQuestion.length === 0 || questionCounter > MAX_QUESTION) {

        //set most score and your score in localStorage 
        localStorage.setItem('mostResentScore', score);

        //go to the end page
        return location.assign('end.html');
    }
    
    questionCounter++;
    
    //setting for head and number of question
    progressText.innerText = `سوال ${questionCounter} از ${MAX_QUESTION}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION) * 100}%`;

    //laod random question
    const questionIndex = Math.floor(Math.random() * availableQuestion.length)
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    //load the answers 
    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number]
    });


    //delete the before the question
    availableQuestion.splice(questionIndex, 1);

    acceptingAnswere = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswere) return;

        acceptingAnswere = false;

        //get the selected answer
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // check the correct question and add class to this
        let classToApply = selectedAnswer == currentQuestion.correct ? 'correct' : 'incorrect';

        //plus score to point
        if (classToApply === 'correct') {
            increamentScore(SCORE_POINTS);
        }

        //add class incorrect or correct to parent selected answer(choice-container)
        selectedChoice.parentElement.classList.add(classToApply);

        //time out for delete the class and show the next the question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getnewquestion();
        }, 1000)
    })
});

increamentScore = num => {
    score += num;
    scoreText.innerText = score;
};

startgame();