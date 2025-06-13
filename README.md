![game](https://github.com/jonathansilva/casino-game-concept/blob/master/screenshots/game.png?raw=true)

## Como jogar

1 - Selecione de 5 a 15 números

2 - Informe o valor em "Investimento"

3 - Clique em Apostar

Para vencer, é preciso acertar no mínimo 5 números seguidos

**Giros**

x1, x2, x5, x10 e x20: Quantidade de sorteios que serão feitos automaticamente

**Martingale**

Se ativado, o valor da próxima aposta será dobrado em caso de derrota

Obs: Para ativar, o giro **x1** não deve estar selecionado

## Premiação

Quanto **menor** for a quantidade de números selecionados, **maior** será o prêmio

> Premiação considerando aposta de R$ 1,00

| Números | Payout (%) | Multiplicador | Adicional |   Prêmio   |
| :------: | :--------: | :-----------: | :-------: | :----------: |
|    15    |     80     |       1       |     0     |   R$ 1,80   |
|    14    |     82     |       1       |     0     |   R$ 1,82   |
|    13    |     84     |       5       |     0     |   R$ 9,20   |
|    12    |     86     |       5       |     0     |   R$ 9,30   |
|    11    |     88     |      10      |     0     |   R$ 18,80   |
|    10    |     90     |      10      |     0     |   R$ 19,00   |
|    9    |    100    |      20      |    500    |  R$ 540,00  |
|    8    |    200    |      50      |   1.000   | R$ 1.150,00 |
|    7    |    300    |      100      |   2.000   | R$ 2.400,00 |
|    6    |    400    |      500      |   3.000   | R$ 5.500,00 |
|    5    |    500    |     1000     |   4.000   | R$ 10.000,00 |

**Bônus**

Os valores variam de acordo com a quantidade de números selecionados e sequência atingida

| Sequência |             6             |             7             |             8             |             9             | 10 a 15 |
| :--------: | :------------------------: | :-----------------------: | :-----------------------: | :-----------------------: | :-----: |
|     6     | R$ 1.000,00  | R$ 300,00 |  R$ 200,00 | R$ 100,00  |         R$ 50,00         |                          |        |
|     7     |                            | R$ 2.000,00 | R$ 300,00 |  R$ 200,00 | R$ 100,00  |                          |        |
|     8     |                            |                          | R$ 3.000,00 | R$ 300,00 |         R$ 150,00         |        |
|     9     |                            |                          |                          | R$ 4.000,00 | R$ 700,00 |        |

> O bônus é acumulativo

Exemplo:

Ao obter uma sequência de 7 em uma aposta de 12 números, o Player recebe R$ 9,30 + bônus de R$ 150,00

6º número: R$ 50,00

7º número: R$ 100,00

## Sorteio

A vitória ou derrota é definida por um cálculo simples

`(getRandomIntInclusive(min, max) <= limit) ? loss() : gain();`

| Números | Min |  Max  | Limit |
| :------: | :-: | :---: | :---: |
|    15    |  1  |  10  |   7   |
|    14    |  1  |  12  |   9   |
|    13    |  1  |  18  |  16  |
|    12    |  1  |  20  |  18  |
|    11    |  1  |  25  |  22  |
|    10    |  1  |  50  |  48  |
|    9    |  1  |  100  |  98  |
|    8    |  1  | 1000 |  998  |
|    7    |  1  | 5000 | 4996 |
|    6    |  1  | 8000 | 7997 |
|    5    |  1  | 10000 | 9999 |

Exemplo:

Para vencer uma aposta de 15 números, o resultado de `getRandomIntInclusive(1, 10)` deverá ser maior que 7

## Logs

O console exibirá informações sobre cada sorteio e eventuais erros

> Abra o console em uma janela separada

**Exemplos**

*Vitória*

![gain](https://github.com/jonathansilva/casino-game-concept/blob/master/screenshots/console%20-%20gain.png?raw=true)

5 números pertencentes ao Player ( de um total de 15 ) foram previamente reservados e inseridos numa posição aleatória do resultado

O Player conseguiu uma sequência de 6 números: 11, 15, 1, 6, 22 e **9 ( bônus )**

Obs: O prêmio desta aposta foi de R$ 1,80 + bônus de R$ 50,00

*Derrota*

![loss](https://github.com/jonathansilva/casino-game-concept/blob/master/screenshots/console%20-%20loss.png?raw=true)

## Créditos

**Áudios**

[Mixkit](https://mixkit.co)

"achievement-bell.wav"

"cool-interface-click-tone.wav"

"quick-win-video-game-notification.wav"

"sci-fi-confirmation.wav"

"sci-fi-futuristic-door-open.wav"

"select-click.wav"

[Floraphonic](https://pixabay.com/users/floraphonic-38928062/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=186890) ( Pixabay )

"level-up-bonus-sequence.mp3"

"multi-coin-payout.mp3"

**Imagens**

Animais: [Iconshock](https://www.iconshock.com/flat-icons/animals-icons)

Emojis: [Telegram](https://telegram.org)
