const cards = document.querySelectorAll('.card');

let lock = false;
let flippedCard = false;
let firstCard, secondCard;

function flipCard() {
    if (lock) return;
    if (this === firstCard) return;
    this.classList.add('flip');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lock = true;

    checkForMatch();
}

function checkForMatch() {
    let match = firstCard.dataset.name === secondCard.dataset.name;
    match ? disableFlip() : unflipCards();
}

function disableFlip() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    reset();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        reset();
    }, 1500);
}

function reset() {
    flippedCard = false;
    lock = false;
    firstCard = null;
    secondCard = null;
}

(function shuffleCards() {
    cards.forEach(card => {
      let ramdomNum = Math.round(Math.random() * 100);
      card.style.order = ramdomNum;
    });
  })();

cards.forEach(card => card.addEventListener('click', flipCard));
