const configCardControls = () => {
  let cards = queryAllElement('.card')

  cards.forEach((card, index) => {
    card.addEventListener('click', (event) => {
      if (event.isTrusted)
        flip(index)
    })
  })
}

const configBonusControls = () => {
  let buttons = queryAllElement('#bonus .bonus-joker')

  buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
      if (event.isTrusted)
        bonusActive()
    })
  })
}

const matchCard = (cards) => {
  cards.forEach((id) => {
    allCardsInPlay[id].classList.add('match')
  })
}

const untap = (...params) => {
  const [index, time] = params[0]
  const now = dateNow()

  if (selectedIn(index) + time >= now && time > 0) return

  let card = allCardsInPlay[index]

  card.classList.remove('flip')
}

const flipCard = (index) => {
  let card = allCardsInPlay[index]

  card.classList.add('flip')
}
