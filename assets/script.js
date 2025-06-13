import events from './modules/events.js';
import variables from './modules/variables.js';
import { names, numbers } from './modules/constants.js';
import { card } from './modules/selectors.js';
import { refreshCurrentBalance } from './modules/utils.js';

events();

refreshCurrentBalance(variables.currentBalance);

const init = () => {
    let j = 1;

    numbers.forEach(i => {
        card.querySelector(`[id='${i}']`).classList.add(`item${j}`);
        card.querySelector(`[id='${i}']`).style.backgroundImage = `url('assets/images/items/animals/${j}.png')`;
        card.querySelector(`[id='${i}'] .name`).innerText = names[j];
        card.querySelector(`[id='${i}'] .number`).innerText = j;

        j++;
    });
}

window.onload = init;
