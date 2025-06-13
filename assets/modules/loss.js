import variables from './variables.js';
import { red } from './constants.js';
import { raffle } from './utils.js';
import { styledNumbers, styledText } from './console.js';

const loss = () => {
    styledText("\n%c DERROTA \n", red);

    const result = raffle([], 3);

    variables.data.push(result);

    styledNumbers(result);
}

export default loss;
