import variables from './variables.js';
import {
    awards,
    media,
    numbers,
    payouts
} from './constants.js';
import {
    additional,
    autoSelectionButton,
    balance,
    extra,
    income,
    investmentInput,
    martingaleToggle,
    multiplier,
    payout,
    quantitySelectedOfTotal,
    spins,
    startButton,
    tubeBottom,
    tubeTop
} from './selectors.js';

const addEvent = ({ element = null, type, func, elems }) => {
    if (element) {
        elems ? element.addEventListener(type, () => func(elems)) : element.addEventListener(type, func);
    }
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const audio = type => {
    const sound = new Audio(`assets/audio/${media[type].file}`);
    sound.preload = 'auto';
    sound.load();
    sound.volume = media.volume(type);

    return sound;
}

const mask = async ({ target }, func) => {
    await sleep(1);

    target.value = func(target.value);
}

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const formattedValue = value => {
    return (value / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

const shuffle = array => {
    return array.sort(() => Math.random() - 0.5);
}

const checkSpinsAndBalance = () => {
    if ((variables.currentInvestment * variables.spin) > variables.currentBalance) {
        startButton.classList.remove('selected');
        startButton.setAttribute('disabled', 'disabled');

        return;
    }

    startButton.classList.add('selected');
    startButton.removeAttribute('disabled');
}

const refreshIncome = () => {
    const multiplierValue = awards.getValue(variables.items).multiplier;
    const additionalValue = awards.getValue(variables.items).additional * 100;

    let value = (variables.currentInvestment + ((variables.percent / 100) * variables.currentInvestment));

    if (variables.items < 5) {
        const payoutMax = variables.currentInvestment + ((payouts[5] / 100) * variables.currentInvestment);
        const bonusMax = (payoutMax * awards.getValue(5).multiplier) + (awards.getValue(5).additional * 100);

        income.innerText = (value == 0) ? "1,80 a 10.000,00" : formattedValue(value) + " a " + formattedValue(bonusMax);

        return;
    }

    value = (value == 0) ? 100 + ((variables.percent / 100) * 100) : value;

    income.innerText = formattedValue((value * multiplierValue) + additionalValue);
}

const regexPrice = value => {
    if (value.charAt(0) === "0") {
        return "";
    }

    const stringWithOnlyNumbers = value.replace(/[^0-9]+/g, "");
    const valueInCents = Number(stringWithOnlyNumbers);

    (valueInCents < 100) ? investmentInput.classList.add('red') : investmentInput.classList.remove('red');

    if (stringWithOnlyNumbers.length == 0) {
        investmentInput.classList.remove('red');
    }

    if (valueInCents > 1000) {
        variables.currentInvestment = 1000;

        if (variables.items < 5) {
            income.innerText = "18,00 a 64.000,00";
        }

        refreshIncome();

        return "10,00";
    }

    variables.currentInvestment = valueInCents;
    variables.initialInvestment = valueInCents;

    refreshIncome();

    if (variables.items >= 5) {
        checkSpinsAndBalance();
    }

    value = value.replace(/[^0-9]+/g, "");
    value = value.replace(/([0-9]{2})$/g, ",$1");

    if (value.length > 6) {
        value = value.replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
    }

    return value;
}

const refreshPayoutAndExtraValues = (payoutValue, extraMultiplier, extraAdditional) => {
    variables.percent = payouts[variables.items] || payouts[15];
    payoutValue.innerText = payouts[variables.items] || payouts[15];

    const multiplierValue = awards.getValue(variables.items).multiplier;
    const additionalValue = awards.getValue(variables.items).additional * 100;

    extraMultiplier.innerText = multiplierValue;
    extraAdditional.innerText = formattedValue(additionalValue);

    multiplier.classList.remove('hidden');
    additional.classList.remove('hidden');

    if (multiplierValue == 1) {
        multiplier.classList.add('hidden');
        additional.classList.add('hidden');
    }

    if (multiplierValue == 5 || multiplierValue == 10) {
        additional.classList.add('hidden');
    }

    refreshIncome();
}

const handleCardItemClick = ({ target }) => {
    const item = target.closest('.item');

    if (!item.classList.contains('selected') && variables.items == 15) {
        return;
    }

    const payoutValue = payout.querySelector('h3');
    const extraMultiplier = multiplier.querySelector('h3');
    const extraAdditional = additional.querySelector('h3');

    if (!item.classList.contains('selected')) {
        item.classList.add('selected');
        item.querySelector('.name').classList.add('selected');

        variables.items++;

        quantitySelectedOfTotal.innerText = variables.items;

        variables.player.push(Number(item.getAttribute('id')));

        audio('select').play();

        if (variables.items == 15) {
            autoSelectionButton.removeAttribute('disabled');
            autoSelectionButton.classList.add('selected');
        }

        if (variables.items == 5) {
            tubeTop.style.transform = 'translateY(-190px)';
            tubeBottom.style.transform = 'translateY(calc(100vh - 240px))';

            payout.classList.remove('hidden');
            extra.classList.remove('hidden');

            audio('open').play();

            variables.closedPipe = false;
        }

        if (variables.items < 5) {
            tubeTop.style.transform = 'translateY(0px)';
            tubeBottom.style.transform = 'translateY(0px)';

            return;
        }

        refreshPayoutAndExtraValues(payoutValue, extraMultiplier, extraAdditional);

        startButton.classList.add('selected');
        startButton.removeAttribute('disabled');

        return;
    }

    item.classList.remove('selected');
    item.querySelector('.name').classList.remove('selected');

    variables.items--;

    quantitySelectedOfTotal.innerText = variables.items;

    variables.player = variables.player.filter(x => x !== Number(item.getAttribute('id')));

    if (variables.items < 15) {
        autoSelectionButton.removeAttribute('disabled');
        autoSelectionButton.classList.remove('selected');
    }

    if (variables.items < 5) {
        payout.classList.add('hidden');
        extra.classList.add('hidden');

        startButton.classList.remove('selected');
        startButton.setAttribute('disabled', 'disabled');

        tubeTop.style.transform = 'translateY(0px)';
        tubeBottom.style.transform = 'translateY(0px)';

        if (!variables.closedPipe) {
            audio('close').play();
        }

        variables.closedPipe = true;
    }

    refreshPayoutAndExtraValues(payoutValue, extraMultiplier, extraAdditional);
}

const handleSpinClick = ({ target }) => {
    if (target.classList.contains('selected')) {
        return;
    }

    const id = Number(target.getAttribute('id'));

    if (isNaN(id)) {
        return;
    }

    variables.spin = id;

    if (variables.items >= 5) {
        checkSpinsAndBalance();
    }

    if (martingaleToggle.checked && id == 1) {
        return;
    }

    spins.forEach(item => item.classList.remove('selected'));

    target.classList.add('selected');

    if (id != 1) {
        martingaleToggle.removeAttribute('disabled');

        return;
    }

    martingaleToggle.setAttribute('disabled', 'disabled');
}

const inputMinusAndPlusClick = () => {
    variables.initialInvestment = variables.currentInvestment;

    if (variables.items >= 5) {
        checkSpinsAndBalance();
    }

    investmentInput.value = formattedValue(variables.currentInvestment);

    refreshIncome();
}

const handleInputMinusClick = () => {
    variables.currentInvestment -= 100;

    if (variables.currentInvestment < 100) {
        variables.currentInvestment = 100;
    }

    inputMinusAndPlusClick();
}

const handleInputPlusClick = () => {
    variables.currentInvestment += 100;

    if (variables.currentInvestment > 1000) {
        variables.currentInvestment -= 100;
    }

    inputMinusAndPlusClick();
}

const refreshCurrentBalance = value => {
    balance.innerText = (balance.textContent !== "xxxxxxx") ? formattedValue(value) : "xxxxxxx";
}

const random = (array, amount) => {
    if (amount == 1) {
        return array[Math.floor(Math.random() * array.length)];
    }

    let set = new Set();

    while (set.size < amount) {
        set.add(array[Math.floor(Math.random() * array.length)]);
    }

    return [...set];
}

const raffle = (allNumbers, reserve) => {
    if (allNumbers.length == 0) {
        allNumbers = numbers; // 0..24
    }

    let quantityOfPlayer = [];
    let quantityOfMachine = [];
    let result = [];

    // Apenas números do PC
    const allNumbersOfMachine = allNumbers.filter(x => !variables.player.includes(x));

    // Reserva 2 ou 3 números do PC
    let reservedNumbers = random(allNumbersOfMachine, reserve);

    /* Adiciona os números reservados junto com o número que foi reservado em caso de vitóra
     * ...variables.numbersToBreakSequence possui 1 número ( vitória ) ou está vazio ( derrota )
     */
    variables.numbersToBreakSequence = [...variables.numbersToBreakSequence, ...reservedNumbers];

    console.log("NÚMEROS RESERVADOS PELO PC: [ " + variables.numbersToBreakSequence.toString() + " ]");
    console.log(" ");
    console.log("SORTEANDO NÚMEROS...");
    console.log(" ");

    const size = allNumbers.length;

    // Remove os números reservados
    allNumbers = allNumbers.filter(x => !reservedNumbers.includes(x));

    const leftoverNumbers = allNumbersOfMachine.filter(x => !reservedNumbers.includes(x));

    while (result.length < size) {
        let number = random(allNumbers, 1);

        if (quantityOfPlayer.length == 4) {
            console.log("QUADRA ENCONTRADA: [ " + quantityOfPlayer.toString() + " ]");

            quantityOfPlayer = [];

            // Apenas números do PC
            const numbersOfMachine = allNumbers.filter(x => !variables.player.includes(x));

            number = (numbersOfMachine.length == 0) ? random(reservedNumbers, 1) : random(numbersOfMachine, 1);

            // Caso não houver mais números do PC, vai pegar o número reservado
            if (reservedNumbers.includes(number)) {
                console.log("[ NÚMEROS ESGOTADOS ] COLOCOU O NÚMERO", number, "[ RESERVADO ]");

                reservedNumbers = reservedNumbers.filter(x => x !== number);
            }

            if (allNumbers.includes(number)) {
                variables.numbersToBreakSequence.push(number);

                console.log("O PC COLOCOU O NÚMERO", number, "PARA QUEBRAR A SEQUÊNCIA");

                allNumbers = allNumbers.filter(x => x !== number);
            }
        }

        // Enquanto pertencer ao Player, adicionar no array "quantityOfPlayer"
        quantityOfPlayer = (variables.player.includes(number)) ? [...quantityOfPlayer, number] : [];

        if (quantityOfMachine.length == leftoverNumbers.length) {
            quantityOfPlayer = [];
            quantityOfMachine = [];

            continue;
        }

        // Enquanto pertencer ao PC, adicionar no array "quantityOfMachine"
        quantityOfMachine = (variables.machine.includes(number)) ? [...quantityOfMachine, number] : [];

        if (allNumbers.includes(number)) {
            allNumbers = allNumbers.filter(x => x !== number);
        }

        if (reservedNumbers.includes(number)) {
            reservedNumbers = reservedNumbers.filter(x => x !== number);
        }

        result.push(number);

        // Verifica se todos os números reservados, já foram inclusos no "result"
        if (reservedNumbers.every(x => result.includes(x))) {
            continue;
        }

        // Verifica se todos os números do Player ( menos a Quina, se existir ), já foram adicionados
        const allExistInResult = [...variables.player.filter(x => !variables.fiveOfAKind.includes(x))].every(x => result.includes(x));

        // Bug fixed
        if (allExistInResult && quantityOfPlayer.length == 4) {
            continue;
        }

        if (allExistInResult && reservedNumbers.length > 0) {
            number = random(reservedNumbers, 1);

            console.log("COLOCOU O NÚMERO", number, "[ RESERVADO ]");

            reservedNumbers = reservedNumbers.filter(x => x !== number);

            allNumbers.push(number);
        }
    }

    console.log(" ");
    console.log("SORTEIO CONCLUÍDO");
    console.log(" ");
    console.log("RESULTADO:\n[ " + result.toString() + " ]");

    return result;
}

export {
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
    raffle,
    random,
    refreshCurrentBalance,
    refreshIncome,
    refreshPayoutAndExtraValues,
    regexPrice,
    shuffle,
    sleep
}
