
const restart = () => {
  Status = initialData()
}

const endGame = () => {
  let move = getMovements()

  setStatus(false)
  updateEndScreen(true, move, startTime(), dateNow())

  return
}

const initGameConfig = (level) => {
  if (Number(level).toString() == 'NaN') return false

  restart()
  levelConfig = levels[level]

  Status.isPlaying = true
  Status.selectedLevel = level
  Status.startTime = dateNow()
  Status.bonus = bonusConfig(levelConfig)
  Status.cardsOrder = cardsConfig(levelConfig, Status.bonus.amount, Status.bonus.id)

  createCards(Status.cardsOrder.length)
  createBonusDisplay(Status.bonus.amount)
  configCardControls()
  configBonusControls()
  startTimer()
}

const bonusFound = () => {
  updateBonusDisplay(++Status.bonus.found)
}

const bonusActive = () => {
  if (
    !(Status.bonus.found - 1 >= 0) ||
    Status.bonus.available
  ) return

  updateBonusDisplay(--Status.bonus.found)
  bonusIsActive(true)

  Status.cardsOrder.forEach((element, index) => {
    if (element.status !== isMatch) {
      Status.cardsSelected.push(index)
      Status.cardsSelectedIn[index] = dateNow()

      flipCard(index)
      renderImage(index, element.src)
      createTimer(levelConfig.bonusEffectTime, untap, [index, levelConfig.bonusEffectTime])
    }
  })

  createTimer(levelConfig.bonusEffectTime, bonusIsActive, false)
  createTimer(levelConfig.bonusEffectTime, () => {
      Status.cardsSelected = []
      Status.cardsSelectedIn = {}
  }, false)
}

const flip = (index) => {
  let {cardsOrder, cardsSelected, cardsSelectedIn} = Status

  let cardConfig = cardsOrder[index]
  let isSelected = cardsSelected.includes(index)

  if (
    cardsSelected.length === 2 ||
    cardConfig.status === isMatch ||
    isSelected
  ) return

  ++Status.movements

  if (
    cardConfig.id === Status.bonus.id &&
    Status.bonus.found + 1 <= Status.bonus.amount
  ) {

    cardConfig.status = isMatch
    matchCard([index])
    bonusFound()

  } else {
    flipCard(index)
    cardsSelected.push(index)
    cardsSelectedIn[index] = dateNow()

    checkSelected(index)
    createTimer(levelConfig.timeToUntap, untap, [index, levelConfig.timeToUntap])
    createTimer(levelConfig.timeToUntap, removeCardSelected, index)
  }

  renderImage(index, cardConfig.src)
  updateMovementDisplay(getMovements())
}

const checkSelected = () => {
  let {cardsOrder, cardsSelected} = Status
  const [card_1, card_2] = cardsSelected

  if (cardsSelected.length < 2) return

  if (cardsOrder[card_1].id === cardsOrder[card_2].id) {
    cardsOrder[card_1].status = isMatch
    cardsOrder[card_2].status = isMatch

    matchCard([card_1, card_2])
  }

  createTimer(fixedTimeToUntap, untap, [card_1, fixedTimeToUntap])
  createTimer(fixedTimeToUntap, removeCardSelected, card_1)

  createTimer(fixedTimeToUntap, untap, [card_2, fixedTimeToUntap])
  createTimer(fixedTimeToUntap, removeCardSelected, card_2)
}
