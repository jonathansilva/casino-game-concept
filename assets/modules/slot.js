import variables from './variables.js';
import { awards, bonus } from './constants.js';
import {
    card,
    investmentInput,
    items,
    tubeBottom,
    tubeContent,
    tubeTop,
    winnerEmoji
} from './selectors.js';
import {
    audio,
    formattedValue,
    refreshCurrentBalance,
    refreshIncome,
    sleep
} from './utils.js';

const slotAnimation = async () => {
    const multiplierValue = awards.getValue(variables.items).multiplier;
    const additionalValue = awards.getValue(variables.items).additional * 100;

    const slotItemHeight = Math.round(window.innerHeight / 7);

    for (let i = 0; i < variables.data.length; i++) {
        let value = 0;
        let sequence = 0;

        let staticNumbers = [];

        let move = false;
        let winner = false;

        if (variables.currentInvestment > variables.currentBalance) {
            console.log(" ");
            console.log("[ SALDO INSUFICIENTE ]");

            break;
        }

        for (let j = 0; j < variables.data[i].length; j++) {
            if (move) {
                let amountOfPixelsToGoDown = 0;

                // Move os números estáticos no tubo
                for (let k = 0; k < staticNumbers.length; k++) {
                    tubeContent.querySelector(`[id='${staticNumbers[k]}']`).style.transform = `translate(0px, calc(100vh - ${amountOfPixelsToGoDown}px))`;

                    amountOfPixelsToGoDown += slotItemHeight;
                }
            }

            if (staticNumbers.length == 6) {
                // Remove o primeiro número
                staticNumbers.shift();

                move = true;
            }

            if (j == 24) {
                value = slotItemHeight * 6;
            }

            const item = document.createElement('div');

            item.classList.add('item');
            item.style.height = slotItemHeight.toString() + "px";
            item.style.top = "-" + slotItemHeight.toString() + "px";
            item.setAttribute('id', variables.data[i][j]);

            const number = document.createElement('p');
            number.innerText = variables.data[i][j] + 1;

            const bubble = document.createElement('div');
            bubble.classList.add('bubble');

            const content = document.createElement('div');
            content.classList.add('content', 'bubble-arrow', 'hidden');

            const text = document.createElement('h1');

            content.appendChild(text);

            bubble.appendChild(content);

            item.appendChild(bubble);
            item.appendChild(number);

            tubeContent.appendChild(item);

            value = (j == 0) ? 0 : value;

            staticNumbers.push(variables.data[i][j]);

            const time = (sequence >= 5) ? 1000 : 300;

            await sleep(time);

            audio('raffle').play();

            item.style.transform = `translate(0px, calc(100vh - ${value}px))`;

            value += slotItemHeight;

            if (variables.player.includes(variables.data[i][j])) {
                card.querySelector(`[id='${variables.data[i][j]}']`).classList.add('white');
                card.querySelector(`[id='${variables.data[i][j]}'] .name`).classList.add('white');

                sequence++;

                item.style.backgroundColor = "#414266";
                item.style.color = "#ffffff";

                audio('found').play();

                if (sequence >= 5) {
                    winner = true;

                    if (sequence == 5) {
                        variables.currentBalance += ((variables.currentInvestment + ((variables.percent / 100) * variables.currentInvestment)) * multiplierValue) + additionalValue;

                        winnerEmoji.classList.remove('hidden');

                        audio('winner').play();
                        audio('coins').play();
                    }

                    if (sequence > 5) {
                        content.classList.remove('hidden');

                        const bonusAward = bonus.getValue(sequence, variables.items) * 100;

                        text.innerText = `R$ ${formattedValue(bonusAward)}`;

                        variables.currentBalance += bonusAward;

                        audio('bonus').play();
                    }

                    refreshCurrentBalance(variables.currentBalance);
                }

                continue;
            }

            if (j == 24) {
                if (!winner) {
                    variables.currentBalance -= variables.currentInvestment;

                    refreshCurrentBalance(variables.currentBalance);

                    if (variables.martingale) {
                        variables.currentInvestment = variables.currentInvestment * 2;

                        console.log("\n[ MARTINGALE ] DOBROU O INVESTIMENTO PARA A PRÓXIMA APOSTA");
                    }
                }

                if (winner && variables.martingale) {
                    variables.currentInvestment = variables.initialInvestment;
                }

                investmentInput.value = formattedValue(variables.currentInvestment);

                refreshIncome();
            }

            items.forEach(item => {
                item.classList.remove('white');
                item.querySelector('.name').classList.remove('white');
            });

            sequence = 0;
        }

        await sleep(300);

        tubeTop.style.transform = 'translateY(0px)';
        tubeBottom.style.transform = 'translateY(0px)';

        audio('close').play();

        await sleep(1500);

        tubeContent.innerHTML = "";

        tubeTop.style.transform = 'translateY(-190px)';
        tubeBottom.style.transform = 'translateY(calc(100vh - 240px))';

        items.forEach(item => {
            item.classList.remove('white');
            item.querySelector('.name').classList.remove('white');
        });

        if (!winnerEmoji.classList.contains('hidden')) {
            winnerEmoji.classList.add('hidden');
        }

        audio('open').play();
    }

    variables.data = [];
}

export default slotAnimation;
