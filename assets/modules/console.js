import variables from './variables.js';

const styledText = (text, style) => {
    console.log(text, style);
}

const styledNumbers = result => {
    variables.dataToStylize.push(result);

    const numbers = variables.dataToStylize.toString().split(',').map(Number);

    let numbersToStylize = [];
    let styles = [];

    numbersToStylize.push('%c[');
    styles.push('color: white;');

    for (const number of numbers) {
        if (variables.numbersToBreakSequence.includes(number)) {
            numbersToStylize.push(`%c${number}`);
            styles.push('color: #9980ff;');

            continue;
        }

        if (variables.fiveOfAKind.includes(number)) {
            numbersToStylize.push(`%c${number}`);
            styles.push('line-height: 1.5; color: cyan; border-bottom: 2px solid cyan; background: #0c5702;');

            continue;
        }

        if (variables.player.includes(number)) {
            numbersToStylize.push(`%c${number}`);
            styles.push('color: cyan;');

            continue;
        }

        numbersToStylize.push(`%c${number}`);
        styles.push('color: white;');
    }

    numbersToStylize.push('%c]');
    styles.push('color: white;');

    console.log(numbersToStylize.join(' '), ...styles);

    numbersToStylize = [];
    styles = [];

    variables.dataToStylize = [];
    variables.fiveOfAKind = [];
    variables.numbersToBreakSequence = [];
}

export { styledNumbers, styledText }
