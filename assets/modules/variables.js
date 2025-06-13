let variables = {
    currentBalance: 104864, // R$ 1.048,64
    currentInvestment: 100, // R$ 1,00
    initialInvestment: 100, // R$ 1,00 ( usado quando o Martingale é ativado )
    percent: 80, // Em porcentagem
    spin: 1, // Quantidade de giros
    items: 0, // Quantidade de itens/números selecionados pelo Player
    reservedNumber: -1, // Número reservado pelo PC para colocar antes da Quina, se necessário
    player: [], // Números selecionados pelo Player
    machine: [], // Números selecionados pelo PC
    fiveOfAKind: [], // Quina
    data: [], // Array(s) de números sorteados
    dataToStylize: [], // Array de números sorteados ( para estilizar no console )
    numbersToBreakSequence: [], // Números reservados pelo PC
    martingale: false, // Dobra o valor para a próxima aposta, se ativado
    closedPipe: true // Bug corrigido ( áudio )
}

export default variables;
