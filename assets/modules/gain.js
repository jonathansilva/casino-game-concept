import variables from './variables.js';
import { green, numbers } from './constants.js';
import { getRandomIntInclusive, random, raffle } from './utils.js';
import { styledNumbers, styledText } from './console.js';

const gain = () => {
    styledText("\n%c VITÓRIA \n", green);

    let allNumbers = numbers; // 0..24

    // Reserva 5 números do Player
    variables.fiveOfAKind = random(variables.player, 5);

    console.log("QUINA SORTEADA: [ " + variables.fiveOfAKind + " ]");

    // Remove os 5 números do array 'allNumbers'
    allNumbers = allNumbers.filter(x => !variables.fiveOfAKind.includes(x));

    // Apenas números do PC
    const allNumbersOfMachine = allNumbers.filter(x => !variables.player.includes(x));

    // Reserva um número do PC, para adicionar na primeira posição do 'fiveOfAKind'
    variables.reservedNumber = random(allNumbersOfMachine, 1);

    variables.numbersToBreakSequence.push(variables.reservedNumber);

    // Remove o número reservado
    allNumbers = allNumbers.filter(x => x !== variables.reservedNumber);

    console.log(" ");

    let result = raffle(allNumbers, 2);

    // Sorteia a posição em que 'fiveOfAKind' vai começar
    const positionToStartTheNumbersWinners = getRandomIntInclusive(0, 19);

    console.log(" ");
    console.log("POSIÇÃO SORTEADA:", positionToStartTheNumbersWinners);

    if (positionToStartTheNumbersWinners > 0) {
        console.log("NÚMERO DA POSIÇÃO " + (positionToStartTheNumbersWinners - 1).toString() + ":", result[positionToStartTheNumbersWinners - 1]);
    }

    /* Verifica se a posição anterior tem um número que pertence ao Player. Se não pertencer,
     * coloca o número reservado em uma posição aleatória do resultado
     */
    if (!variables.player.includes(result[positionToStartTheNumbersWinners - 1])) {
        const positionToPlaceReservedNumber = getRandomIntInclusive(0, 15);

        result.splice.apply(result, [positionToPlaceReservedNumber, 0].concat(variables.reservedNumber));

        console.log(" ");
        console.log("COLOCOU O NÚMERO", variables.reservedNumber, "[ RESERVADO ] EM UMA POSIÇÃO ALEATÓRIA");

        const pos = (positionToPlaceReservedNumber <= (positionToStartTheNumbersWinners - 1)) ? positionToStartTheNumbersWinners + 1 : positionToStartTheNumbersWinners;

        result.splice.apply(result, [pos, 0].concat(variables.fiveOfAKind));

        console.log(" ");
        console.log("COLOCOU A QUINA");
        console.log(" ");

        variables.data.push(result);

        styledNumbers(result);

        return;
    }

    console.log(" ");
    console.log("COLOCOU A QUINA");
    console.log(" ");

    console.log(result[positionToStartTheNumbersWinners - 1].toString(), "PERTENCE AO PLAYER. FOI COLOCADO O NÚMERO", variables.reservedNumber, "ANTES DA QUINA");

    result.splice.apply(result, [positionToStartTheNumbersWinners, 0].concat([variables.reservedNumber, ...variables.fiveOfAKind]));

    variables.data.push(result);

    styledNumbers(result);
}

export default gain;
