function generateQuiz(questions, quizContainer, resultsContainer, submitButton) {
    let currentQuestionIndex = 0;
    let userAnswers = {};

    function showQuestion(index) {
        let questionData = questions[index];
        let answers = [];

        if (questionData.isOpenEnded) {
            quizContainer.innerHTML = `
                <div class="question fade-in">${questionData.question}</div>
                <textarea class="open-ended-answer" placeholder="Your answer here..."></textarea>
                <button class="next-question">Next Question</button>
            `;
            let nextButton = quizContainer.querySelector('.next-question');
            nextButton.addEventListener('click', () => {
                let textArea = quizContainer.querySelector('.open-ended-answer');
                userAnswers[index] = textArea.value;
                handleAnswer();
            });
        } else {
            for (let letter in questionData.answers) {
                answers.push(
                    `<label class="answer-option">
                        <input type="radio" name="question${index}" value="${letter}">
                        <span class="letter">${letter}:</span>
                        <span class="option-text">${questionData.answers[letter]}</span>
                    </label>`
                );
            }

            quizContainer.innerHTML = `
                <div class="question fade-in">${questionData.question}</div>
                <div class="answer-options fade-in">${answers.join('')}</div>
            `;

            document.querySelectorAll(`input[name="question${index}"]`).forEach(input => {
                input.addEventListener('change', (event) => {
                    userAnswers[index] = event.target.value;
                    handleAnswer();
                });
            });
        }
    }

    function handleAnswer() {
        let currentElements = quizContainer.querySelectorAll('.fade-in');
        currentElements.forEach(el => el.classList.add('fade-out'));

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                quizContainer.innerHTML = '';
                showQuestion(currentQuestionIndex);
            } else {
                quizContainer.innerHTML = `<div class="final-message fade-in">All done! Click below to see your results.</div>`;
                submitButton.style.display = 'block';
            }
        }, 500);
    }

    showQuestion(currentQuestionIndex);

    submitButton.addEventListener('click', () => {
        showResults(questions, resultsContainer);
    });

    function checkOpenEndedAnswer(answer, correctAnswerKeywords) {
        let answerWords = answer.toLowerCase().split(/\s+/);
        for (let keyword of correctAnswerKeywords) {
            if (answerWords.includes(keyword.toLowerCase())) {
                return true;
            }
        }
        return false;
    }

    function showResults(questions, resultsContainer) {
        let numCorrect = 0;

        questions.forEach((q, i) => {
            if (q.isOpenEnded) {
                if (userAnswers[i] && checkOpenEndedAnswer(userAnswers[i], q.correctAnswerKeywords)) {
                    numCorrect++;
                }
            } else {
                if (userAnswers[i] === q.correctAnswer) {
                    numCorrect++;
                }
            }
        });

        resultsContainer.innerHTML = `<div class="result fade-in">${numCorrect} out of ${questions.length}</div>`;
    }
}

let myQuestions = [
    {
        question: "Wat is dyscalculie?",
        answers: {
            a: 'Een soort visuele beperking',
            b: 'Moeite met wiskunde en getallen',
            c: 'Een gehoorbeperking',
            d: 'Een taalstoornis'
        },
        correctAnswer: 'b'
    },
    {
        question: "Welke van de volgende is een veelvoorkomend symptoom van dyscalculie?",
        answers: {
            a: 'Moeite met sociale interacties',
            b: 'Moeite met basis wiskundebewerkingen',
            c: 'Geheugenverlies',
            d: 'Slechte leesbegrip'
        },
        correctAnswer: 'b'
    },
    {
        question: "Hoe wordt dyscalculie meestal gediagnosticeerd?",
        answers: {
            a: 'Door een lichamelijk onderzoek',
            b: 'Door familieleden',
            c: 'Door een gespecialiseerde onderwijsprofessional',
            d: 'Door zelfdiagnose'
        },
        correctAnswer: 'c'
    },
    {
        question: "Welke van deze dingen kan een uitdaging zijn voor iemand met dyscalculie?",
        answers: {
            a: 'Het begrijpen van sociale signalen',
            b: 'Moeite met basis wiskundebewerkingen',
            c: 'Problemen met het schrijven van essays',
            d: 'Alle bovenstaande'
        },
        correctAnswer: 'd'
    },
    {
        question: "Wat is een effectieve lesmethode voor studenten met dyscalculie?",
        answers: {
            a: 'Fouten bestraffen om de focus te verbeteren',
            b: 'Strikt traditionele lesboeken volgen',
            c: 'Alleen technologie gebruiken',
            d: 'hulpmiddelen gebruiken zoals extra tijd voor opdrachten'
        },
        correctAnswer: 'd'
    },
    {
        question: "Welk percentage van de bevolking wordt geschat dyscalculie te hebben?",
        answers: {
            a: '1-3%',
            b: '5-10%',
            c: '15-20%',
            d: 'Meer dan 30%'
        },
        correctAnswer: 'a'
    },
    {
        question: "Welke van de volgende is NIET typisch geassocieerd met dyscalculie?",
        answers: {
            a: 'Moeite met getalconcepten',
            b: 'Problemen met leesbegrip',
            c: 'Moeite met tijd begrijpen',
            d: 'Moeilijkheden met wiskundebewerkingen'
        },
        correctAnswer: 'b'
    },
    {
        question: "Welke leeftijdsgroep wordt het vaakst gediagnosticeerd met dyscalculie?",
        answers: {
            a: 'Tieners',
            b: 'Basisschoolkinderen',
            c: 'Volwassenen',
            d: 'Peuters'
        },
        correctAnswer: 'b'
    },
    {
        question: "Welke van de volgende zou een teken kunnen zijn dat iemand dyscalculie heeft?",
        answers: {
            a: 'Het vergeten van basis wiskundebewerkingen',
            b: 'Het verwarren van getallen',
            c: 'Het vermijden van wiskundetaken',
            d: 'Alle bovenstaande'
        },
        correctAnswer: 'd'
    },
    {
        question: "Dyscalculie gaat vaak samen met welke andere leerstoornis?",
        answers: {
            a: 'ADHD',
            b: 'Dyslexie',
            c: 'Dyspraxie',
            d: 'Alle bovenstaande'
        },
        correctAnswer: 'd'
    },
    {
        question: "Wat zijn volgens jou de grootste uitdagingen voor iemand met dyscalculie in het dagelijks leven?",
        isOpenEnded: true,
        correctAnswerKeywords: ["moeite", "getallen", "tijd", "concepten", "wiskunde", "bewerkingen", "rekeningen", "herinneren"]
    },
    {
        question: "Welke strategieën zou je aanbevelen om iemand met dyscalculie te ondersteunen bij wiskunde?",
        isOpenEnded: true,
        correctAnswerKeywords: ["visuele", "hulpmiddelen", "extra", "tijd", "herhaling"]
    },
    {
        question: "Hoe kan dyscalculie het sociale leven van een persoon beïnvloeden?",
        isOpenEnded: true,
        correctAnswerKeywords: ["moeite", "plannen", "organiseren", "frustratie", "wiskundige", "taken"]
    },
    {
        question: "Welke impact heeft dyscalculie op de zelfwaardering van mensen die ermee te maken hebben?",
        isOpenEnded: true,
        correctAnswerKeywords: ["frustratie", "zelfvertrouwen", "isolatie", "zelfbeeld", "durven"]
    },
    {
        question: "Wat zijn volgens jou de belangrijkste uitdagingen voor studenten met dyscalculie in een klaslokaal?",
        isOpenEnded: true,
        correctAnswerKeywords: ["moeite", "aandacht", "structuur", "getallen", "wiskundebewerkingen", "rekenen"]
    }
];

let quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results');
let submitButton = document.getElementById('submit');
submitButton.style.display = 'none';

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);
    