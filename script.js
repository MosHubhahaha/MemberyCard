let card = document.querySelector('.card');

// card.addEventListener('click', () => {
//     card.classList.toggle("show-answer")
// });

let showbtn = document.getElementById('show');
let hidden = document.getElementById('btn-hidden');
let addContainer = document.getElementById('add-container');
const addCard = document.getElementById('add-card');
const cardContainer = document.querySelector('.card-container');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const current = document.querySelector('.current');
const question = document.getElementById('question');
const answer = document.getElementById('answer');
const clear = document.getElementById('clear');


let currentActiveCard = 0;
let cards = [];

const cardsData = getCardData();

function createCard(){
    cardsData.forEach((data, index) => {
        createSingleCard(data, index);
    })
}

function createSingleCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card');
    if(index === 0){
        card.classList.add('active');
    }
    card.innerHTML = `
        <div class="inner-card">
            <div class="inner-card-front">
                <p>${data.question}</p>
            </div>
            <div class="inner-card-back">
                <p>${data.answer}</p>
            </div>
        </div>
    `;
    card.addEventListener('click', () => {
        card.classList.toggle('show-answer');
    });
    cardContainer.appendChild(card);
    cards.push(card);
}


function updateCurrentText(){
    current.innerText = `${currentActiveCard + 1}/${cards.length}`;
}

showbtn.addEventListener('click', () => {
    addContainer.classList.add('show');
});

hidden.addEventListener('click', () => {
    addContainer.classList.remove('show');
});

next.addEventListener('click', () => {
    currentActiveCard++;
    if(currentActiveCard > cards.length - 1){
        currentActiveCard = cards.length - 1;
    }
    updateCurrentText();
    cards[currentActiveCard].classList.add('active');
    cards[currentActiveCard - 1].classList.remove('active');
});

prev.addEventListener('click', () => {
    currentActiveCard--;
    if(currentActiveCard < 0){  
        currentActiveCard = 0;
    }
    updateCurrentText();
    cards[currentActiveCard].classList.add('active');
    cards[currentActiveCard + 1].classList.remove('active');
});

createCard();

addCard.addEventListener('click', () => {
    const questionText = question.value;
    const answerText = answer.value;
    cardsData.push({question: questionText, answer: answerText});
    createSingleCard({question: questionText, answer: answerText}, cardsData.length - 1);
    addContainer.classList.remove('show');
    question.value = '';
    answer.value = '';
    setCardData(cardsData);
});

function setCardData(cards){
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

clear.addEventListener('click', () => {
    localStorage.removeItem('cards');
    cardContainer.innerHTML = '';
    window.location.reload();
});

function getCardData(){
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}