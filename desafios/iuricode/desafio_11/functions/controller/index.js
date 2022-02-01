const {levels, images, bonusImage} = loadResources()
const isMatch = 'match'
const isDefault = 'no'
const fixedTimeToUntap = 5e2
let Status = {}
let levelConfig

const initialData = () => {
  return {
    isPlaying: false,
    selectedLevel: -1,
    startTime: 0,
    endTime: 0,
    bonus: {
      id: 0,
      time: 0,
      found: 0,
      amount: 0,
      available: false
    },
    cardsOrder: [],
    cardsSelected: [],
    cardsSelectedIn: {},
    movements: 0
  }
}

const getStatus = () => {
  return Status.isPlaying
}

const setStatus = (to) => {
  return Status.isPlaying = to
}

const startTime = () => {
  return Status.startTime
}

const getMovements = () => {
  return Status.movements
}

const removeCardSelected = (index) => {
  let result = []

  Status.cardsSelected.forEach((value) => {
    if (value !== index)
      result.push(value)
  })

  Status.cardsSelected = result
}

const selectedIn = (index) => {
  return Status.cardsSelectedIn[index]
}

const bonusIsActive = (status) => {
  Status.bonus.available = status
}