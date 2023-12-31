const questions = [
	{ //1
		question: "Что такое token в контексте криптовалют?",
		answers: [
            "Цифровой актив, выпущенный централизованной организацией",
            "Цифровой актив, выпущенный децентрализованной организацией",
            "Технология шифрования для защиты личной информации",
        ],
		correct: 2,
	},
	{ //2
		question: "Какое событие привело к возникновению криптовалюты Биткоин?",
		answers: [
			"Финансовый кризис 2008 года",
			"Олимпийские игры 2008 года",
			"Интернет-бум 1990-х",
		],
		correct: 1,
	},
	{ //3
		question: "Какой из следующих терминов описывает процесс, при котором майнеры получают бонусные токены помимо вознаграждения за блок?",
		answers: [
			"Халвинг (Halving)",
			"Форк (Fork)",
			"AirDrop",
			"Дефляция (Deflation)",
		],
		correct: 3,
	},
	{ //4
		question: "Какой алгоритм консенсуса использует криптовалюта EOS?",
		answers: [
            "Proof-of-Work (PoW)",
            "Delegated Proof-of-Stake (DPoS)",
            "Proof-of-Stake (PoS)",
            "Proof-of-Authority (PoA)"
		],
		correct: 2,
	},
	{ //5
		question: "Что такое майнинговый риг (mining rig)?",
		answers: [
            "Специальное программное обеспечение для майнинга криптовалюты",
            "Высокотехнологичная одежда для майнеров",
            "Специализированный компьютерный оборудование для майнинга",
        ],
		correct: 3,
	},
	{ //6
		question: "Какой термин используется для обозначения момента, когда все возможные единицы криптовалюты уже созданы?",
		answers: [
            "Халвинг (Halving)",
            "Платежный шлюз (Payment Gateway)",
            "Максимальный предел эмиссии (Max Supply Limit)",
        ],
		correct: 3,
	},
	{ //7
		question: "Что такое горячее хранение (hot storage) в контексте криптовалюты?",
		answers: [
            "Хранение криптовалюты на холодном жестком диске",
            "Хранение криптовалюты на специальном аппаратном кошельке",
            "Хранение криптовалюты на подключенном к интернету устройстве",
        ],
		correct: 3,
	},
	{ //8
		question: "Какой алгоритм консенсуса использует криптовалюта Dash?",
		answers: [
            "Proof-of-Work (PoW)",
            "Proof-of-Stake (PoS)",
            "Proof-of-Authority (PoA)",
            "X11"
		],
		correct: 4,
	},
	{ //9
		question: "Какой протокол используется для обеспечения безопасности и консенсуса в сети Bitcoin Cash (BCH)?",
		answers: [
            "Proof-of-Work (PoW)",
            "Proof-of-Stake (PoS)",
            "Delegated Proof-of-Stake (DPoS)",
            "Byzantine Fault Tolerance (BFT)"
		],
		correct: 1,
	},
	{ //10
		question: "Какое из перечисленных утверждений о криптовалюте Monero (XMR) верно?",
		answers: [
            "Monero использует открытый блокчейн, видимый для всех пользователей",
            "Monero предоставляет полное отсутствие конфиденциальности для транзакций",
            "Monero использует технологию Ring Confidential Transactions для обеспечения приватности",
        ],
		correct: 3,
	}
];

let quastionIndex = 0;
let score = 0;
let incorrectAnswers = [];


const headerContainer = document.querySelector('#header');
const List = document.querySelector('#list')
const btn = document.querySelector('#submit')


function clear() {
    headerContainer.innerHTML = '';
    List.innerHTML = '';
}
clear();
showQuastion();


function showQuastion() {

	btn.onclick = checkAnswer; // f запускается по клике на кнопку

	let progress = `${quastionIndex+1}/${questions.length}`
	//вопрос
	const headerTemplate = `<h2 class='title'>%title%</h2>
	<p class = 'prgs'>%progress%</p>`
	const title = headerTemplate.replace('%title%', questions[quastionIndex].question).replace('%progress%', progress)//возыращаем новую стрку
	headerContainer.innerHTML = title;
	//ответы 
	for ([index, item] of questions[quastionIndex].answers.entries()) { //для массива вызываем метод entries --> возвращает массив key, value||| индекс --- значение
		const quastionTemplate = `
		<li>
			<label>
				<input value="%number%" type="radio" class="answer" name="answer" />
				<span>%answer%</span>
			</label>
        </li>
		`
		let answerHTML = quastionTemplate
			.replace('%answer%', item)
			.replace('%number%', index + 1)
		List.innerHTML += answerHTML;
	}
}
function checkAnswer() {
	
	const radioCheck = document.querySelector('input[type="radio"]:checked') //получаем выбранную радиокнопку
	const userAnswer = Number(radioCheck.value);

	if (!radioCheck) {
		btn.blur();
		return //просто выходим из фукции
	}

	if (userAnswer === questions[quastionIndex].correct) {
        score++;
    } else {
        incorrectAnswers.push({
            question: questions[quastionIndex].question,
            userAnswer: questions[quastionIndex].answers[userAnswer - 1],
            correctAnswer: questions[quastionIndex].answers[questions[quastionIndex].correct - 1]
        });
    }

	if (quastionIndex !== questions.length - 1) {
		quastionIndex++
		clear();
		showQuastion()
	}
	else {
		clear();
		results();
	}
}

function displayIncorrectAnswers() {
    const unCorrectContainer = document.querySelector('.unCorrect');
    unCorrectContainer.style.display = 'block'
    unCorrectContainer.innerHTML = "";

    if (incorrectAnswers.length === 0) {
        unCorrectContainer.innerHTML = "<h1>Все ответы верны!</h1>";
        unCorrectContainer.style.backgroundColor = ''
    } else {
        const header = document.createElement("h1");
        header.textContent = "Вопросы, на которые были даны неверные ответы:";
        unCorrectContainer.appendChild(header);

        const unCorrectList = document.createElement("div");
        unCorrectList.classList.add("UnHer");

        incorrectAnswers.forEach((incorrectAnswer) => {
            const listItem = document.createElement("p");
            listItem.className = "vivo"
            listItem.innerHTML = `
            <p>${incorrectAnswer.question}</p>
            <p class="no">Ваш ответ: ${incorrectAnswer.userAnswer}</p>
            <p class="yes">Правильный ответ: ${incorrectAnswer.correctAnswer}</p>
            `;
            unCorrectList.appendChild(listItem);
        });

        unCorrectContainer.appendChild(unCorrectList);
    }
}

function results() {
	const resultsTemplate = `
        <div class="aleo">
		    <h2 class="title">%title%</h2>
		    <h3 class="summary">%summary%</h3>
		    <p class="result">%result%</p>
        </div>
	`
	let title,
		summary,
		motivation

	if (score === questions.length) {
		title = `🎉Вау! Вы настоящий гений! Все ответы верные!🎉`
		summary = `Поздравляю с абсолютной победой в нашей викторине! Это впечатляюще!`
	}
	else if (score === 8) {
		title = `👏Потрясающе! Вы очень близки к абсолютной победе!👏`
		summary = `Отличный результат! Поздравляю!`
	}
	else if (score >= questions.length/2 && score < 8) {
		title = `👍Отличная работа! Половина вопросов - это не шутка!👍`
		summary = `Поздравляю!`
	}
	else if (score === 1) {
		title = `👍Поздравляю!👍`
		summary = `Ваш ответ правильный! Один правильный ответ уже огромное достижение!`
	}
	else if (score === 1) {
		title = `👏 Неплохо! Вы правильно ответили всего на два вопроса, но это уже хороший результат!`
		summary = `Поздравляю с вашими правильными ответами! 👏`
	}
	else {
		title = `👏 Отличный результат!👏`
		summary = `Вы хорошо справились с вопросами и продемонстрировали свои знания!`
	}

	let result = `${score} из ${questions.length}`

	const final = resultsTemplate
		.replace('%title%', title)
		.replace('%summary%', summary)
		.replace('%result%', result)
		.replace('%motivation%', motivation)

	headerContainer.innerHTML = final

	btn.blur();
	btn.innerText = 'пройти заново'
	btn.onclick = () => {
		history.go() //???
	}
	
    displayIncorrectAnswers();
}
