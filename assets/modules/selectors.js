const main = document.querySelector('body > main');
const winnerEmoji = main.querySelector('.winner-emoji');
const card = main.querySelector('.card');
const quantitySelectedOfTotal = main.querySelector('span');
const items = [...card.querySelectorAll('.item')];

const tube = document.querySelector('.tube');
const tubeTop = tube.querySelector('.top');
const tubeBottom = tube.querySelector('.bottom');
const tubeContent = tube.querySelector('.content');

const balance = document.querySelector('.balance');

const investment = document.querySelector('.investment');
const investmentInput = investment.querySelector('input[name="investment"]');
const investmentMinus = investment.querySelector('.minus');
const investmentPlus = investment.querySelector('.plus');

const payout = document.querySelector('.payout');

const extra = document.querySelector('.extra');
const multiplier = extra.querySelector('.multiplier');
const additional = extra.querySelector('.additional');

const income = document.querySelector('.income h2');

const spins = [...document.querySelectorAll('.spins div')];
const firstSpin = document.querySelector('.spins [id="1"]');

const martingaleToggle = document.querySelector('input[name="martingale-toggle"]');

const autoSelectionButton = document.querySelector('.auto-selection-button');
const startButton = document.querySelector('.start-button');

export {
    additional,
    autoSelectionButton,
    balance,
    card,
    extra,
    firstSpin,
    income,
    investmentInput,
    investmentMinus,
    investmentPlus,
    items,
    martingaleToggle,
    multiplier,
    payout,
    quantitySelectedOfTotal,
    spins,
    startButton,
    tubeBottom,
    tubeContent,
    tubeTop,
    winnerEmoji
}
