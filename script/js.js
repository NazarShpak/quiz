/* All answer options */
let option1 = document.querySelector('.option1'),
    option2 = document.querySelector('.option2'),
    option3 = document.querySelector('.option3'),
    option4 = document.querySelector('.option4');

/* All our options */

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); // саме питання

const numberOfQuestion = document.getElementById('number-of-question'); // номер питання

const numberOfAllQuestions = document.getElementById('number-of-all-questions'); // кількість всіх питань

let indexOfQyestion, // індекс даного питання
    indexOfPage = 0; // індекс сторінки

const answersTracker = document.getElementById('answers-tracker'); // огортка для трекера
const btnNext = document.getElementById('btn-next'); // кнопка дальше

let score = 0; // підсумковий результат вікторини

const correctAnswer = document.getElementById('correct-answer'), // к-сть правильних відповідей
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), // кількість всіх питань в модальному вкні
      btnTryAgain = document.getElementById('btn-try-again'); //кнопка "спробуй знову"
      contentResult = document.getElementById('content-result'); // результат

const reactionOfTheResult = [
    'Excellent result',
    'Not a bad result',
    'Terrible result. Please try again',
];

const questions = [
    {
        question : 'Для оголошення змінних в JavaScript викориcтовують ключові слова?',
        options : [
            'let',
            'string',
            'declare',
            'int',
        ],
        rightAnsver: 0
    },
    {
        question : 'Чому дорівнює значення виразу 2 + 3 +"4"+ 6 ?',
        options : [
            '15',
            '546',
            '2346',
            '654',
        ],
        rightAnsver: 1
    },
    {
        question : 'Виклик document.getElementById("active-element") поверне те саме, що і',
        options : [
            'document.querySelector(".active-element");',
            'document.querySelector("active-element");',
            'document.querySelector("#active-element");',
            'document.querySelector(":active-element");',
        ],
        rightAnsver: 2
    },
    {
        question : 'Коментарі в JavaScript позначаются (оберіть усі варіанти)',
        options : [
            '// текст, який не обробляється як код',
            '# текст, який не обробляється як код',
            '@ текст, який не обробляється як код',
            '{{Тут може бути коментар, який містить кілька рядків тексту}}',
        ],
        rightAnsver: 0
    },
    {
        question : 'Важливі методи для роботи зі сторінкою містять об’єкт, який завжди доступний через змінну',
        options : [
            'html',
            'document',
            'page',
            'object',
        ],
        rightAnsver: 1
    },
    
];

numberOfAllQuestions.innerHTML = questions.length; //виводмо к-сть запитань

const load = () => {
    question.innerHTML = questions[indexOfQyestion].question;

    // мапи відповідей
    option1.innerHTML = questions[indexOfQyestion].options[0];
    option2.innerHTML = questions[indexOfQyestion].options[1];
    option3.innerHTML = questions[indexOfQyestion].options[2];
    option4.innerHTML = questions[indexOfQyestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера даної сторінки
    indexOfPage++; // збульшення індекса сторінки
};

let completedAnswers = []; // масив для заданих питань

const randomQuestion = () => {
    let randonNumber = Math.floor(Math.random() * questions.length);
    let hitDublicat = false; // якірь для перевірки одинакових питань

    if(indexOfPage == questions.length) {
        quizeOver();
        reaction();
    } else {
        if(completedAnswers.length > 0 ) {
            completedAnswers.forEach(item => {
                if(item == randonNumber) {
                    hitDublicat = true;
                }
            });
            if(hitDublicat) {
                randomQuestion();
            } else {
                indexOfQyestion = randonNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQyestion = randonNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQyestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQyestion].rightAnsver) {
        el.target.classList.add('correct');
        updateAnswerTracer('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracer('wrong');
    }
    disabledOptions();
};

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQyestion].rightAnsver){
            item.classList.add('correct');
        }
    })
};

const enableOptions = () => {
    optionElements.forEach(item =>{
        item.classList.remove('disabled', 'correct', 'wrong'); 
    })
};

const answerTracker = () => {
    questions.forEach(() =>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
};

const updateAnswerTracer = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Вам потрібно вибрати один із варіантів відповіді');
    } else {
        randomQuestion();
        enableOptions();
    }
};

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
};


const reaction = () => {
    if(score == questions.length) {
        contentResult.innerHTML = reactionOfTheResult[0];
    } else if(score == 0) {
        contentResult.innerHTML = reactionOfTheResult[2];
    } else {
        contentResult.innerHTML = reactionOfTheResult[1];
    };
}

const quizeOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
};

contentResult

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
});

window.addEventListener('load', () =>{
    randomQuestion();
    answerTracker();
});

