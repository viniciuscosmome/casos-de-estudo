const randomBonusAmount = (config) => {
  const {min, max} = config
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const bonusConfig = (levelConfig) => {
  const {bonusEffectTime, bonusAmountLimit} = levelConfig
  let config = {}

  config.id = dateNow() - 5e3
  config.time = bonusEffectTime
  config.found = 0,
  config.amount = randomBonusAmount(bonusAmountLimit)
  config.available = false

  return config
}