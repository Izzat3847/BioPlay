// База данных вопросов — строго разделена по трем темам с вашего скриншота
const quizData = {
    // 1. Вопросы для карточки «Клетка и генетика»
    genetics: [
        {
            q: "Какое свойство генетического кода выражается в том, что одна аминокислота может кодироваться более чем одним триплетом?",
            options: ["Универсальность", "Избыточность (вырожденность)", "Триплетность", "Специфичность"],
            correct: 1
        },
        {
            q: "Сколько фенотипических групп образуется при дигибридном скрещивании дигетерозигот при полном доминировании и независимом наследовании?",
            options: ["2 группы", "3 группы", "4 группы", "9 групп"],
            correct: 2
        },
        {
            q: "Как называется процесс синтеза иРНК на матрице ДНК?",
            options: ["Трансляция", "Репликация", "Транскрипция", "Процессинг"],
            correct: 2
        },
        {
            q: "Какое скрещивание используют для определения генотипа особи с доминантным признаком?",
            options: ["Моногибридное", "Анализирующее", "Дигибридное", "Взаимное"],
            correct: 1
        },
        {
            q: "В какую фазу деления клетки происходит кроссинговер?",
            options: ["Профаза митоза", "Профаза I мейоза", "Метафаза I мейоза", "Анафаза II мейоза"],
            correct: 1
        }
    ],

    // 2. Вопросы для карточки «Эволюционное учение»
    evolution: [
        {
            q: "Что является элементарной единицей эволюции согласно синтетической теории эволюции (СТЭ)?",
            options: ["Отдельный организм", "Вид", "Популяция", "Биоценоз"],
            correct: 2
        },
        {
            q: "К какому типу доказательств эволюции относится наличие аппендикса и зубов мудрости у человека?",
            options: ["Эмбриологические", "Палеонтологические", "Рудименты", "Атавизмы"],
            correct: 2
        },
        {
            q: "Как называется движущая сила эволюции, приводящая к направленному изменению генофонда популяции?",
            options: ["Естественный отбор", "Дрейф генов", "Изоляция", "Мутационный процесс"],
            correct: 0
        },
        {
            q: "Какой критерий вида основан на сходстве процессов жизнедеятельности у особей?",
            options: ["Морфологический", "Генетический", "Физиологический", "Экологический"],
            correct: 2
        },
        {
            q: "Примером какого эволюционного изменения является формирование обтекаемой формы тела у акулы, дельфина и ихтиозавра?",
            options: ["Дивергенция", "Конвергенция", "Ароморфоз", "Дегенерация"],
            correct: 1
        }
    ],

    // 3. Вопросы для карточки «Экология и биосфера»
    ecology: [
        {
            q: "Как называются организмы, использующие энергию солнца или химических связей для синтеза органических веществ из неорганических?",
            options: ["Консументы I порядка", "Консументы II порядка", "Редуценты", "Продуценты"],
            correct: 3
        },
        {
            q: "Какое количество энергии (в процентах) переходит с одного трофического уровня на следующий согласно правилу Линдемана?",
            options: ["Около 1%", "Около 10%", "Ровно 50%", "Около 90%"],
            correct: 1
        },
        {
            q: "Кто создал научное учение о биосфере и ноосфере?",
            options: ["Ч. Дарвин", "В.И. Вернадский", "Э. Геккель", "К. Линней"],
            correct: 1
        },
        {
            q: "К какому типу экологических факторов относится распашка земель и вырубка лесов человеком?",
            options: ["Абиотические", "Биотические", "Антропогенные", "Оптимальные"],
            correct: 2
        },
        {
            q: "Как называются стабильные растительные сообщества, завершающие процесс сукцессии?",
            options: ["Пионерные сообщества", "Климаксные сообщества", "Агроценозы", "Вторичные сукцессии"],
            correct: 1
        }
    ]
};

// Системные переменные для отслеживания состояния игры
let currentTopic = '';
let currentQuestionIndex = 0;
let score = 0;
let bestScore = 0;
let canAnswer = true;

// Связывание с HTML элементами страницы
const welcomeScreen = document.getElementById('welcomeScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');

const questionText = document.getElementById('questionText');
const optionsList = document.getElementById('optionsList');
const questionCounter = document.getElementById('questionCounter');
const progressBar = document.getElementById('progressBar');
const finalScore = document.getElementById('finalScore');
const resultFeedback = document.getElementById('resultFeedback');
const bestScoreDisplay = document.getElementById('bestScoreDisplay');

// Функция автоматического запуска нужной темы при клике на карточку
function startQuiz(topic) {
    currentTopic = topic;
    currentQuestionIndex = 0;
    score = 0;
    canAnswer = true;

    welcomeScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    quizScreen.style.display = 'block';

    showQuestion();
}

// Отображение текущего вопроса выбранной темы
function showQuestion() {
    canAnswer = true;
    const currentQuestions = quizData[currentTopic];
    const currentQuestion = currentQuestions[currentQuestionIndex];

    // Обновляем счетчик шагов и визуальный индикатор (Progress Bar)
    questionCounter.innerText = `Вопрос ${currentQuestionIndex + 1} из ${currentQuestions.length}`;
    progressBar.style.width = `${((currentQuestionIndex) / currentQuestions.length) * 100}%`;
    questionText.innerText = currentQuestion.q;

    // Очищаем старые варианты ответов с экрана
    optionsList.innerHTML = '';

    // Генерируем новые варианты кнопок для текущего вопроса
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-item');
        button.innerText = option;
        button.onclick = () => selectOption(index, button);
        optionsList.appendChild(button);
    });
}

// Обработка клика по варианту ответа
function selectOption(selectedIndex, clickedButton) {
    if (!canAnswer) return;
    canAnswer = false;

    const currentQuestions = quizData[currentTopic];
    const correctAnswerIndex = currentQuestions[currentQuestionIndex].correct;
    const buttons = optionsList.querySelectorAll('.option-item');

    // Проверяем правильность и подсвечиваем нужным цветом (зеленый / красный)
    if (selectedIndex === correctAnswerIndex) {
        clickedButton.classList.add('correct');
        score++;
    } else {
        clickedButton.classList.add('wrong');
        buttons[correctAnswerIndex].classList.add('correct'); // Показываем правильный
    }

    // Переключаем на следующий вопрос через 1.5 секунды
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

// Вывод финальных результатов
function showResults() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'block';

    const currentQuestions = quizData[currentTopic];
    finalScore.innerText = `${score} / ${currentQuestions.length}`;

    // Анализ успешности прохождения
    if (score === currentQuestions.length) {
        resultFeedback.innerText = "Идеально! Отличные знания биологии 11 класса! 🌟";
        resultFeedback.style.color = "var(--correct-green)";
    } else if (score >= 3) {
        resultFeedback.innerText = "Хороший результат! Вы успешно справились с тестом. 👍";
        resultFeedback.style.color = "var(--main-purple)";
    } else {
        resultFeedback.innerText = "Стоит немного повторить параграфы учебника. У вас всё получится! 📚";
        resultFeedback.style.color = "var(--text-muted)";
    }

    // Расчет очков и перезапись рекорда
    const currentPoints = score * 100;
    if (currentPoints > bestScore) {
        bestScore = currentPoints;
        bestScoreDisplay.innerText = `${bestScore} баллов`;
    }
}

// Возврат в главное меню
function quitQuiz() {
    quizScreen.style.display = 'none';
    resultsScreen.style.display = 'none';
    welcomeScreen.style.display = 'block';
}
