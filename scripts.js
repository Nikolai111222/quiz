let qstns = [
        {
        	id: 0,
            qstn: "Что делает компьютер перед началом работы?",
            answers: [
                "Загружается",
                "Разгружается",
                "Нагружается",
                "Выгружается"
            ],
            right:  "Загружается"
        },
        {
        	id: 1,
            qstn: "Как называют взломщика компьютерных программ?",
            answers: [
                "Xакер",
                "Медвежатник",
                "Докер",
                "Клакер"
            ],
            right: "Xакер"
        },
        {
        	id: 2,
            qstn: "Как называется фон рабочего стола компьютера?",
            answers: [
                "гобелен",
                "паркет",
                "ковёр",
                "обои"
            ],
            right: "обои"
        },
        {
        	id: 3,
            qstn: "На что заканчиваются российские адреса в Интернете?",
            answers: [
                ".rus",
                ".ru",
                ".rf",
                ".russia"
            ],
            right: ".ru"
        },
        {
        	id: 4,
            qstn: "Как называют щелчок компьютерной мыши?",
            answers: [
                "бумс",
                "дзинь",
                "клац",
                "клик"
            ],
            right: "клик"
        }
	]
	sortedQSTNS = []
    answers = []
    current = -1

document.querySelector('button#begin').addEventListener('click', function () {
    sortedQSTNS = qstns.sort(() => Math.random() - 0.5)
    if (document.querySelector('div.card') !== null) {
        document.querySelectorAll('div.card').forEach(el => el.remove())
    }
    answers = []
	for (let i = 0; i < sortedQSTNS.length; i++) {
	    document.querySelector('div.cards').insertAdjacentHTML("beforeEnd", `
	        <div id="card${i}" class="card">
	            <div class="text">${sortedQSTNS[i].qstn}</div>
	            <form class="answers"></form>
	            <input data-qstnNum="${i}" type="button" value="Ответить">
	        </div>
	    `)
	    for (let q = 0; q < sortedQSTNS[i].answers.length; q++) {
	        document.querySelector(`div#card${i} form`).insertAdjacentHTML("beforeEnd", `
	            <div class="radio">
	            	<input type="radio" name="answer${i}" id="${i}-${q}" value="${sortedQSTNS[i].answers[q]}" data-qstnNum="${i}" data-ansNum="${q}">
	            	<label for="${i}-${q}">${sortedQSTNS[i].answers[q]}</label>
	            </div>
	        `)
	    }
    }
    this.style.display = 'none'
    if (document.querySelector('div.result') !== null) document.querySelector('div.result').remove()
    current = 0
    showCurent(document.querySelectorAll('div.card'))
})

document.querySelector('body').addEventListener('click', function (e) {
	inputs = []

	if (e.target.type !== "button") return
		else inputs = document.querySelectorAll("input[data-qstnnum='" + e.target.dataset.qstnnum + "'][type='radio']")

	if (isChecked(inputs) === false) return

	if (sortedQSTNS.find(qstn => sortedQSTNS.indexOf(qstn) === Number(isChecked(inputs).dataset.qstnnum)).right === isChecked(inputs).value) answers.push(1)
        else answers.push(0)
    showCurent(document.querySelectorAll('div.card'))
    console.log(answers);
})

function showCurent(cards) {
    cards.forEach( (el, n) => {
        if (n === current) el.style.display = 'flex'
            else el.style.display = 'none'
    })
    if (current !== qstns.length) {
        document.querySelector('footer').innerText = `Вопрос ${current + 1} из ${qstns.length}`
        current++
    } else showResult()
}

function count() {
    let count = 0
    answers.forEach(el => {if (el === 1) count++})
    return count
}

function showResult() {
    document.querySelector('footer').innerText = 'Результат'
    document.querySelector('div.cards').insertAdjacentHTML("afterBegin", `
        <div class="result">${count()} правильных из ${answers.length}</div>
    `)
    document.querySelector('button#begin').style.display = 'block'
    document.querySelector('button#begin').innerText = 'Еще раз'
}
function isChecked(inputs) {
    let output = false
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].checked) {
            output = inputs[i]
            break
		} else output = false
    }
    return output
}