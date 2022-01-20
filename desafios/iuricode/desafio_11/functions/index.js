let GameConfig
let currentLevelStatus = {
    gameStatus: false,
    dataState: false,
    levelSelected: -1,
    startTime: 0,
    finishedTime: 0,
    jokerCount: 0,
    jokerTime: 0,
    jokerEffect: false,
    jokerId: 0,
    jokerFound: 0,
    moveCount: 0,
    cardsCount: 0,
    cardsSelected: [],
    cardsSelectedIn: {},
    gameCardsOrder: []
}

const swap = function(array, i, j) {
    const aux = array[i]
    array[i] = array[j]
    array[j] = aux
}

const shuffle = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1))

        swap(array, i, randomIndex)
    }
    return array
}

const gameFinished = function() {
    let container = document.querySelector('.game-finished')

    let fullTime = Date.now() - currentLevelStatus.startTime

    const minutes = Math.floor(fullTime / 6e4 % 60);
    const seconds = Math.floor(fullTime / 1e3 % 60);

    currentLevelStatus.gameStatus = false

    container.querySelector('.time span').innerHTML = formatTime(minutes, seconds)
    container.querySelector('.move span').innerHTML = currentLevelStatus.moveCount

    document.getElementById('continue').addEventListener('click', function() {
        container.classList.remove('show')
    })

    container.classList.add('show')
    return
}

const gameInitConfig = function() {
    let config = GameConfig.GameLevel[currentLevelStatus.levelSelected]
    let jokerMax = config.joker[1]
    let jokerMin = config.joker[0]
    let jokerCount = Math.floor(Math.random() * (jokerMax - jokerMin + 1)) + jokerMin

    currentLevelStatus.cardsCount = config.numberOfCards + jokerCount
    currentLevelStatus.jokerCount = jokerCount
    currentLevelStatus.gameCardsOrder = []
    currentLevelStatus.jokerTime = config.jokerTime
    currentLevelStatus.moveCount = 0
    currentLevelStatus.jokerEffect = false
    currentLevelStatus.jokerFound = 0
    currentLevelStatus.jokerId = 0
    currentLevelStatus.cardsSelected = []
    currentLevelStatus.cardsSelectedIn = {}

    generateJokerButton()
    configGameCardsOrder()
    generateCards()

    currentLevelStatus.gameStatus = true
    currentLevelStatus.startTime = Date.now()

    startTimer()
    updateMoveDisplay()
    return
}

const activeBonus = function(evt) {
    if (!this.className.includes('available') ||
        !evt.isTrusted ||
        !currentLevelStatus.gameStatus
    ) return

    --currentLevelStatus.jokerFound
    updateJokerDisplay()
    currentLevelStatus.jokerEffect = true
    showAllCards(currentLevelStatus.jokerTime)
    return
}

const showAllCards = function(t) {
    let getAllCards = document.querySelectorAll('.card')

    currentLevelStatus.cardsSelected = []
    currentLevelStatus.cardsSelectedIn = {}

    function toggleVisibility(to) {
        getAllCards.forEach(function(element) {
            if (to === 'add' && !element.className.includes('match')) {
                element.classList.add('flip')
            } else if (to === 'remove') {
                element.classList.remove('flip')
            }
        })
    }

    toggleVisibility('add')

    let timer = setInterval(function() {
        currentLevelStatus.jokerEffect = false
        toggleVisibility('remove')
        clearInterval(timer)
    }, t)
    return
}

const generateJokerButton = function() {
    let container = document.querySelector('#bonus')

    container.innerText = ''

    const createJokerButton = function() {
        let button = document.createElement('div')
        let icon = document.createElement('i')

        button.addEventListener('click', activeBonus)

        button.classList.add('bonus-joker')
        icon.classList.add('icofont-crown')

        button.appendChild(icon)

        return container.appendChild(button)
    }

    for (let index = 0; index < currentLevelStatus.jokerCount; index++) {
        createJokerButton()
    }
}

const checkGameStatus = function() {
    let result = true

    function checkCard(card) {
        if (card.status !== 'match' &&
            card.id !== currentLevelStatus.jokerId
        ) {
            result = false
        }
    }

    currentLevelStatus.gameCardsOrder.forEach(checkCard)
    return result
}

const flipCard = function(card) {
    currentLevelStatus.cardsSelectedIn[card.id] = Date.now()
    currentLevelStatus.cardsSelected.push(card)
    card.classList.add('flip')

    checkSelectedCardIfIsJoker(card)

    if (currentLevelStatus.cardsSelected.length == 2) {
        checkSelectedCards()

        let timer = setInterval(function() {
            untapMultipleCards()
            clearInterval(timer)
        }, 5e2)
    }

    if (checkGameStatus()) gameFinished()

    return
}

const checkSelectedCardIfIsJoker = function(card) {
    let cards = document.querySelectorAll('.card')
    let thisCardInOrder = currentLevelStatus.gameCardsOrder[card.id]
    let id = thisCardInOrder.id
    let checkPosition = currentLevelStatus.jokerId == id

    if(
        !!checkPosition &&
        currentLevelStatus.jokerFound + 1 <= currentLevelStatus.jokerCount
    ) {
        ++currentLevelStatus.jokerFound
        cards[card.id].classList.add('match')
        thisCardInOrder.status = 'match'
        currentLevelStatus.cardsSelected.splice(currentLevelStatus.cardsSelected.indexOf(card), 1)

        updateJokerDisplay()
    }
}

const updateJokerDisplay = function() {
    let getAllJokers = document.querySelectorAll('#bonus .bonus-joker')

    for (let index = 0; index < getAllJokers.length; index++) {
        if (index <= currentLevelStatus.jokerFound - 1) {
            getAllJokers[index].classList.add('available')
        } else {
            getAllJokers[index].classList.remove('available')
        }
    }
}

const checkSelectedCards = function() {
    let firstCardSelected = currentLevelStatus.cardsSelected[0]
    let secondCardSelected = currentLevelStatus.cardsSelected[1]

    let firstCardInOrder = currentLevelStatus.gameCardsOrder[firstCardSelected.id]
    let secondCardInOrder = currentLevelStatus.gameCardsOrder[secondCardSelected.id]

    if (firstCardInOrder.id === secondCardInOrder.id &&
        firstCardInOrder.status === 'no' &&
        secondCardInOrder.status === 'no'
    ) {
        firstCardSelected.classList.add('match')
        secondCardSelected.classList.add('match')

        firstCardInOrder.status = 'match'
        secondCardInOrder.status = 'match'
    }

    return
}

const untapCard = function(card, auto) {
    if (!card || currentLevelStatus.jokerEffect) return

    let selected = currentLevelStatus.cardsSelected
    let gameConfig = GameConfig.GameLevel[currentLevelStatus.levelSelected]
    let calcTime = Date.now() - currentLevelStatus.cardsSelectedIn[card.id]

    delete currentLevelStatus.cardsSelectedIn[card.id]

    if (calcTime < gameConfig.untap && !auto) return

    selected.forEach(function(el, i) {
        if (card == el) selected.splice(i, 1)
    })

    if (!!card) card.classList.remove('flip')
    return
}

const untapMultipleCards = function() {
    let firsCardSelected = currentLevelStatus.cardsSelected[0]
    let secondCardSelected = currentLevelStatus.cardsSelected[1]

    untapCard(firsCardSelected, true)
    untapCard(secondCardSelected, true)
    return
}

const flipCardCheck = function(index) {
    let card = document.querySelectorAll('.card')[index]
    let gameConfig = GameConfig.GameLevel[currentLevelStatus.levelSelected]

    if (
        currentLevelStatus.cardsSelected.length > 1 ||
        card.className.includes('flip') ||
        card.className.includes('match') ||
        currentLevelStatus.jokerEffect ||
        !currentLevelStatus.gameStatus
    ) return

    ++currentLevelStatus.moveCount
    updateMoveDisplay()
    flipCard(card)

    let timer = setInterval(function() {
        untapCard(card)
        clearInterval(timer)
    }, gameConfig.untap)
}

const createCardElement = function(container, index) {
    let card = document.createElement('div')
    let front = document.createElement('div')
    let back = document.createElement('div')
    let imgSrc = currentLevelStatus.gameCardsOrder[index].src

    card.id = index
    card.classList.add('card')
    card.addEventListener('click', function(evt) {
        if (!evt.isTrusted) return

        flipCardCheck(index)
    })
    front.style.backgroundImage = `url(images/game/${imgSrc})`
    front.classList.add('card-face')
    front.classList.add('card-front')
    back.classList.add('card-face')
    back.classList.add('card-back')

    card.appendChild(front)
    card.appendChild(back)

    container.appendChild(card)

    return
}

const generateCards = function() {
    let container = document.getElementById('game')
    container.innerText = ''
    for (let index = 0; index < currentLevelStatus.cardsCount; index++) {
        createCardElement(container, index)
    }
}

const configGameCardsOrder = function() {
    const putItOnTheList = function(el, index, isJoker) {
        let cardConfig = {
            id: Date.now() + index,
            src: el,
            status: 'no'
        }

        if (!!isJoker) {
            if (currentLevelStatus.jokerId === 0) {
                currentLevelStatus.jokerId = cardConfig.id
            } else {
                cardConfig.id = currentLevelStatus.jokerId
            }

            currentLevelStatus.gameCardsOrder.push(cardConfig)
        } else {
            for (let i = 0; i < (currentLevelStatus.cardsCount - currentLevelStatus.jokerCount) / 9; i++) {
                let newConfig = {
                    id: cardConfig.id,
                    src: cardConfig.src,
                    status: cardConfig.status
                }
                currentLevelStatus.gameCardsOrder.push(newConfig)
            }
        }
    }

    GameConfig.GameImages.forEach(function(el, i) {
        putItOnTheList(el, i)
    })

    for (let i = 0; i < currentLevelStatus.jokerCount; i++) {
        putItOnTheList(GameConfig.JokerImage, currentLevelStatus.cardsCount, true)
    }

    return shuffle(currentLevelStatus.gameCardsOrder)
}

const formatTime = function(minutes, seconds) {
    let text = minutes < 1 ? '' : `${minutes}min`
    text += ` ${seconds}s`

    return text
}

const updateTimer = function() {
    const display = document.querySelector('.display-point .time span')
    if (!currentLevelStatus.gameStatus) return

    let fullTime = Date.now() - currentLevelStatus.startTime

    const minutes = Math.floor(fullTime / 6e4 % 60);
    const seconds = Math.floor(fullTime / 1e3 % 60);

    return display.innerText = formatTime(minutes, seconds)
}

const startTimer = function() {
    let timer = setInterval(0)
    if (!currentLevelStatus.gameStatus) return clearInterval(timer)

    timer = setInterval(updateTimer, 1e3)

    return
}

const updateMoveDisplay = function() {
    const display = document.querySelector('.display-point .move span')

    return display.innerText = currentLevelStatus.moveCount
}

const selectLevel = function() {
    currentLevelStatus.levelSelected = Number(this.getAttribute('value'))
    this.parentNode.parentNode.querySelector('.select-display span').innerText = this.innerText
    return gameInitConfig()
}

const levelSelect = async function() {
    const getAllLevelSelect = document.querySelectorAll('.select-item')

    const setFunction = function(el) {
        el.addEventListener('click', selectLevel)
    }

    getAllLevelSelect.forEach(setFunction)

    return
}

const loadData = function() {
    const xhttp = new XMLHttpRequest();

    const saveGameConfigLoaded = function() {
        GameConfig = JSON.parse(this.response)
        currentLevelStatus.dataState = true
    }

    xhttp.addEventListener('load', saveGameConfigLoaded)
    xhttp.open("GET", "functions/applicationConfig.json", true);
    xhttp.send();
    return
}

const LoadGameConfigurationInit = function() {
    loadData()
    levelSelect()
}

window.addEventListener('load', LoadGameConfigurationInit)