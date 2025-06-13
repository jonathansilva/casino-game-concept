const numbers = [...Array(25).keys()];

const names = {
    1: "Avestruz",
    2: "Águia",
    3: "Burro",
    4: "Borboleta",
    5: "Cachorro",
    6: "Cabra",
    7: "Carneiro",
    8: "Camelo",
    9: "Cobra",
    10: "Coelho",
    11: "Cavalo",
    12: "Elefante",
    13: "Galo",
    14: "Gato",
    15: "Jacaré",
    16: "Leão",
    17: "Macaco",
    18: "Porco",
    19: "Pavão",
    20: "Perú",
    21: "Touro",
    22: "Tigre",
    23: "Urso",
    24: "Veado",
    25: "Vaca"
}

// Quantidade selecionada -> getRandomIntInclusive(min, max) <= limit
const manipulation = {
    15: {
        'min': 1,
        'max': 10,
        'limit': 7
    },
    14: {
        'min': 1,
        'max': 12,
        'limit': 9
    },
    13: {
        'min': 1,
        'max': 18,
        'limit': 16
    },
    12: {
        'min': 1,
        'max': 20,
        'limit': 18
    },
    11: {
        'min': 1,
        'max': 25,
        'limit': 22
    },
    10: {
        'min': 1,
        'max': 50,
        'limit': 48
    },
    9: {
        'min': 1,
        'max': 100,
        'limit': 98
    },
    8: {
        'min': 1,
        'max': 1000,
        'limit': 998
    },
    7: {
        'min': 1,
        'max': 5000,
        'limit': 4996
    },
    6: {
        'min': 1,
        'max': 8000,
        'limit': 7997
    },
    5: {
        'min': 1,
        'max': 10000,
        'limit': 9999
    }
}

// %
const payouts = {
    15: 80,
    14: 82,
    13: 84,
    12: 86,
    11: 88,
    10: 90,
    9: 100,
    8: 200,
    7: 300,
    6: 400,
    5: 500
}

// Quantidade selecionada -> Multiplicador ( % ) | Adicional ( R$ )
const awards = {
    13: {
        'multiplier': 5,
        'additional': 0
    },
    12: {
        'multiplier': 5,
        'additional': 0
    },
    11: {
        'multiplier': 10,
        'additional': 0
    },
    10: {
        'multiplier': 10,
        'additional': 0
    },
    9: {
        'multiplier': 20,
        'additional': 500
    },
    8: {
        'multiplier': 50,
        'additional': 1000
    },
    7: {
        'multiplier': 100,
        'additional': 2000
    },
    6: {
        'multiplier': 500,
        'additional': 3000
    },
    5: {
        'multiplier': 1000,
        'additional': 4000
    },

    getValue(number) {
        return this[number] || { 'multiplier': 1, 'additional': 0 };
    }
}

// Sequência atingida -> Quantidade selecionada -> Valor
const bonus = {
    6: {
        6: 1000,
        7: 300,
        8: 200,
        9: 100
    },
    7: {
        7: 2000,
        8: 300,
        9: 200
    },
    8: {
        8: 3000,
        9: 300
    },
    9: {
        9: 4000
    },

    getValue(sequence, amount) {
        const _default = {
            6: 50,
            7: 100,
            8: 150,
            9: 700
        }

        if (this[sequence] === undefined || amount === undefined) {
            return 0;
        }

        return this[sequence][amount] || _default[sequence];
    }
}

// Áudio
const media = {
    'select': {
        'file': 'cool-interface-click-tone.wav',
        'volume': 0.2
    },
    'open': {
        'file': 'sci-fi-confirmation.wav',
        'volume': 0.1
    },
    'close': {
        'file': 'sci-fi-futuristic-door-open.wav',
        'volume': 0.3
    },
    'raffle': {
        'file': 'select-click.wav',
        'volume': 0.03
    },
    'found': {
        'file': 'quick-win-video-game-notification.wav',
        'volume': 0.05
    },
    'winner': {
        'file': 'achievement-bell.wav',
        'volume': 0.15
    },
    'coins': {
        'file': 'multi-coin-payout.mp3',
        'volume': 0.15
    },
    'bonus': {
        'file': 'level-up-bonus-sequence.mp3',
        'volume': 0.15
    },

    volume(type) {
        if (this[type].volume === undefined) {
            return 1.0;
        }

        return this[type].volume;
    }
}

// Console
const green = [
    'display: block',
    'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
    'line-height: 20px',
    'text-align: center',
    'font-weight: bold',
    'color: white',
    'border: 1px solid rgb(21, 62, 2)',
    'background: linear-gradient(rgb(63, 156, 20),rgb(12, 87, 2))',
    'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
].join(';');

const red = [
    'display: block',
    'text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)',
    'line-height: 20px',
    'text-align: center',
    'font-weight: bold',
    'color: white',
    'border: 1px solid #3E0E02',
    'background: linear-gradient(#D33106, #571402)',
    'box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset'
].join(';');

export {
    awards,
    bonus,
    green,
    manipulation,
    media,
    names,
    numbers,
    payouts,
    red
}
