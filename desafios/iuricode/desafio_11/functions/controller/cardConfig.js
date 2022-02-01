const swap = (array, index, randomIndex) => {
  const support = array[index]
  array[index] = array[randomIndex]
  array[randomIndex] = support
}

const shuffle = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))

    swap(array, index, randomIndex)
  }

  return array
}

const config = (_id, _src) => {
  return {
    id: _id,
    src: _src,
    status: isDefault
  }
}

const saveData = (array, data, start, end) => {
  for (let index = start; index < end; index++) {
    array.push(config(data[0], data[1]))
  }
  return array
}

const cardsConfig = (levelConfig, bonusAmount, bonusId) => {
  const {pairPerCard} = levelConfig
  const pairs = pairPerCard * 2
  let result = []

  result = saveData(result, [bonusId, bonusImage], 0, bonusAmount)

  for (let index = 0; index < images.length; index++) {
    let data = [dateNow() + index, images[index]]
    let start = bonusAmount + index * pairs
    let end = start + pairs

    result = saveData(result, data, start, end)
  }

  return shuffle(result)
}
