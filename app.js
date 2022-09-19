'use strict';

const cards = [
    {
        name: 'sock1',
        img: 'images/sock1.png'
    },
    {
        name: 'sock2',
        img: 'images/sock2.png'
    },
    {
        name: 'sock3',
        img: 'images/sock3.png'
    },
    {
        name: 'sock5',
        img: 'images/sock5.png'
    },
    {
        name: 'sock6',
        img: 'images/sock6.png'
    },
    {
        name: 'sock7',
        img: 'images/sock7.png'
    },
    {
        name: 'sock1',
        img: 'images/sock1.png'
    },
    {
        name: 'sock2',
        img: 'images/sock2.png'
    },
    {
        name: 'sock3',
        img: 'images/sock3.png'
    },
    {
        name: 'sock5',
        img: 'images/sock5.png'
    },
    {
        name: 'sock6',
        img: 'images/sock6.png'
    },
    {
        name: 'sock7',
        img: 'images/sock7.png'
    }
];

const gameBoard = document.querySelector('.game_board');
const foundDisplay = document.querySelector('.found_qty');
const resetBttn = document.querySelector('.reset_bttn');
const playBttns = document.querySelectorAll('.play_bttn');
const winMessage = document.querySelector('.win_message');
const startMessage = document.querySelector('.start_message');

let boardLocked = true;
let cardsInfo = [];
let flippedCards = [];
let foundCardsQty = 0;

function shuffleCards() {
    return cards.sort(() => 0.5 - Math.random());
};

function generateCards() {
    shuffleCards();

    cards.forEach(card => {
        gameBoard.insertAdjacentHTML('beforeend',
        `
            <div class='card_container'>
                <img class='face' src=${card.img} data-id='${cards.indexOf(card)}' />
                <div class='back' data-id='${cards.indexOf(card)}'></div>
            </div>
        `);
    });
};

generateCards();

function flipCard() {
    gameBoard.addEventListener('click', (event) => {
        if (boardLocked) return;
        if (event.target === gameBoard) return;

        if (flippedCards.length < 2) {
            const cardId = +event.target.dataset.id;
            const currentCard = event.target.closest('.card_container');

            currentCard.classList.toggle('flipped_card');
            flippedCards.push(currentCard);
            cardsInfo.push({id: cardId, name: cards[cardId].name});
        };

        if (flippedCards.length === 2) {
            boardLocked = true;
            setTimeout(checkMatch, 1000);
        };
    });
};

flipCard();

function checkMatch() {
    if (cardsInfo[0].id == cardsInfo[1].id) {
        resetBoard();
        return;
    };

    if (cardsInfo[0].name !== cardsInfo[1].name) {
        flippedCards.forEach(card => card.classList.remove('flipped_card'));
        resetBoard();
        return;
    };

    if (cardsInfo[0].name === cardsInfo[1].name) {
        flippedCards.forEach(card => card.classList.add('card_locked'));
        foundCardsQty++;
        foundDisplay.innerText = `${foundCardsQty}`;
        checkWin();
        resetBoard();
        return;
    };
};

function resetBoard() {
    cardsInfo = [];
    flippedCards = [];
    boardLocked = false;
};

function checkWin() {
    if (foundCardsQty === cards.length / 2) {
        winMessage.classList.add('show_message');
    }
};

function resetGame() {
    const allCards = document.querySelectorAll('.card_container');
    allCards.forEach(card => card.classList.remove('flipped_card'));
    allCards.forEach(card => card.classList.remove('card_locked'));
    resetBoard();
    foundCardsQty = 0;
    foundDisplay.innerText = `${foundCardsQty}`;
    gameBoard.innerHTML = '';
    generateCards();
};

resetBttn.addEventListener('click', () => {
    resetGame();
});

playBttns.forEach(bttn => bttn.addEventListener('click', () => {
    resetGame();
    startMessage.classList.remove('show_message');
    winMessage.classList.remove('show_message');
}));
