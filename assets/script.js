import events from './modules/events.js';
import variables from './modules/variables.js';
import { names, numbers } from './modules/constants.js';
import { card } from './modules/selectors.js';
import { refreshCurrentBalance } from './modules/utils.js';

events();

refreshCurrentBalance(variables.currentBalance);

numbers.forEach(i => {
    card.querySelector(`[id='${i}']`).classList.add(`item${i + 1}`);
    card.querySelector(`[id='${i}']`).style.backgroundImage = `url('assets/images/items/animals/${i + 1}.png')`;
    card.querySelector(`[id='${i}'] .name`).innerText = names[i + 1];
    card.querySelector(`[id='${i}'] .number`).innerText = i + 1;
});
