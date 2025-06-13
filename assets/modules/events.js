import variables from './variables.js';
import { manipulation, numbers, payouts } from './constants.js';
import {
    additional,
    autoSelectionButton,
    balance,
    card,
    extra,
    firstSpin,
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
    tubeTop
} from './selectors.js';
import {
    addEvent,
    audio,
    checkSpinsAndBalance,
    formattedValue,
    getRandomIntInclusive,
    handleCardItemClick,
    handleInputMinusClick,
    handleInputPlusClick,
    handleSpinClick,
    mask,
    refreshPayoutAndExtraValues,
    regexPrice,
    shuffle,
    sleep
} from './utils.js';
import gain from './gain.js';
import loss from './loss.js';
import slotAnimation from './slot.js';

const events = () => {
    addEvent({
        element: document,
        type: 'contextmenu',
        func: event => event.preventDefault(),
        elems: null
    });

    addEvent({
        element: balance,
        type: 'click',
        func: ({ target }) => {
            const textContent = target.textContent;

            const balanceFormated = formattedValue(variables.currentBalance);

            target.innerText = textContent == balanceFormated ? "xxxxxxx" : balanceFormated;
        },
        elems: null
    });

    addEvent({
        element: investmentInput,
        type: 'keyup',
        func: event => mask(event, regexPrice),
        elems: null
    });

    addEvent({
        element: martingaleToggle,
        type: 'click',
        func: ({ target }) => {
            if (!target.getAttribute('checked', true)) {
                // Muda o cursor da opção "x1"
                if (firstSpin) {
                    firstSpin.classList.add('disabled');
                }

                variables.martingale = true;

                return target.setAttribute('checked', true);
            }

            variables.martingale = false;

            firstSpin.classList.remove('disabled');

            target.removeAttribute('checked');
        },
        elems: null
    });

    addEvent({
        element: autoSelectionButton,
        type: 'click',
        func: async () => {
            tubeTop.style.transform = 'translateY(-190px)';
            tubeBottom.style.transform = 'translateY(calc(100vh - 240px))';

            autoSelectionButton.setAttribute('disabled', 'disabled');
            autoSelectionButton.classList.add('selected');

            if (variables.items < 5) {
                audio('open').play();
            }

            if (variables.items >= 15) {
                return;
            }

            variables.closedPipe = false;

            // Retorna os números que não foram selecionados pelo Player
            let leftoverNumbers = numbers.filter(x => !variables.player.includes(x));
            // Embaralha
            let reordered = shuffle(leftoverNumbers);
            // Retorna X números para completar 15
            let result = reordered.slice(0, 15 - variables.player.length);

            const payoutNumber = payout.querySelector('h3');

            variables.player = variables.player.concat(result);

            for (let i = 0; i < result.length; i++) {
                audio('select').play();

                await sleep(50);

                card.querySelector(`[id='${result[i]}']`).classList.add('selected');
                card.querySelector(`[id='${result[i]}'] .name`).classList.add('selected');

                quantitySelectedOfTotal.innerText = variables.items + (i + 1);
            }

            payout.classList.remove('hidden');

            variables.items += result.length;

            variables.percent = payouts[variables.items];
            payoutNumber.innerText = payouts[variables.items];

            extra.classList.remove('hidden');

            const payoutValue = payout.querySelector('h3');
            const extraMultiplier = multiplier.querySelector('h3');
            const extraAdditional = additional.querySelector('h3');

            refreshPayoutAndExtraValues(payoutValue, extraMultiplier, extraAdditional);

            checkSpinsAndBalance();
        }
    });

    addEvent({
        element: startButton,
        type: 'click',
        func: async () => {
            if (variables.currentInvestment < 100) {
                return;
            }

            if (![1, 2, 5, 10, 20].includes(variables.spin)) {
                variables.spin = 1;
            }

            variables.currentInvestment = (variables.currentInvestment == 0) ? 100 : variables.currentInvestment;

            if ((variables.currentInvestment * variables.spin) > variables.currentBalance) {
                console.log(" ");
                console.log("[ SALDO INSUFICIENTE ]");

                return;
            }

            investmentInput.setAttribute('disabled', 'disabled');

            investmentMinus.removeEventListener('click', handleInputMinusClick, true);
            investmentPlus.removeEventListener('click', handleInputPlusClick, true);

            items.forEach(item => item.removeEventListener('click', handleCardItemClick, true));
            spins.forEach(item => item.removeEventListener('click', handleSpinClick, true));

            martingaleToggle.setAttribute('disabled', 'disabled');

            autoSelectionButton.setAttribute('disabled', 'disabled');
            autoSelectionButton.classList.add('selected');

            startButton.setAttribute('disabled', 'disabled');
            startButton.classList.remove('selected');

            console.log("\nOs números abaixo, correspondem as posições do card [0..24]\n\n");

            variables.machine = numbers.filter(x => !variables.player.includes(x));

            console.log("PLAYER:", variables.player.toString());
            console.log("PC:    ", variables.machine.toString());

            const { min, max, limit } = manipulation[variables.items];

            for (let i = 0; i < variables.spin; i++) {
                (getRandomIntInclusive(min, max) <= limit) ? loss() : gain();
            }

            await slotAnimation();

            investmentInput.removeAttribute('disabled');

            investmentMinus.addEventListener('click', handleInputMinusClick, true);
            investmentPlus.addEventListener('click', handleInputPlusClick, true);

            items.forEach(item => item.addEventListener('click', handleCardItemClick, true));
            spins.forEach(item => item.addEventListener('click', handleSpinClick, true));

            if (variables.spin != 1) {
                martingaleToggle.removeAttribute('disabled');
            }

            if (variables.items < 15) {
                autoSelectionButton.removeAttribute('disabled');
                autoSelectionButton.classList.remove('selected');
            }

            startButton.removeAttribute('disabled');
            startButton.classList.add('selected');
        },
        elems: null
    });

    investmentMinus.addEventListener('click', handleInputMinusClick, true);
    investmentPlus.addEventListener('click', handleInputPlusClick, true);

    items.forEach(item => item.addEventListener('click', handleCardItemClick, true));
    spins.forEach(item => item.addEventListener('click', handleSpinClick, true));
}

export default events;
