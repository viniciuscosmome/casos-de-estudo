const formatTime = (start, end) => {
  let result = ''

  let currentTime = end - start

  let min = Math.floor((currentTime / 6e4) % 60)
  let sec = Math.floor((currentTime / 1e3) % 60)

  result += min >= 1 ? `${min}min` : ''
  result += `${sec}s`

  return result
}

const resetGame = () => {
  let timer = queryElement('.display-point .time span')
  let move = queryElement('.display-point .move span')
  let game = queryElement('#game')
  let bonus = queryElement('#bonus')

  timer.innerText = formatTime(0, 0)
  move.innerText = 0
  game.innerText = ''
  bonus.innerText = ''
}

const updateEndScreen = (endGame, movements, start, end) => {
  let display = queryElement('.game-finished')

  if (!endGame)
    return display.classList.remove('show')

  display.querySelector('.time span').innerText = formatTime(start, end)
  display.querySelector('.move span').innerText = movements

  display.classList.add('show')
}

const updateMovementDisplay = (count) => {
  let display = queryElement('.display-point .move span')

  display.innerText = count
}

const updateTimeDisplay = (start, end) => {
  let display = queryElement('.display-point .time span')

  display.innerText = formatTime(start, end)
}

const updateBonusDisplay = (availableAmount) => {
  let bonusCards = queryAllElement('#bonus .bonus-joker')

  for (let index = 0; index < bonusCards.length; index++) {
    if (index < availableAmount)
      bonusCards[index].classList.add('available')
    else
      bonusCards[index].classList.remove('available')
  }
}

const createBonusDisplay = (amount) => {
  let container = queryElement('#bonus')

  container.innerText = ''

  const create = () => {
    let button = newElement('div')
    let icon = newElement('i')

    button.classList.add('bonus-joker')
    icon.classList.add('icofont-crown')

    button.appendChild(icon)

    return container.appendChild(button)
  }

  for (let index = 0; index < amount; index++) {
    create()
  }
}

const createCards = (length) => {
  let container = queryElement('#game')

  container.innerText = ''

  const create = () => {
    let card = newElement('div')
    let front = newElement('div')
    let back = newElement('div')

    card.classList.add('card')
    front.className = 'card-face card-front'
    back.className = 'card-face card-back'

    card.appendChild(front)
    card.appendChild(back)

    container.appendChild(card)
  }

  for (let index = 0; index < length; index++) {
    create()
  }
}

const removeImage = (index) => {
  return allCardsInPlay[index].querySelector('.card-front').style.backgroundImage = 'none'
}

const renderImage = (index, src) => {
  let card = allCardsInPlay[index]

  if (!!card)
    card.querySelector('.card-front').style.backgroundImage = `url(images/game/${src})`
}
